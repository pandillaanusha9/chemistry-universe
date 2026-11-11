import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Atom, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, 
  Trash2, Plus, Image as ImageIcon, X, ChevronRight, 
  Bot, User as UserIcon, RefreshCw, AlertCircle, FileText, CheckCircle2, Award
} from "lucide-react";
import { chatWithTutor } from "../services/apiService";

// Helper: Custom Markdown-ish Reaction Parser to render chemical formulas and structures elegantly
function formatChemistryText(text) {
  if (!text) return "";
  
  // Replace standard reaction arrows
  let formatted = text
    .replace(/->/g, " ➔ ")
    .replace(/-->/g, " ➔ ")
    .replace(/=>/g, " ➔ ")
    .replace(/\\rightarrow/g, " ➔ ");
  
  // Format common subscript numbers in formulas (like H2O, C6H12O6, NH3)
  // Look for capital letters followed by numbers, but ignore standard words and HTML
  formatted = formatted.replace(/([A-Z])([2-9]|\d{2})(?![A-Za-z])/g, "$1<sub>$2</sub>");
  
  return formatted;
}

export default function ChatPage() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [readOutLoud, setReadOutLoud] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-IN";

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + (prev ? " " : "") + transcript);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (e) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    // Load past sessions from localStorage
    const savedSessions = localStorage.getItem("CATALYST_AI_SESSIONS");
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
        if (parsed.length > 0) {
          setActiveSessionId(parsed[0].id);
          setMessages(parsed[0].messages || []);
        } else {
          startNewSession(true);
        }
      } catch (e) {
        console.error("Failed to parse saved sessions:", e);
        startNewSession(true);
      }
    } else {
      startNewSession(true);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Sync active messages to session storage
  useEffect(() => {
    if (!activeSessionId) return;

    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages,
            lastUpdated: new Date().toISOString(),
            // Summary is the first user query or a default
            summary: s.summary === "New Chat" && messages.length > 0 
              ? messages.find(m => m.sender === "user")?.text?.substring(0, 32) + "..." || "Chemistry Talk"
              : s.summary
          };
        }
        return s;
      });

      localStorage.setItem("CATALYST_AI_SESSIONS", JSON.stringify(updated));
      return updated;
    });
  }, [messages, activeSessionId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const startNewSession = (isInit = false) => {
    const newSession = {
      id: `session_${Date.now()}`,
      summary: "New Chat",
      lastUpdated: new Date().toISOString(),
      messages: [
        {
          id: `welcome_${Date.now()}`,
          sender: "bot",
          text: "Greetings! I am Catalyst AI, your advanced organic chemistry tutor and question setter. How can I help you target competitive success today? You can dictate queries, upload chemical mechanisms, or ask me to generate challenging JEE/NEET questions!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]
    };

    if (isInit) {
      setSessions([newSession]);
      setActiveSessionId(newSession.id);
      setMessages(newSession.messages);
      localStorage.setItem("CATALYST_AI_SESSIONS", JSON.stringify([newSession]));
    } else {
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      setMessages(newSession.messages);
    }
    setErrorMsg("");
  };

  const selectSession = (id) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setActiveSessionId(id);
      setMessages(session.messages || []);
      setErrorMsg("");
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  };

  const deleteSession = (id, e) => {
    e.stopPropagation();
    const filtered = sessions.filter((s) => s.id !== id);
    setSessions(filtered);
    localStorage.setItem("CATALYST_AI_SESSIONS", JSON.stringify(filtered));

    if (filtered.length > 0) {
      if (activeSessionId === id) {
        selectSession(filtered[0].id);
      }
    } else {
      startNewSession(true);
    }
  };

  const clearAllSessions = () => {
    if (window.confirm("Are you sure you want to clear your entire chat history?")) {
      localStorage.removeItem("CATALYST_AI_SESSIONS");
      startNewSession(true);
    }
  };

  // Toggle Voice Input
  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported on this browser. Try Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Text to Speech
  const speakText = (text, e = null) => {
    if (e) e.stopPropagation();
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any current speech

    // Clean up text: Strip markdown and JSON blocks
    let cleanText = text
      .replace(/```json[\s\S]*?```/g, "") // remove JSON question cards
      .replace(/```[\s\S]*?```/g, "code block ignored") // remove other code blocks
      .replace(/[*#_~`\[\]()]/g, "") // remove formatting marks
      .replace(/➔/g, "reacts to form") // make arrows vocal
      .substring(0, 450); // limit length for natural talking

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => (v.lang || "").toLowerCase().replace("_", "-").includes("en-in") && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || "")) ||
      voices.find((v) => (v.lang || "").toLowerCase().replace("_", "-").includes("en-in")) ||
      voices.find((v) => (v.lang || "").toLowerCase().startsWith("en") && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || "")) ||
      voices.find((v) => (v.lang || "").toLowerCase().startsWith("en")) ||
      voices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang || "en-IN";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.94;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = (e) => {
    e.stopPropagation();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // Send Messages
  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend !== null ? textToSend : inputValue;
    if (!text.trim() && !imageFile) return;

    setErrorMsg("");
    const userMsgId = `user_${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: "user",
      text: text,
      image: imagePreview || null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setImageFile(null);
    setImagePreview("");
    setIsLoading(true);

    try {
      // Map history for Gemini API context (user vs model)
      const apiHistory = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));

      // Call API
      const result = await chatWithTutor(text, apiHistory, imageFile);

      if (result.success) {
        const botMsg = {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: result.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMsg]);

        // Auto-read out loud if enabled
        if (readOutLoud) {
          speakText(result.reply);
        }
      } else {
        setErrorMsg(result.message);
        if (result.isOffline) {
          // Display a direct fallback alert inside the feed
          setMessages((prev) => [
            ...prev,
            {
              id: `err_bot_${Date.now()}`,
              sender: "bot",
              text: "⚠️ **Offline Fallback Alert**: I could not reach the live Express gateway (http://localhost:5000). Please ensure your Node server is running so I can tap securely into the Google Gemini API.\n\n*Feel free to browse your page visualizers or practice with offline quizzes in the floating tool below!*",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
        }
      }
    } catch (e) {
      console.error("Failed to send message:", e);
      setErrorMsg("An unexpected connection error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Suggested Chemistry Prompts list
  const suggestedPrompts = [
    {
      title: "Mechanism Breakdown",
      desc: "Explain the step-by-step mechanism of Aldol Condensation.",
      prompt: "Explain the mechanism of Aldol Condensation step-by-step, listing all intermediates like enolates and stereochemistry constraints."
    },
    {
      title: "Interactive MCQ",
      desc: "Generate a competitive NEET question on IUPAC nomenclature.",
      prompt: "Test my chemistry skills: Generate a high-yield NEET level multiple choice question on IUPAC nomenclature."
    },
    {
      title: "Multi-Step Synthesis",
      desc: "Convert Phenol into Acetylsalicylic acid (Aspirin).",
      prompt: "Detail the conversion pathway from Phenol to Aspirin. List all necessary reagents (NaOH, CO2, acetic anhydride) and mechanism stages."
    },
    {
      title: "Sigma & Pi Bonds",
      desc: "Calculate the exact bond count in Benzoic Acid.",
      prompt: "How many sigma and pi bonds are there in Benzoic Acid (C6H5COOH)? Show me the structural calculation breakdown."
    }
  ];

  // Helper component to parse and render a Message (renders standard text OR an interactive question card)
  function MessageBubble({ msg }) {
    const isBot = msg.sender === "bot";
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Look for JSON Question Card blocks in bot response
    let textContent = msg.text || "";
    let questionCardData = null;

    if (isBot) {
      try {
        const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/;
        const match = textContent.match(jsonBlockRegex);
        if (match && match[1]) {
          const parsed = JSON.parse(match[1].trim());
          if (parsed && parsed.isQuestionCard) {
            questionCardData = parsed;
            // Strip the JSON block out of the text so we don't display it raw
            textContent = textContent.replace(jsonBlockRegex, "").trim();
          }
        }
      } catch (err) {
        console.warn("Found JSON block but failed to parse:", err);
      }
    }

    const handleAnswerSelect = (option) => {
      if (isSubmitted) return;
      setSelectedAnswer(option);
      setIsSubmitted(true);
    };

    return (
      <div className={`flex w-full gap-3 ${isBot ? "justify-start" : "justify-end"}`}>
        {/* Avatar */}
        {isBot ? (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Bot size={18} className="animate-pulse" />
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.2)] order-last">
            <UserIcon size={18} />
          </div>
        )}

        <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
          {/* Main message bubble */}
          <div 
            className={`relative rounded-2xl px-4 py-3.5 text-[13px] leading-relaxed shadow-lg backdrop-blur-md transition-all ${
              isBot 
                ? "border border-slate-200/80 bg-white/80 text-slate-800 dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-200 rounded-tl-none hover:border-cyan-500/20" 
                : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-tr-none shadow-[0_4px_15px_rgba(6,182,212,0.15)]"
            }`}
          >
            {/* Play Audio Button for bot messages */}
            {isBot && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-40 hover:opacity-100 transition duration-200">
                <button 
                  onClick={(e) => speakText(msg.text, e)}
                  title="Read out loud"
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Volume2 size={13} />
                </button>
                <button 
                  onClick={stopSpeaking}
                  title="Stop speaking"
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <VolumeX size={13} />
                </button>
              </div>
            )}

            {/* Uploaded Image preview inside the bubble */}
            {msg.image && (
              <div className="mb-3 max-h-[220px] overflow-hidden rounded-lg border border-slate-200 dark:border-white/10">
                <img src={msg.image} alt="User uploads" className="w-full object-contain" />
              </div>
            )}

            {/* Message text content formatted with chemistry tags */}
            <div 
              className="space-y-2 pr-6" 
              dangerouslySetInnerHTML={{ __html: formatChemistryText(textContent) }} 
            />
          </div>

          {/* RENDER INTERACTIVE QUESTION CARD IF DETECTED */}
          {questionCardData && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3.5 w-full rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-5 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-white relative overflow-hidden"
            >
              {/* Decorative atom glow */}
              <div className="absolute top-2 right-2 opacity-5 animate-spin" style={{ animationDuration: "12s" }}>
                <Atom size={60} />
              </div>

              {/* Title Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-4">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={11} className="animate-pulse" />
                  {questionCardData.questionType || "COMPETITIVE MCQ"}
                </span>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[9px] font-bold text-cyan-300 border border-cyan-400/20">
                  JEE Advanced / NEET Standard
                </span>
              </div>

              {/* Question text */}
              <p className="text-xs sm:text-sm font-semibold leading-relaxed mb-3">
                {questionCardData.question}
              </p>

              {/* Chemical Equation if present */}
              {questionCardData.reactionData && (
                <div className="mb-4 rounded-lg bg-slate-900/90 border border-white/5 px-3.5 py-2 font-mono text-xs text-emerald-400 select-all flex items-center justify-between">
                  <span>{questionCardData.reactionData}</span>
                  <FileText size={12} className="text-emerald-400/40" />
                </div>
              )}

              {/* Options buttons */}
              <div className="grid grid-cols-1 gap-2.5">
                {questionCardData.options.map((opt, oIdx) => {
                  const isCorrect = opt === questionCardData.answer;
                  const isSelected = opt === selectedAnswer;
                  
                  let btnStyle = "border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5";
                  let prefixStyle = "bg-white/10 text-slate-300";

                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.15)]";
                      prefixStyle = "bg-emerald-500 text-white";
                    } else if (isSelected) {
                      btnStyle = "border-rose-500/50 bg-rose-500/10";
                      prefixStyle = "bg-rose-500 text-white";
                    } else {
                      btnStyle = "border-white/5 opacity-50";
                      prefixStyle = "bg-white/5 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted}
                      onClick={() => handleAnswerSelect(opt)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[11px] sm:text-xs transition-all duration-200 cursor-pointer ${btnStyle}`}
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-bold ${prefixStyle}`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 border-t border-white/5 pt-4"
                  >
                    <div className="rounded-xl bg-slate-900/60 p-4 border border-white/5 text-[11px] leading-relaxed">
                      <h4 className="font-bold mb-2 flex items-center gap-1.5">
                        {selectedAnswer === questionCardData.answer ? (
                          <>
                            <Award size={14} className="text-amber-400" />
                            <span className="text-emerald-400 font-bold uppercase tracking-wider">Correct! Step-by-Step Mechanism:</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={14} className="text-rose-400" />
                            <span className="text-rose-400 font-bold uppercase tracking-wider">Incorrect. Detailed Explanation:</span>
                          </>
                        )}
                      </h4>
                      <p className="text-slate-300 pr-1 select-text">
                        {questionCardData.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Time stamp */}
          <span className={`text-[9px] mt-1 text-slate-400 ${!isBot ? "text-right" : "text-left"}`}>
            {msg.time}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#030b14] dark:text-white transition-colors relative">
      
      {/* Ambient background neon glows */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -z-10 bg-cyan-400/5 blur-[120px] rounded-full dark:bg-cyan-500/5 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 -z-10 bg-emerald-400/5 blur-[120px] rounded-full dark:bg-emerald-500/5 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* 1. SIDEBAR - Chat history session manager */}
      <aside className="hidden md:flex flex-col w-[260px] shrink-0 border-r border-slate-200 bg-white/70 backdrop-blur-md dark:border-white/5 dark:bg-slate-900/30">
        
        {/* New Session Button */}
        <div className="p-4 border-b border-slate-200 dark:border-white/5">
          <button
            onClick={() => startNewSession()}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-400 bg-slate-900/90 text-white font-bold py-2.5 px-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:border-cyan-300 transition duration-200 cursor-pointer text-xs uppercase tracking-wider"
          >
            <Plus size={15} />
            <span>New Chat Session</span>
          </button>
        </div>

        {/* Saved Sessions list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Saved Sessions
          </h4>
          {sessions.map((s) => {
            const isActive = s.id === activeSessionId;
            return (
              <button
                key={s.id}
                onClick={() => selectSession(s.id)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-3 text-left transition duration-150 cursor-pointer group ${
                  isActive 
                    ? "bg-slate-200/50 dark:bg-slate-900/60 border border-cyan-400/20 shadow-inner" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-900/30"
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Atom size={14} className={isActive ? "text-cyan-400 shrink-0" : "text-slate-400 shrink-0"} />
                  <span className={`text-xs truncate font-medium ${isActive ? "text-slate-950 dark:text-cyan-300" : "text-slate-600 dark:text-slate-350"}`}>
                    {s.summary || "Organic Lesson"}
                  </span>
                </div>
                
                {/* Trash option */}
                <button
                  onClick={(e) => deleteSession(s.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-200 dark:border-white/5 space-y-2">
          {/* Read aloud toggle */}
          <label className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/30 cursor-pointer">
            <input 
              type="checkbox" 
              checked={readOutLoud}
              onChange={(e) => setReadOutLoud(e.target.checked)}
              className="accent-cyan-400"
            />
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Volume2 size={13} className="text-cyan-400" /> Auto-Read Out Loud
            </span>
          </label>

          <button
            onClick={clearAllSessions}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-slate-500 py-2 hover:bg-rose-500/5 hover:border-rose-500/30 hover:text-rose-500 transition duration-150 cursor-pointer text-[10px] uppercase font-bold"
          >
            <Trash2 size={12} />
            <span>Clear History</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Chat Header banner */}
        <div className="border-b border-slate-200 bg-white/70 px-4 py-3.5 flex items-center justify-between backdrop-blur-md dark:border-white/5 dark:bg-slate-900/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-spin" style={{ animationDuration: "12s" }}>
              <Atom size={20} />
            </div>
            <div className="text-left">
              <h2 className="text-sm font-bold flex items-center gap-1.5">
                <span>Catalyst AI organic core</span>
                <Sparkles size={13} className="text-cyan-400" />
              </h2>
              <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-ping"></span>
                IIT-JEE / NEET Expert Tutor Active
              </p>
            </div>
          </div>

          {/* Quick Clear controls for mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => startNewSession()}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="New Chat"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => setReadOutLoud(!readOutLoud)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition cursor-pointer ${
                readOutLoud 
                  ? "border-cyan-500/30 bg-cyan-500/5 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                  : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={readOutLoud ? "Mute replies" : "Vocalize replies"}
            >
              {readOutLoud ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        {/* Chat Feed Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          
          {/* Show Suggested Prompts grid if session contains only the welcome message */}
          {messages.length <= 1 && (
            <div className="max-w-xl mx-auto py-6 text-center space-y-8">
              <div>
                <h3 className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent sm:text-2xl">
                  Intelligent IIT-JEE & NEET Laboratory
                </h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Deeply explain stereochemical mechanisms, count structural bonds, predict pathways, or try customized exam-level quizzes!
                </p>
              </div>

              {/* Suggestions grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-2">
                {suggestedPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.prompt)}
                    className="flex flex-col text-left rounded-2xl border border-slate-200/80 bg-white/40 p-4 shadow-sm backdrop-blur hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/20 dark:hover:bg-slate-900/60 dark:hover:border-cyan-400/30 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-300 uppercase tracking-wider mb-1 flex items-center justify-between w-full">
                      {p.title}
                      <ChevronRight size={10} className="opacity-40" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-medium">
                      {p.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actual Feed List */}
          <div className="max-w-3xl mx-auto space-y-5">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {/* Glowing Typing/Synthesis indicator */}
            {isLoading && (
              <div className="flex w-full justify-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] animate-spin" style={{ animationDuration: '4s' }}>
                  <Atom size={18} />
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-xs dark:border-white/5 dark:bg-slate-900/60 rounded-tl-none shadow-lg backdrop-blur-md flex items-center gap-3">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"></span>
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest animate-pulse">
                    Synthesizing chemical reaction...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input tray bottom */}
        <div className="border-t border-slate-200 bg-white/70 p-4 backdrop-blur-md dark:border-white/5 dark:bg-[#060e17]/80">
          <div className="max-w-3xl mx-auto">
            
            {/* Image Preview bar if uploaded */}
            {imagePreview && (
              <div className="mb-3.5 flex items-center justify-between rounded-xl border border-cyan-400/30 bg-cyan-500/5 p-2 pr-4 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-cyan-400/20 bg-slate-900">
                    <img src={imagePreview} alt="upload preview" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-cyan-300 truncate">
                    Attached: {imageFile?.name || "Chemical Scheme Image"}
                  </span>
                </div>
                <button
                  onClick={removeSelectedImage}
                  className="rounded-full bg-slate-200 hover:bg-slate-300 p-1 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            )}

            {/* Input Form */}
            <div className="flex gap-2.5 relative items-center">
              
              {/* Image upload triggers */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-white transition duration-150 cursor-pointer"
                title="Upload reaction scheme / molecular structures"
              >
                <ImageIcon size={18} />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask Catalyst AI (e.g. Mechanism, predict product, synthesis route...)"
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400/50"
              />

              {/* Voice recognition button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition duration-150 cursor-pointer ${
                  isListening 
                    ? "border-rose-500/40 bg-rose-500/10 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)] animate-pulse" 
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-850"
                }`}
                title={isListening ? "Listening... click to stop" : "Voice input dictation"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              {/* Submit button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md hover:opacity-95 transition cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
