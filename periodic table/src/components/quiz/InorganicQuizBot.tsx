import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Atom, RefreshCw, Send, Sparkles, X } from 'lucide-react';
// @ts-ignore - Reuse the organic quiz surface so both categories share the same flow.
import QuizArea from '../../../../organic-chemistry-visualizer/src/components/quiz/QuizArea.jsx';
// @ts-ignore - Reuse the organic results dashboard for a consistent experience.
import QuizResults from '../../../../organic-chemistry-visualizer/src/components/quiz/QuizResults.jsx';

const CATEGORIES = ['Periodic Trends', 's-Block Elements', 'p-Block Elements', 'd-Block Elements', 'f-Block Elements'];

const baseQuestions = [
  {
    id: 'in_periodic_1',
    topic: 'periodic-trends',
    difficulty: 'easy',
    conceptTag: 'Atomic Radius Trend',
    questionType: 'MCQ',
    question: 'Atomic radius generally decreases across a period because:',
    options: ['Effective nuclear charge increases', 'New shells are added', 'Shielding increases sharply', 'Valence electrons move to f orbitals'],
    correctAnswer: 'Effective nuclear charge increases',
    explanation: 'Across a period, electrons are added to the same principal shell while nuclear charge increases, so the outer electrons are pulled closer.'
  },
  {
    id: 'in_s_1',
    topic: 's-block-elements',
    difficulty: 'easy',
    conceptTag: 'Alkali Metal Reactivity',
    questionType: 'MCQ',
    question: 'Why does reactivity increase down Group 1?',
    options: ['Ionization enthalpy decreases', 'Atomic size decreases', 'Electronegativity increases', 'Nuclear charge disappears'],
    correctAnswer: 'Ionization enthalpy decreases',
    explanation: 'Larger atoms hold the valence electron less tightly, so alkali metals lose it more easily down the group.'
  },
  {
    id: 'in_s_2',
    topic: 's-block-elements',
    difficulty: 'medium',
    conceptTag: 'Flame Test',
    questionType: 'MCQ',
    question: 'Which s-block ion gives a brick-red flame?',
    options: ['Ca2+', 'Na+', 'K+', 'Ba2+'],
    correctAnswer: 'Ca2+',
    explanation: 'Calcium salts give a characteristic brick-red flame due to electronic excitation and emission in the visible region.'
  },
  {
    id: 'in_p_1',
    topic: 'p-block-elements',
    difficulty: 'medium',
    conceptTag: 'Inert Pair Effect',
    questionType: 'MCQ',
    question: 'The inert pair effect is most responsible for the stability of:',
    options: ['Pb2+ over Pb4+', 'Na+ over Na', 'Cl- over Cl+', 'Mg2+ over Mg+'],
    correctAnswer: 'Pb2+ over Pb4+',
    explanation: 'In heavier p-block elements, the ns2 pair is less available for bonding, so lower oxidation states such as Pb2+ become more stable.'
  },
  {
    id: 'in_p_2',
    topic: 'p-block-elements',
    difficulty: 'hard',
    conceptTag: 'Oxidizing Power of Halogens',
    questionType: 'MCQ',
    question: 'Which halogen is the strongest oxidizing agent?',
    options: ['Fluorine', 'Chlorine', 'Bromine', 'Iodine'],
    correctAnswer: 'Fluorine',
    explanation: 'Fluorine has very high electronegativity and reduction potential, making it the strongest oxidizing halogen.'
  },
  {
    id: 'in_d_1',
    topic: 'd-block-elements',
    difficulty: 'medium',
    conceptTag: 'Variable Oxidation States',
    questionType: 'MCQ',
    question: 'Transition metals show variable oxidation states mainly because:',
    options: ['ns and (n-1)d electrons have comparable energies', 'They have no valence electrons', 'Their nuclei are unstable', 'They cannot form ions'],
    correctAnswer: 'ns and (n-1)d electrons have comparable energies',
    explanation: 'The small energy gap between ns and (n-1)d orbitals allows different numbers of electrons to participate in bonding.'
  },
  {
    id: 'in_d_2',
    topic: 'd-block-elements',
    difficulty: 'hard',
    conceptTag: 'Coordination Chemistry',
    questionType: 'MCQ',
    question: 'A strong-field ligand such as CN- usually causes:',
    options: ['Large crystal field splitting', 'Zero ligand-metal interaction', 'No color in any complex', 'Only ionic bonding'],
    correctAnswer: 'Large crystal field splitting',
    explanation: 'Strong-field ligands split d orbitals strongly and often produce low-spin complexes.'
  },
  {
    id: 'in_f_1',
    topic: 'f-block-elements',
    difficulty: 'medium',
    conceptTag: 'Lanthanide Contraction',
    questionType: 'MCQ',
    question: 'Lanthanide contraction occurs due to:',
    options: ['Poor shielding by 4f electrons', 'Excellent shielding by 6s electrons', 'Loss of all f electrons', 'Decrease in nuclear charge'],
    correctAnswer: 'Poor shielding by 4f electrons',
    explanation: '4f electrons shield nuclear charge poorly, so effective nuclear attraction increases and ionic radii shrink gradually.'
  },
  {
    id: 'in_f_2',
    topic: 'f-block-elements',
    difficulty: 'hard',
    conceptTag: 'Actinide Oxidation States',
    questionType: 'MCQ',
    question: 'Actinides show more variable oxidation states than lanthanides because:',
    options: ['5f, 6d, and 7s orbitals are close in energy', 'They contain only s electrons', 'They never form complexes', 'Their f orbitals are completely inert'],
    correctAnswer: '5f, 6d, and 7s orbitals are close in energy',
    explanation: 'The close energies of 5f, 6d, and 7s orbitals allow multiple electron counts in bonding.'
  },
  {
    id: 'in_compound_1',
    topic: 'd-block-elements',
    difficulty: 'easy',
    conceptTag: 'Permanganate',
    questionType: 'MCQ',
    question: 'The purple color of KMnO4 is associated with manganese in which oxidation state?',
    options: ['+7', '+2', '+4', '0'],
    correctAnswer: '+7',
    explanation: 'In permanganate ion, Mn is in the +7 oxidation state and the intense color arises from charge-transfer transitions.'
  }
];

const normalizeTopic = (topic: string) => topic.toLowerCase().replace(/\s+/g, '-');

const generateInorganicQuiz = (category: string, difficulty: string) => {
  const topic = normalizeTopic(category);
  const preferred = baseQuestions.filter((question) => question.topic === topic || topic.includes(question.topic));
  const filtered = preferred.filter((question) => question.difficulty === difficulty);
  const pool = filtered.length ? filtered : preferred.length ? preferred : baseQuestions;
  const filled = [...pool, ...baseQuestions.filter((question) => !pool.some((item) => item.id === question.id))];
  return filled.slice(0, 10).map((question) => ({
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5),
    answer: question.correctAnswer
  }));
};

export const InorganicQuizBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [botState, setBotState] = useState<'CHAT' | 'LOADING' | 'QUIZ' | 'RESULTS'>('CHAT');
  const [configStep, setConfigStep] = useState(0);
  const [targetExam, setTargetExam] = useState('NEET Chemistry');
  const [difficulty, setDifficulty] = useState('medium');
  const [examMode, setExamMode] = useState('PRACTICE');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<any>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const resetWizard = () => {
    setConfigStep(0);
    setBotState('CHAT');
    setMessages([{ id: `welcome_${Date.now()}`, sender: 'bot', text: 'Hello! I am Catalyst for Inorganic Chemistry. Choose your entrance examination first.', showExams: true }]);
  };

  useEffect(() => {
    resetWizard();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botState]);

  const chooseExam = (exam: string) => {
    setTargetExam(exam);
    setMessages((prev) => [...prev, { id: `u_${Date.now()}`, sender: 'user', text: exam }, { id: `b_${Date.now()}`, sender: 'bot', text: `Target locked: ${exam}. Choose difficulty.`, showDifficulties: true }]);
    setConfigStep(1);
  };

  const chooseDifficulty = (key: string, label: string) => {
    setDifficulty(key);
    setMessages((prev) => [...prev, { id: `u_${Date.now()}`, sender: 'user', text: label }, { id: `b_${Date.now()}`, sender: 'bot', text: 'Now choose an Inorganic Chemistry topic.', showCategories: true }]);
    setConfigStep(2);
  };

  const chooseCategory = (category: string) => {
    setCurrentCategory(category);
    setMessages((prev) => [...prev, { id: `u_${Date.now()}`, sender: 'user', text: category }, { id: `b_${Date.now()}`, sender: 'bot', text: `Topic set: ${category}. Choose assessment mode.`, showModes: true }]);
    setConfigStep(3);
  };

  const startQuiz = (mode: string, label: string) => {
    setExamMode(mode);
    setMessages((prev) => [...prev, { id: `u_${Date.now()}`, sender: 'user', text: label }]);
    setBotState('LOADING');
    window.setTimeout(() => {
      setCurrentQuiz(generateInorganicQuiz(currentCategory || 'Periodic Trends', difficulty));
      setBotState('QUIZ');
    }, 900);
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    const lower = text.toLowerCase();
    if (configStep === 0) chooseExam(lower.includes('jee') ? 'JEE Main' : lower.includes('bits') ? 'BITSAT' : lower.includes('eam') ? 'EAMCET' : 'NEET Chemistry');
    else if (configStep === 1) chooseDifficulty(lower.includes('hard') ? 'hard' : lower.includes('easy') ? 'easy' : 'medium', lower.includes('hard') ? 'Hard' : lower.includes('easy') ? 'Easy' : 'Medium');
    else if (configStep === 2) chooseCategory(CATEGORIES.find((item) => item.toLowerCase().includes(lower)) || 'Periodic Trends');
    else startQuiz(lower.includes('mock') ? 'MOCK' : 'PRACTICE', lower.includes('mock') ? 'Mock Exam Mode' : 'Practice Mode');
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button initial={{ scale: 0.5, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.5, y: 50, opacity: 0 }} whileHover={{ scale: 1.05, y: -4 }} onClick={() => setIsOpen(true)} className="fixed bottom-6 left-1/2 z-50 flex h-14 -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-400 bg-slate-900/90 px-5 text-sm font-bold text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] backdrop-blur-md transition hover:border-emerald-400">
            <Atom className="animate-spin text-cyan-400" style={{ animationDuration: '6s' }} size={18} />
            <span>Quiz</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-hidden bg-white/95 text-slate-950 backdrop-blur-3xl dark:bg-slate-950/98 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-white/5 dark:bg-slate-900/40">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-200"><Atom size={20} /></div>
                <div>
                  <h2 className="flex items-center gap-1.5 text-sm font-bold">Catalyst AI inorganic exam platform <Sparkles size={12} className="text-cyan-400" /></h2>
                  <p className="text-[10px] font-medium tracking-wide text-emerald-500">Inorganic Entrance Prep Environment Active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-sm dark:border-white/5 dark:bg-slate-900 dark:text-slate-300"><X size={18} /></button>
            </div>

            <div className="mx-auto flex w-full max-w-[680px] flex-1 flex-col overflow-hidden border-x border-slate-100 bg-white/40 shadow-2xl dark:border-white/5 dark:bg-slate-900/10">
              {botState === 'CHAT' && (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto p-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed sm:text-sm ${msg.sender === 'user' ? 'rounded-br-none bg-gradient-to-r from-cyan-500 to-emerald-500 text-white' : 'rounded-bl-none border border-slate-200/80 bg-white/70 text-slate-800 dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-200'}`}>
                          <p>{msg.text}</p>
                          {msg.showExams && <Choice items={['NEET Chemistry', 'JEE Main', 'JEE Advanced', 'BITSAT', 'EAMCET']} onPick={chooseExam} tone="cyan" />}
                          {msg.showDifficulties && <Choice items={['Easy', 'Medium', 'Hard']} onPick={(label) => chooseDifficulty(label.toLowerCase(), label)} tone="emerald" />}
                          {msg.showCategories && <Choice items={CATEGORIES} onPick={chooseCategory} tone="cyan" />}
                          {msg.showModes && <Choice items={['Practice Mode', 'Mock Exam Mode']} onPick={(label) => startQuiz(label.includes('Mock') ? 'MOCK' : 'PRACTICE', label)} tone="amber" />}
                        </div>
                      </div>
                    ))}
                    <div ref={endRef} />
                  </div>
                  <div className="flex gap-3 border-t border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-slate-900/20">
                    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage()} className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-800 outline-none focus:border-cyan-400 dark:border-white/5 dark:bg-slate-900/60 dark:text-white" placeholder="Type your choice..." />
                    <button onClick={sendMessage} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white"><Send size={16} /></button>
                  </div>
                </>
              )}
              {botState === 'LOADING' && <div className="flex h-full flex-col items-center justify-center p-8 text-center"><RefreshCw className="animate-spin text-cyan-400" size={34} /><h3 className="mt-5 text-base font-bold">Synthesizing inorganic MCQs...</h3><p className="mt-2 max-w-xs text-xs text-slate-500">Building {targetExam} questions for {currentCategory}.</p></div>}
              {botState === 'QUIZ' && <div className="flex-1 overflow-y-auto"><QuizArea questions={currentQuiz} examMode={examMode} targetExam={targetExam} difficulty={difficulty} onComplete={(results: any) => { setQuizResults(results); setBotState('RESULTS'); }} onCancel={resetWizard} /></div>}
              {botState === 'RESULTS' && <QuizResults score={quizResults?.score} total={currentQuiz.length} answers={quizResults?.answers || []} examMode={examMode} targetExam={targetExam} difficulty={difficulty} onRetry={() => { setCurrentQuiz(generateInorganicQuiz(currentCategory, difficulty)); setBotState('QUIZ'); }} onNewQuiz={resetWizard} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Choice: React.FC<{ items: string[]; onPick: (item: string) => void; tone: 'cyan' | 'emerald' | 'amber' }> = ({ items, onPick, tone }) => {
  const color = tone === 'emerald' ? 'border-emerald-400/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-200' : tone === 'amber' ? 'border-amber-400/30 bg-amber-500/5 text-amber-600 dark:text-amber-200' : 'border-cyan-400/30 bg-cyan-500/5 text-cyan-600 dark:text-cyan-200';
  return <div className="mt-4 flex max-h-[220px] flex-wrap gap-2 overflow-y-auto">{items.map((item) => <button key={item} onClick={() => onPick(item)} className={`rounded-full border px-4 py-2 text-xs font-bold transition hover:bg-cyan-500/10 ${color}`}>{item}</button>)}</div>;
};

export default InorganicQuizBot;
