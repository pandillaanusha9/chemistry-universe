import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Clock, ArrowRight, CheckCircle2, XCircle, AlertCircle, Sparkles } from "lucide-react";

function ChemistryVisualizer({ reactionData, questionType }) {
  if (!reactionData) return null;

  // Format helper to convert formulas like CH3-CH2-OH to beautiful subscript/superscript markup
  const formatFormula = (str) => {
    if (!str) return "";
    // Replace charges first
    let formatted = str
      .replace(/(\w+)\+/g, "$1<sup>+</sup>")
      .replace(/(\w+)\-/g, "$1<sup>-</sup>")
      .replace(/([0-9]+)‡/g, "<sup>$1‡</sup>")
      .replace(/‡/g, "<sup>‡</sup>");
      
    // Replace numbers with sub tags, ignoring numbers inside sup tags
    formatted = formatted.replace(/([a-zA-Z\)])([0-9]+)/g, "$1<sub>$2</sub>");
    
    // Replace organic bonds with clean unicode symbols for professional representation
    formatted = formatted
      .replace(/-/g, "—")
      .replace(/==/g, "═")
      .replace(/#/g, "≡");
      
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  // Check if it's a standard chemical equation containing a reaction arrow
  const isEquation = reactionData.includes("->") || reactionData.includes("-->") || reactionData.includes("=>") || reactionData.includes("---");
  
  if (isEquation) {
    // Split into steps
    const parts = reactionData.split(/(?:->|-->|=>)/);
    
    // If it's a simple 1-step reaction A --(catalyst)--> B
    if (parts.length === 2) {
      let reactants = parts[0].trim();
      let products = parts[1].trim();
      let catalyst = "";

      // Parse out catalyst if written in parentheses like "---(dry ether)--->" or similar
      const catalystMatch = reactants.match(/---(?:\((.*?)\))?---/i) || products.match(/---(?:\((.*?)\))?---/i) || reactants.match(/\((.*?)\)/i) || products.match(/\((.*?)\)/i);
      if (catalystMatch) {
        catalyst = catalystMatch[1] || "";
        reactants = reactants.replace(/---(?:\(.*?\))?---/gi, "").replace(/\(.*?\)/gi, "").trim();
        products = products.replace(/---(?:\(.*?\))?---/gi, "").replace(/\(.*?\)/gi, "").trim();
      }

      // Also clean up any loose arrows/dashes in the reactants or products
      reactants = reactants.replace(/---/g, "").trim();
      products = products.replace(/---/g, "").trim();

      // Check if this is a product prediction question
      const isProductPrediction = questionType === "REACTION_PREDICTION" || products.toLowerCase().includes("?") || products.toLowerCase().includes("product");

      return (
        <div className="my-5 rounded-2xl border border-cyan-500/10 dark:border-cyan-500/20 bg-slate-50 dark:bg-slate-950/40 p-4 shadow-[0_4px_20px_rgba(6,182,212,0.03)] dark:shadow-[0_0_20px_rgba(6,182,212,0.06)] backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Reactant Tile */}
            <div className="flex min-w-[100px] flex-col items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/5 dark:border-cyan-500/30 dark:bg-cyan-950/20 px-4 py-3 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">Reactants</span>
              <span className="mt-1 font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                {formatFormula(reactants)}
              </span>
            </div>

            {/* Glowing Arrow & Catalyst */}
            <div className="flex flex-col items-center justify-center min-w-[120px] relative">
              {catalyst && (
                <span className="mb-1 rounded bg-slate-100 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                  {formatFormula(catalyst)}
                </span>
              )}
              {/* Custom SVG Neon Arrow */}
              <div className="relative w-20 h-4 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 80 16">
                  <defs>
                    <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0,8 H 76 M 68,2 L 78,8 L 68,14" 
                    stroke="url(#arrow-grad)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="mt-1 text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Reaction Flow</span>
            </div>

            {/* Product Tile */}
            <div className={`flex min-w-[100px] flex-col items-center justify-center rounded-xl border px-4 py-3 shadow-sm transition ${
              isProductPrediction 
                ? "border-amber-500/40 bg-amber-500/5 dark:bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.08)] animate-pulse" 
                : "border-emerald-500/20 bg-emerald-500/5 dark:border-emerald-500/30 dark:bg-emerald-950/20"
            }`}>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${isProductPrediction ? "text-amber-500 dark:text-amber-400" : "text-emerald-500 dark:text-emerald-400"}`}>
                {isProductPrediction ? "Identify Product" : "Products"}
              </span>
              <span className="mt-1 font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                {isProductPrediction ? (
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-500 dark:text-amber-400 font-bold text-base font-mono">?</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-300">({formatFormula(products)})</span>
                  </span>
                ) : (
                  formatFormula(products)
                )}
              </span>
            </div>
          </div>
        </div>
      );
    }
  }

  // Fallback for simple structural formulas or intermediate states
  return (
    <div className="my-4 flex items-center justify-center rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-white/2 p-3 font-mono text-xs text-slate-700 dark:text-cyan-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] select-none">
      <Sparkles size={12} className="mr-2 text-cyan-400 shrink-0" />
      <span className="tracking-wide">{formatFormula(reactionData)}</span>
    </div>
  );
}


export default function QuizArea({ questions, examMode = "PRACTICE", targetExam = "NEET Chemistry", difficulty = "medium", onComplete, onCancel }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  const currentQuestion = questions[currentIdx];

  // Timer logic
  useEffect(() => {
    // Reset timer for new question
    setTimeLeft(30);
    setHasAnswered(false);
    setSelectedOption(null);
    setStartTime(Date.now()); // Mark start time

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx]);

  const handleTimeOut = () => {
    setHasAnswered(true);
    const newAnswer = {
      question: currentQuestion.question,
      selected: "Time Expired",
      correct: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      isCorrect: false,
      conceptTag: currentQuestion.conceptTag,
      difficulty: currentQuestion.difficulty,
      reactionTime: 30, // max allotted
    };
    setAnswers((prev) => [...prev, newAnswer]);
  };

  const handleOptionClick = (option) => {
    if (hasAnswered) return; // Prevent double clicks

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(option);
    setHasAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    const reactionTime = (Date.now() - startTime) / 1000; // in seconds

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const newAnswer = {
      question: currentQuestion.question,
      selected: option,
      correct: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      isCorrect: isCorrect,
      conceptTag: currentQuestion.conceptTag,
      difficulty: currentQuestion.difficulty,
      reactionTime: Math.min(reactionTime, 30),
    };
    setAnswers((prev) => [...prev, newAnswer]);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Quiz completed! Calculate final score
      const finalScore = score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
      onComplete({
        score: finalScore,
        answers: [...answers],
      });
    }
  };

  // Timer color matches time remaining (Cyan -> Yellow -> Red)
  const getTimerColorClass = () => {
    if (timeLeft > 15) return "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]";
    if (timeLeft > 7) return "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]";
    return "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse";
  };

  const getTimerTextColorClass = () => {
    if (timeLeft > 15) return "text-cyan-400";
    if (timeLeft > 7) return "text-amber-400";
    return "text-rose-400 font-bold";
  };

  return (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Progress & Header */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 gap-2">
          <span className="font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 px-2 py-0.5 rounded border border-cyan-400/10 truncate max-w-[200px]">
            {targetExam} | {difficulty.toUpperCase()}
          </span>
          <span className="font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md shrink-0">
            MCQ {currentIdx + 1}/{questions.length}
          </span>
        </div>

        {/* Custom Progress Bar */}
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Timer Bar */}
        <div className="mt-3 flex items-center gap-2">
          <Clock size={14} className={getTimerTextColorClass()} />
          <div className="relative h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800/50 overflow-hidden">
            <motion.div
              className={`h-full ${getTimerColorClass()}`}
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
              key={`timer-bar-${currentIdx}`}
            />
          </div>
          <span className={`text-xs min-w-8 text-right font-mono ${getTimerTextColorClass()}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* Question Text */}
            <h3 className="text-sm font-medium leading-relaxed text-slate-900 dark:text-white sm:text-base">
              {currentQuestion.question}
            </h3>

            {/* Premium Chemistry Equation & Structure Visualizer */}
            <ChemistryVisualizer 
              reactionData={currentQuestion.reactionData} 
              questionType={currentQuestion.questionType} 
            />

            {/* Options List */}
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                let optionStyle = "border-slate-200 bg-white/50 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 hover:border-cyan-400/50 hover:bg-cyan-500/5 dark:hover:border-cyan-400/30";
                let feedbackIcon = null;

                if (hasAnswered) {
                  if (examMode === "MOCK") {
                    // MOCK MODE: Locked choice with neutral cyan glow, no direct answers disclosed
                    if (isSelected) {
                      optionStyle = "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:border-cyan-500/40 dark:bg-cyan-500/15 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.18)]";
                    } else {
                      optionStyle = "border-slate-200/50 bg-white/20 text-slate-400 dark:border-white/5 dark:bg-white/2 dark:text-slate-500 opacity-60 pointer-events-none";
                    }
                  } else {
                    // PRACTICE MODE: Reveal answers instantly
                    if (isCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
                      feedbackIcon = <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />;
                    } else if (isSelected) {
                      optionStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]";
                      feedbackIcon = <XCircle size={16} className="text-rose-500 dark:text-rose-400 shrink-0" />;
                    } else {
                      optionStyle = "border-slate-200/50 bg-white/20 text-slate-400 dark:border-white/5 dark:bg-white/2 dark:text-slate-500 opacity-60 pointer-events-none";
                    }
                  }
                }

                return (
                  <motion.button
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => handleOptionClick(option)}
                    whileHover={!hasAnswered ? { scale: 1.01 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.99 } : {}}
                    animate={isSelected && !isCorrect && examMode !== "MOCK" ? { x: [0, -6, 6, -6, 6, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs sm:text-sm font-medium transition-all backdrop-blur-sm cursor-pointer ${optionStyle}`}
                  >
                    <span className="pr-4">{option}</span>
                    {feedbackIcon}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="flex h-12 items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
        <div>
          {hasAnswered && timeLeft === 0 && (
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
              <AlertCircle size={14} />
              <span>Time expired!</span>
            </div>
          )}
          {hasAnswered && examMode === "MOCK" && (
            <div className="flex items-center gap-1 text-[10px] text-cyan-500 font-bold tracking-wide uppercase">
              <Clock size={12} className="animate-pulse" />
              <span>Response Locked</span>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {hasAnswered && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_4px_15px_rgba(6,182,212,0.3)] hover:opacity-95 hover:scale-103 transition cursor-pointer"
            >
              <span>{currentIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}</span>
              <ArrowRight size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
