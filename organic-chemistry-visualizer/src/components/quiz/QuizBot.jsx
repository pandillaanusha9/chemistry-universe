import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, X, Send, Sparkles, Atom, ChevronRight, Terminal, RefreshCw, Layers, Award, AlertCircle } from "lucide-react";
import { generateQuiz, generateQuizFromContent, getCategoryTitle } from "./quizService";
import { getSerializedTopicContent } from "../../data/chemistryContent";
import QuizArea from "./QuizArea";
import QuizResults from "./QuizResults";

const CATEGORIES = [
  "Haloalkanes", "Haloarenes", "Alcohols", "Phenols", "Ethers",
  "Aldehydes", "Ketones", "Carboxylic Acids", "Amines", "Azo Compounds",
  "Named Reactions", "Organic Conversions", "Reaction Mechanisms"
];

// Helper to check if a typed string matches any category
const findMatchingCategory = (input) => {
  const query = input.toLowerCase().trim();
  return CATEGORIES.find(cat => {
    const c = cat.toLowerCase();
    return c.includes(query) || query.includes(c) ||
           (c === "carboxylic acids" && (query.includes("carboxylic") || query.includes("acid"))) ||
           (c === "reaction mechanisms" && query.includes("mechanism")) ||
           (c === "named reactions" && query.includes("named"));
  });
};

export default function QuizBot() {
  const { categorySlug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showMockCloseWarning, setShowMockCloseWarning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [botState, setBotState] = useState("CHAT"); // CHAT, LOADING, QUIZ, RESULTS
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [quizResults, setQuizResults] = useState(null);
  
  // Conversational configuration wizard steps: 
  // 0: Select Target Exam, 1: Select Difficulty, 2: Select Category, 3: Select Mode
  const [configStep, setConfigStep] = useState(0);
  const [targetExam, setTargetExam] = useState("NEET Chemistry");
  const [difficulty, setDifficulty] = useState("medium");
  const [examMode, setExamMode] = useState("PRACTICE"); // PRACTICE, MOCK
  
  const messagesEndRef = useRef(null);

  // Initialize wizard on mount
  useEffect(() => {
    resetConfigWizard();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, botState]);

  const resetConfigWizard = () => {
    setConfigStep(0);
    setBotState("CHAT");
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: "bot",
        text: "Hello! I am Catalyst, your AI Organic Chemistry Prep Assistant. Strictly sourced from standard competitive syllabus bounds, let's configure your customized assessment. First, which entrance examination are you preparing for?",
        showExams: true,
      }
    ]);
  };

  const handleExamSelect = (exam) => {
    setTargetExam(exam);
    const userMsg = { id: `user_exam_${Date.now()}`, sender: "user", text: exam };
    setMessages((prev) => [...prev, userMsg]);
    setConfigStep(1);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_diff_${Date.now()}`,
          sender: "bot",
          text: `Target locked: ${exam}! Next, choose your cognitive difficulty level:`,
          showDifficulties: true,
        }
      ]);
    }, 600);
  };

  const handleDifficultySelect = (diffKey, diffLabel) => {
    setDifficulty(diffKey);
    const userMsg = { id: `user_diff_${Date.now()}`, sender: "user", text: diffLabel };
    setMessages((prev) => [...prev, userMsg]);
    setConfigStep(2);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_cat_${Date.now()}`,
          sender: "bot",
          text: `Difficulty set to ${diffLabel}! Now, choose an Organic Chemistry category to test:`,
          showCategories: true,
        }
      ]);
    }, 600);
  };

  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
    const userMsg = { id: `user_cat_${Date.now()}`, sender: "user", text: category };
    setMessages((prev) => [...prev, userMsg]);
    setConfigStep(3);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_mode_${Date.now()}`,
          sender: "bot",
          text: `Topic set: ${category}! Lastly, which assessment mode do you want to start?`,
          showModes: true,
        }
      ]);
    }, 600);
  };

  const handleModeSelect = (modeKey, modeLabel) => {
    setExamMode(modeKey);
    const userMsg = { id: `user_mode_${Date.now()}`, sender: "user", text: modeLabel };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      triggerQuizGeneration(currentCategory, difficulty, targetExam, modeKey);
    }, 600);
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    if (!textToSend) setInputValue("");

    // Conversational parsing depending on step
    if (configStep === 0) {
      const lower = text.toLowerCase();
      let matched = null;
      if (lower.includes("jee") && lower.includes("adv")) matched = "JEE Advanced";
      else if (lower.includes("jee")) matched = "JEE Main";
      else if (lower.includes("bits")) matched = "BITSAT";
      else if (lower.includes("eamc") || lower.includes("eam")) matched = "EAMCET";
      else if (lower.includes("neet")) matched = "NEET Chemistry";
      
      if (matched) {
        handleExamSelect(matched);
      } else {
        const userMsg = { id: `user_err_${Date.now()}`, sender: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot_err_exam_${Date.now()}`,
              sender: "bot",
              text: "I couldn't match that exam. Please select one of our prep targets below:",
              showExams: true,
            }
          ]);
        }, 500);
      }
    } else if (configStep === 1) {
      const lower = text.toLowerCase();
      let key = null;
      let label = "";
      if (lower.includes("easy")) {
        key = "easy";
        label = "Easy";
      } else if (lower.includes("hard") || lower.includes("adv") || lower.includes("extreme")) {
        key = "hard";
        label = "Hard";
      } else if (lower.includes("mod") || lower.includes("medium")) {
        key = "medium";
        label = "Medium";
      }

      if (key) {
        handleDifficultySelect(key, label);
      } else {
        const userMsg = { id: `user_err_${Date.now()}`, sender: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot_err_diff_${Date.now()}`,
              sender: "bot",
              text: "Please click one of the cognitive levels below:",
              showDifficulties: true,
            }
          ]);
        }, 500);
      }
    } else if (configStep === 2) {
      const matchedCategory = findMatchingCategory(text);
      if (matchedCategory) {
        handleCategorySelect(matchedCategory);
      } else {
        const userMsg = { id: `user_err_${Date.now()}`, sender: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot_err_cat_${Date.now()}`,
              sender: "bot",
              text: `I couldn't find a direct match for "${text}". Please click one of the specialized categories below:`,
              showCategories: true,
            }
          ]);
        }, 500);
      }
    } else if (configStep === 3) {
      const lower = text.toLowerCase();
      let key = null;
      let label = "";
      if (lower.includes("mock") || lower.includes("timed")) {
        key = "MOCK";
        label = "Mock Exam Mode";
      } else if (lower.includes("prac") || lower.includes("study")) {
        key = "PRACTICE";
        label = "Practice Mode";
      }

      if (key) {
        handleModeSelect(key, label);
      } else {
        const userMsg = { id: `user_err_${Date.now()}`, sender: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot_err_mode_${Date.now()}`,
              sender: "bot",
              text: "Please select Practice or Timed Mock to start your assessment:",
              showModes: true,
            }
          ]);
        }, 500);
      }
    }
  };

  const triggerQuizGeneration = (category, diff = difficulty, exam = targetExam, mode = examMode) => {
    setBotState("LOADING");

    setMessages((prev) => [
      ...prev,
      {
        id: `bot_gen_${Date.now()}`,
        sender: "bot",
        text: `Launching ${exam} [${diff.toUpperCase()} - ${mode} MODE] Quiz for *${category}*...`,
      }
    ]);

    setTimeout(async () => {
      try {
        // Resolve slug based on currently visited page context or clicked category
        let activeSlug = categorySlug || category.toLowerCase().replace(/\s+/g, "-");
        if (activeSlug === "carboxylic-acids") activeSlug = "carboxylic-acids";
        else if (activeSlug === "azo-compounds") activeSlug = "azo-compounds";
        
        // Extract & serialize educational page/chapter content
        const topicContent = getSerializedTopicContent(activeSlug);
        
        // Call our modular AI service layer with context
        const quiz = await generateQuizFromContent(topicContent, diff);
        setCurrentQuiz(quiz);
        setBotState("QUIZ");
      } catch (e) {
        console.error("Quiz generation failed:", e);
        resetConfigWizard();
      }
    }, 2400);
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setBotState("RESULTS");
  };

  const handleRetry = () => {
    // Directly regenerate and show questions using current parameters
    triggerQuizGeneration(currentCategory, difficulty, targetExam, examMode);
  };

  const handleNewQuiz = () => {
    // New Quiz also returns to starting wizard
    resetConfigWizard();
  };

  const handleClosePanel = () => {
    if (botState === "QUIZ" && examMode === "MOCK") {
      setShowMockCloseWarning(true);
      // Auto-dismiss warning after 4.5 seconds
      setTimeout(() => {
        setShowMockCloseWarning(false);
      }, 4500);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Minimized Floating Icon Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="minimized-btn"
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: 50, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-14 items-center gap-2 rounded-full border border-cyan-400 bg-slate-900/90 px-5 text-sm font-bold text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] backdrop-blur-md cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)] transition-all"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <Atom className="animate-spin text-cyan-400" style={{ animationDuration: '6s' }} size={18} />
            <span>Quiz</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-Screen Immersive Dashboard Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 w-screen h-screen bg-white/95 dark:bg-slate-950/98 backdrop-blur-3xl flex flex-col overflow-hidden transition-colors"
          >
            {/* Ambient Background Particles */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-40 dark:opacity-80">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-fullscreen-${i}`}
                  animate={{
                    y: [750, -50],
                    x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                    scale: [0.6, 1.4, 0.6],
                    opacity: [0, 0.45, 0]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 8,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: "easeInOut"
                  }}
                  className="absolute h-2.5 w-2.5 rounded-full bg-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                />
              ))}
            </div>

            {/* Top Header Banner */}
            <div className="border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-slate-900/40 w-full px-6 py-4 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-200 ring-1 ring-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                  <Atom className="animate-spin text-cyan-400" style={{ animationDuration: '10s' }} size={20} />
                </div>
                <div className="text-left">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Catalyst AI competitive exam platform</span>
                    <Sparkles size={12} className="text-cyan-400 shrink-0" />
                  </h2>
                  <p className="text-[10px] font-medium tracking-wide text-emerald-500 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                    AI Entrance Prep Environment Active
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClosePanel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-sm hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Immersive Center-Focussed Column Layout */}
            <div className="flex-1 w-full max-w-[680px] mx-auto flex flex-col overflow-hidden relative border-x border-slate-100 dark:border-white/5 bg-white/40 dark:bg-slate-900/10 shadow-2xl">
              
              {/* STATE 1: CHAT TOPIC SELECTION */}
              {botState === "CHAT" && (
                <div className="h-full flex flex-col justify-between">
                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md rounded-br-none"
                              : "border border-slate-200/80 bg-white/70 text-slate-800 dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-200 rounded-bl-none"
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* 0. Exam Target Choice Pills */}
                          {msg.showExams && (
                            <div className="mt-4 flex flex-wrap gap-2 pr-1">
                              {["NEET Chemistry", "JEE Main", "JEE Advanced", "BITSAT", "EAMCET"].map((exam) => (
                                <button
                                  key={exam}
                                  type="button"
                                  onClick={() => handleExamSelect(exam)}
                                  className="rounded-full border border-cyan-400/30 bg-cyan-500/5 px-4 py-2 text-xs font-bold text-cyan-600 hover:bg-cyan-500/10 dark:border-cyan-400/20 dark:text-cyan-200 dark:hover:bg-cyan-400/10 cursor-pointer transition shadow-[0_2px_8px_rgba(6,182,212,0.1)]"
                                >
                                  {exam}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 1. Difficulty Level Choice Pills */}
                          {msg.showDifficulties && (
                            <div className="mt-4 flex flex-wrap gap-2 pr-1">
                              {[
                                { key: "easy", label: "Easy" },
                                { key: "medium", label: "Medium" },
                                { key: "hard", label: "Hard" }
                              ].map((diff) => (
                                <button
                                  key={diff.key}
                                  type="button"
                                  onClick={() => handleDifficultySelect(diff.key, diff.label)}
                                  className="rounded-full border border-emerald-400/30 bg-emerald-500/5 px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-500/10 dark:border-emerald-400/20 dark:text-emerald-200 dark:hover:bg-emerald-400/10 cursor-pointer transition shadow-[0_2px_8px_rgba(52,211,153,0.1)]"
                                >
                                  {diff.label}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 2. Category Selector Choice Pills */}
                          {msg.showCategories && (
                            <div className="mt-4 flex flex-wrap gap-2 pr-1 max-h-[220px] overflow-y-auto scrollbar-thin">
                              {CATEGORIES.map((cat) => (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => handleCategorySelect(cat)}
                                  className="rounded-full border border-cyan-400/30 bg-cyan-500/5 px-3.5 py-1.5 text-[11px] font-bold text-cyan-600 hover:bg-cyan-500/10 dark:border-cyan-400/20 dark:text-cyan-200 dark:hover:bg-cyan-400/10 cursor-pointer transition shadow-[0_1px_5px_rgba(6,182,212,0.05)]"
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 3. Assessment Mode Choice Pills */}
                          {msg.showModes && (
                            <div className="mt-4 flex flex-wrap gap-2 pr-1">
                              {[
                                { key: "PRACTICE", label: "Practice Mode" },
                                { key: "MOCK", label: "Mock Exam Mode" }
                              ].map((mode) => (
                                <button
                                  key={mode.key}
                                  type="button"
                                  onClick={() => handleModeSelect(mode.key, mode.label)}
                                  className="rounded-full border border-amber-400/30 bg-amber-500/5 px-4 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500/10 dark:border-amber-400/20 dark:text-amber-200 dark:hover:bg-amber-400/10 cursor-pointer transition shadow-[0_2px_8px_rgba(245,158,11,0.1)]"
                                >
                                  {mode.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Tray */}
                  <div className="border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20 p-4 flex gap-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder={
                        configStep === 0 ? "Type target exam (e.g. NEET, JEE)..." :
                        configStep === 1 ? "Type difficulty (e.g. Easy, Hard)..." :
                        configStep === 2 ? "Type topic category..." :
                        "Type assessment mode..."
                      }
                      className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-cyan-400 focus:outline-none dark:border-white/5 dark:bg-slate-900/60 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400/60"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md hover:opacity-95 transition cursor-pointer"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 2: LAB GENERATING SKELETON */}
              {botState === "LOADING" && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-950/20">
                  {/* Glowing Chemical Beaker / Flask Drawing */}
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    <svg className="absolute h-full w-full text-cyan-400" viewBox="0 0 100 100">
                      <path
                        d="M38,20 L62,20 M45,20 L45,45 L20,80 C18,83 20,87 24,87 L76,87 C80,87 82,83 80,80 L55,45 L55,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                      />
                      <motion.path
                        d="M26,78 L74,78 C76,78 77,80 76,82 L74,85 C73,86 72,87 70,87 L30,87 C28,87 27,86 26,85 L24,82 C23,80 24,78 26,78 Z"
                        fill="rgba(52,211,153,0.3)"
                        animate={{
                          d: [
                            "M26,78 L74,78 C76,78 77,80 76,82 L74,85 C73,86 72,87 70,87 L30,87 C28,87 27,86 26,85 L24,82 C23,80 24,78 26,78 Z",
                            "M27,76 Q50,81 73,76 C75,76 77,78 76,80 L73,84 C72,86 71,87 69,87 L31,87 C29,87 28,86 27,84 L24,80 C23,78 25,76 27,76 Z",
                            "M26,78 L74,78 C76,78 77,80 76,82 L74,85 C73,86 72,87 70,87 L30,87 C28,87 27,86 26,85 L24,82 C23,80 24,78 26,78 Z"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </svg>

                    {/* Staggered Rising Bubbles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`loading-bubble-${i}`}
                        animate={{
                          y: [28, -45],
                          x: [-15 + Math.random() * 30, -10 + Math.random() * 20],
                          scale: [0.4, 1.2, 0.4],
                          opacity: [0, 0.8, 0]
                        }}
                        transition={{
                          duration: 1.5 + Math.random() * 1,
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: "easeOut"
                        }}
                        className="absolute bottom-6 h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      />
                    ))}
                  </div>

                  {/* Scientific Synthesis Status */}
                  <h3 className="mt-8 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center">
                    <RefreshCw className="animate-spin text-cyan-400" size={18} />
                    <span>Synthesizing competitive exam MCQs...</span>
                  </h3>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 max-w-[320px] leading-relaxed">
                    Filtering standard *{targetExam}* question banks with *{difficulty}* cognitive balancing strictly from chapter nodes.
                  </p>
                </div>
              )}

              {/* STATE 3: ACTIVE PLAYING QUIZ */}
              {botState === "QUIZ" && (
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                  <QuizArea
                    questions={currentQuiz}
                    examMode={examMode}
                    targetExam={targetExam}
                    difficulty={difficulty}
                    onComplete={handleQuizComplete}
                    onCancel={resetConfigWizard}
                  />
                </div>
              )}

              {/* STATE 4: RESULTS DASHBOARD */}
              {botState === "RESULTS" && (
                <div className="flex-1 overflow-hidden">
                  <QuizResults
                    score={quizResults?.score}
                    total={currentQuiz.length}
                    answers={quizResults?.answers}
                    examMode={examMode}
                    targetExam={targetExam}
                    difficulty={difficulty}
                    timeSpent={quizResults?.timeSpent}
                    onRetry={handleRetry}
                    onNewQuiz={handleNewQuiz}
                  />
                </div>
              )}
            </div>

            {/* Mock Exam Exit Warning Overlay */}
            <AnimatePresence>
              {showMockCloseWarning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 10 }}
                    className="max-w-xs w-full rounded-2xl border border-rose-500/30 bg-slate-900 p-5 text-center shadow-[0_0_40px_rgba(244,63,94,0.25)]"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 animate-bounce">
                      <AlertCircle size={26} className="shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                      Mock Exam Active
                    </h3>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      You cannot minimize or exit while a timed mock exam is in progress. Complete the questions to submit your score!
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowMockCloseWarning(false)}
                      className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition cursor-pointer"
                    >
                      Return to Exam
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
