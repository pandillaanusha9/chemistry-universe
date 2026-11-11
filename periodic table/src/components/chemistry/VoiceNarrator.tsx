import React, { useEffect, useRef, useState } from 'react';
import { useVoiceNarration } from '../../hooks/useVoiceNarration';

interface VoiceNarratorProps {
  label: string;
  text: string;
  steps?: string[];
  onStepChange?: (step: number | null) => void;
  onComplete?: () => void;
  className?: string;
}

export const VoiceNarrator: React.FC<VoiceNarratorProps> = ({
  label,
  text,
  steps = [],
  onStepChange,
  onComplete,
  className = ''
}) => {
  const { speak, stop, speaking, isMuted } = useVoiceNarration();
  const timers = useRef<number[]>([]);
  const [active, setActive] = useState(false);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    return () => {
      clearTimers();
      onStepChange?.(null);
    };
  }, [onStepChange]);

  const handleClick = () => {
    clearTimers();
    setActive(true);
    speak(text);

    if (steps.length > 0) {
      const interval = Math.max(1100, Math.floor((text.length / 14 / steps.length) * 1000));
      steps.forEach((_, index) => {
        timers.current.push(window.setTimeout(() => onStepChange?.(index), index * interval));
      });
      timers.current.push(window.setTimeout(() => {
        onStepChange?.(null);
        setActive(false);
        onComplete?.();
      }, steps.length * interval + 800));
    } else {
      const fallbackDuration = Math.max(1800, Math.min(9000, text.length * 45));
      timers.current.push(window.setTimeout(() => {
        setActive(false);
        onComplete?.();
      }, fallbackDuration));
    }
  };

  const handleStop = () => {
    clearTimers();
    stop();
    setActive(false);
    onStepChange?.(null);
    onComplete?.();
  };

  return (
    <button
      type="button"
      onClick={active || speaking ? handleStop : handleClick}
      className={`rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.14)] transition hover:border-cyan-300 hover:bg-cyan-400/15 ${className}`}
    >
      {active || speaking ? 'Stop' : label}{isMuted ? ' Muted' : ''}
    </button>
  );
};
