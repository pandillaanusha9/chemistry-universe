import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, RotateCcw, Plus, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Sparkles, Clock, Zap, BookOpen } from "lucide-react";

export default function QuizResults({ score, total, answers, examMode = "PRACTICE", targetExam = "NEET Chemistry", difficulty = "medium", onRetry, onNewQuiz }) {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const accuracy = Math.round((score / total) * 100);
  
  // Calculate average response time
  const totalReactionTime = answers.reduce((sum, a) => sum + (a.reactionTime || 0), 0);
  const avgTime = total > 0 ? (totalReactionTime / total).toFixed(1) : "0.0";

  // Filter wrong answers
  const wrongAnswers = answers.filter((a) => !a.isCorrect);
  
  // Extract unique weak concepts based on incorrect answers
  const weakConcepts = [...new Set(wrongAnswers.map(a => a.conceptTag).filter(Boolean))];

  // In Mock Mode, show all answers for complete exam review. In Practice, just show wrong ones.
  const reviewList = examMode === "MOCK" ? answers : wrongAnswers;

  const toggleAccordion = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  // Competitive performance evaluation
  const getTutorFeedback = () => {
    if (accuracy === 100) {
      return {
        title: "Absolute Mastery! (Rank 1)",
        text: `Outstanding! You achieved 100% correct responses under ${targetExam} competitive rules. Your conceptual understanding is elite!`,
        color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      };
    }
    if (accuracy >= 80) {
      return {
        title: "Highly Competitive Score!",
        text: `Excellent! An accuracy of ${accuracy}% puts you in the top tier of competitive candidates. Review the minor weak spots below.`,
        color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
      };
    }
    if (accuracy >= 50) {
      return {
        title: "Solid Foundation - Refinement Needed",
        text: `Good intermediate effort. Sourced straight from the chapter trends, you have locked in core topics, but some reagent bounds need revision.`,
        color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      };
    }
    return {
      title: "Revision Required (Boost Activation Energy)",
      text: "Standard competitive chemistry is challenging. Focus on reaction mechanisms, study the 3D molecular pathways in the visualization panels, and retry.",
      color: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    };
  };

  const feedback = getTutorFeedback();

  return (
    <div className="flex h-full flex-col justify-between p-4 overflow-y-auto scrollbar-thin">
      {/* Accuracy Meter & Score */}
      <div className="flex flex-col items-center text-center">
        <div className="flex w-full items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 px-2 py-0.5 rounded border border-cyan-400/10 uppercase tracking-wide">
            {targetExam} | {difficulty.toUpperCase()}
          </span>
          <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/10 uppercase tracking-wide">
            {examMode} Assessment
          </span>
        </div>

        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative flex h-20 w-20 items-center justify-center"
        >
          {/* Radial Progress Ring */}
          <svg className="absolute h-full w-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="34"
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="5"
              fill="transparent"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="34"
              className="stroke-cyan-500 dark:stroke-cyan-400"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={213.5}
              initial={{ strokeDashoffset: 213.5 }}
              animate={{ strokeDashoffset: 213.5 - (213.5 * accuracy) / 100 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{accuracy}%</span>
            <span className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Score</span>
          </div>
        </motion.div>

        <h3 className="mt-2 text-base font-bold text-slate-950 dark:text-white flex items-center gap-1.5 justify-center">
          <Award size={16} className="text-cyan-500" />
          <span>Final Score: {score} / {total}</span>
        </h3>

        {/* Competitive Speed & Accuracy Stats */}
        <div className="mt-3 w-full grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2 dark:border-white/5 dark:bg-white/5 text-center flex items-center justify-center gap-2">
            <Clock size={14} className="text-cyan-400" />
            <div className="text-left">
              <span className="text-[8px] uppercase font-bold tracking-wider text-slate-400 block">Avg Speed</span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">{avgTime}s/Q</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2 dark:border-white/5 dark:bg-white/5 text-center flex items-center justify-center gap-2">
            <Zap size={14} className="text-emerald-400" />
            <div className="text-left">
              <span className="text-[8px] uppercase font-bold tracking-wider text-slate-400 block">Accuracy Rank</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                {accuracy >= 90 ? "A++" : accuracy >= 75 ? "A" : accuracy >= 50 ? "B" : "Needs Rev."}
              </span>
            </div>
          </div>
        </div>

        {/* AI Tutor Card */}
        <div className={`mt-3 w-full rounded-2xl border p-3 text-xs leading-relaxed ${feedback.color} backdrop-blur-sm text-left`}>
          <div className="flex items-center gap-1 font-bold mb-1">
            <Sparkles size={14} className="animate-pulse" />
            <span>{feedback.title}</span>
          </div>
          <p className="opacity-90">{feedback.text}</p>
        </div>
      </div>

      {/* Weak-Topic Analyzer Section */}
      {weakConcepts.length > 0 && (
        <div className="mt-4 rounded-2xl border border-rose-500/10 bg-rose-500/5 p-3 text-left">
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
            <Zap size={12} className="animate-pulse" />
            You are weak in the following topics:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {weakConcepts.map((concept) => (
              <span
                key={concept}
                className="rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-[9px] font-bold text-rose-600 dark:text-rose-400"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Explanations Accordion */}
      <div className="mt-5 flex-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <BookOpen size={13} className="text-cyan-400" />
          <span>
            {examMode === "MOCK" ? "Mock Exam Comprehensive Review Key" : "AI Tutor Explanation Log"}
          </span>
        </h4>

        {reviewList.length === 0 ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={16} className="mx-auto mb-1 text-emerald-500" />
            No incorrect answers! Absolute mechanistic perfection.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {reviewList.map((answer, index) => {
              const isExpanded = expandedIdx === index;
              return (
                <div
                  key={`wrong-ans-${index}`}
                  className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/60 dark:border-white/5 dark:bg-white/2 backdrop-blur-sm"
                >
                  {/* Trigger */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between p-3 text-left transition hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 pr-4 min-w-0">
                      {answer.isCorrect ? (
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={14} className="text-rose-500 shrink-0" />
                      )}
                      <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                        {answer.question}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp size={14} className="text-slate-400 animate-pulse" /> : <ChevronDown size={14} className="text-slate-400" />}
                  </button>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-white/5"
                      >
                        <div className="p-3 text-xs flex flex-col gap-2.5">
                          <div className="flex justify-between text-[9px] font-bold text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
                            <span>CONCEPT: {answer.conceptTag}</span>
                            <span>SOLVING SPEED: {answer.reactionTime?.toFixed(1)}s</span>
                          </div>

                          <div>
                            <span className="font-semibold text-rose-500 dark:text-rose-400 block mb-0.5">Your selection:</span>
                            <div className={`rounded-lg border px-2.5 py-1.5 ${
                              answer.isCorrect 
                                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300"
                                : "border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-300"
                            }`}>
                              {answer.selected}
                            </div>
                          </div>

                          {!answer.isCorrect && (
                            <div>
                              <span className="font-semibold text-emerald-500 dark:text-emerald-400 block mb-0.5">Correct response:</span>
                              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5 text-emerald-600 dark:text-emerald-300">
                                {answer.correct}
                              </div>
                            </div>
                          )}

                          <div className="rounded-lg border border-cyan-500/20 bg-slate-50 dark:bg-slate-900/60 p-2.5 leading-relaxed text-slate-600 dark:text-slate-300">
                            <span className="font-bold text-cyan-500 dark:text-cyan-400 flex items-center gap-1 mb-1">
                              <Sparkles size={12} />
                              AI Chemical Explanation:
                            </span>
                            <p className="font-medium text-[11px] leading-relaxed">{answer.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-white/5 pt-3">
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/70 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Retry Assessment</span>
        </button>
        <button
          onClick={onNewQuiz}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-2.5 text-xs font-bold text-white shadow-[0_4px_15px_rgba(6,182,212,0.25)] transition hover:opacity-95 cursor-pointer"
        >
          <Plus size={13} />
          <span>New Assessment</span>
        </button>
      </div>
    </div>
  );
}
