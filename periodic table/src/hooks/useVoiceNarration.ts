import { useState, useEffect, useCallback } from 'react';

// Global mute state to share across different components easily
let globalIsMuted = false;
const listeners = new Set<(muted: boolean) => void>();

export const getGlobalMuteState = () => globalIsMuted;
export const setGlobalMuteState = (muted: boolean) => {
  globalIsMuted = muted;
  if (muted && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  listeners.forEach((listener) => listener(muted));
};

export const useVoiceNarration = () => {
  const [isMuted, setIsMuted] = useState(globalIsMuted);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const handleMuteChange = (muted: boolean) => {
      setIsMuted(muted);
    };
    listeners.add(handleMuteChange);
    return () => {
      listeners.delete(handleMuteChange);
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    // Always cancel current speech before speaking the next line to avoid queue backlog
    window.speechSynthesis.cancel();

    if (globalIsMuted) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang || 'en-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.pitch = 1.08;
    utterance.rate = 0.94;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const toggleMute = useCallback(() => {
    setGlobalMuteState(!globalIsMuted);
  }, []);

  return {
    speak,
    stop,
    speaking,
    isMuted,
    toggleMute
  };
};
