import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { toggleSpeech } from "./SpeechController";

export default function VoiceButton({ reaction }) {
  const [speechState, setSpeechState] = useState("stopped"); // "playing", "paused", "stopped"

  useEffect(() => {
    const handleStateChange = (e) => {
      if (e.detail.title === reaction.title) {
        setSpeechState(e.detail.state);
      } else {
        setSpeechState("stopped");
      }
    };
    window.addEventListener("reaction-speech-state", handleStateChange);
    return () => window.removeEventListener("reaction-speech-state", handleStateChange);
  }, [reaction]);

  const handleClick = () => {
    toggleSpeech(reaction);
  };

  const getButtonContent = () => {
    switch (speechState) {
      case "playing":
        return {
          icon: <Pause size={14} className="fill-current" />,
          text: "Pause Narration"
        };
      case "paused":
        return {
          icon: <Play size={14} className="fill-current" />,
          text: "Resume Narration"
        };
      default:
        return {
          icon: <Play size={14} className="fill-current" />,
          text: "Read Reaction"
        };
    }
  };

  const { icon, text } = getButtonContent();

  const buttonStyle = speechState === "playing"
    ? "bg-amber-600 ring-1 ring-amber-500 text-white shadow-[0_4px_14px_rgba(217,119,6,0.3)] hover:bg-amber-500 hover:ring-amber-400"
    : "bg-cyan-600 ring-1 ring-cyan-500 text-white shadow-[0_4px_14px_rgba(6,182,212,0.3)] hover:bg-cyan-500 hover:ring-cyan-400 dark:bg-cyan-500 dark:text-slate-950 dark:ring-cyan-400 dark:hover:bg-cyan-400";

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${buttonStyle}`}
      title={text}
      aria-label={text}
    >
      {icon}
      {text}
    </button>
  );
}