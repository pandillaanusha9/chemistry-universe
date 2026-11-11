let currentUtterance = null;
let speechQueue = [];
let queueIndex = 0;
let currentReactionTitle = null;
let isProgrammaticallyPaused = false;
let playNextFn = null;
let startTimeout = null;
let narrationSessionId = 0;
const activeUtterances = new Set();

// Prime voices for browsers
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

export const toggleSpeech = (reaction) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  // If the same reaction is being played/paused:
  if (currentReactionTitle === reaction.title && (window.speechSynthesis.speaking || isProgrammaticallyPaused)) {
    if (isProgrammaticallyPaused) {
      // Resume playback programmatically
      isProgrammaticallyPaused = false;
      window.dispatchEvent(new CustomEvent("reaction-speech-state", {
        detail: { state: "playing", title: reaction.title }
      }));
      if (playNextFn) {
        playNextFn();
      }
    } else {
      // Pause playback programmatically (cancel current utterance, save queueIndex)
      isProgrammaticallyPaused = true;
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
      activeUtterances.clear();
      window.dispatchEvent(new CustomEvent("reaction-speech-state", {
        detail: { state: "paused", title: reaction.title }
      }));
    }
  } else {
    // Start a fresh narration
    isProgrammaticallyPaused = false;
    startNarration(reaction);
  }
};

const startNarration = (reaction) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  // Increment session ID to cancel any prior active callbacks
  narrationSessionId++;
  const currentSessionId = narrationSessionId;

  // Clear any pending start timeout
  if (startTimeout) {
    clearTimeout(startTimeout);
    startTimeout = null;
  }

  // 1. Stop any ongoing speech and clean highlights
  isProgrammaticallyPaused = false;
  
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.cancel();
  activeUtterances.clear();
  
  window.dispatchEvent(new CustomEvent("reaction-speech-highlight", { detail: { key: null } }));

  currentReactionTitle = reaction.title;
  window.dispatchEvent(new CustomEvent("reaction-speech-state", {
    detail: { state: "playing", title: reaction.title }
  }));

  try {
    console.debug("[SpeechController] startNarration for:", reaction.title, "session:", currentSessionId);
  } catch (e) {}

  // 2. Build the list of text blocks with their respective highlight keys
  const steps = [
    { key: "title", text: `${reaction.title}.` },
    { key: "reactants", text: `Reactants are ${reaction.reactants}.` },
    { key: "reagent", text: `Reagents are ${reaction.reagent}.` },
    { key: "catalyst", text: reaction.catalyst && reaction.catalyst !== "As required" ? `Catalyst is ${reaction.catalyst}.` : "" },
    { key: "conditions", text: `Conditions are ${reaction.conditions}.` },
    { key: "temperature", text: reaction.temperature && reaction.temperature !== "Not specified" ? `Temperature is ${reaction.temperature}.` : "" },
    { key: "sideProducts", text: reaction.sideProducts && reaction.sideProducts !== "Nil" ? `Side products are ${reaction.sideProducts}.` : "Side products are Nil." },
    { key: "majorProduct", text: `Major product formed is ${reaction.majorProduct}.` },
    { key: "minorProduct", text: reaction.minorProduct && reaction.minorProduct !== "Trace side product" ? `Minor product is ${reaction.minorProduct}.` : "" },
  ];

  // Add Color Changes if real changes exist
  if (reaction.colorChanges && reaction.colorChanges.length > 0) {
    const realChanges = reaction.colorChanges.filter(c => c.label !== "Indicator" && c.label !== "");
    if (realChanges.length > 0) {
      const colorChangeText = "Color changes: " + realChanges.map(c => `${c.label} changes from ${c.from} to ${c.to}`).join(". ") + ".";
      steps.push({ key: "observations", text: colorChangeText });
    }
  }

  // Add Observations if they exist
  if (reaction.observations && reaction.observations.length > 0) {
    steps.push({ key: "observations", text: `Observations include: ${reaction.observations.join('. ')}.` });
  }

  // Add mechanism steps
  if (reaction.mechanism && reaction.mechanism.length > 0) {
    reaction.mechanism.forEach((step, idx) => {
      steps.push({
        key: `mechanism_${idx}`,
        text: `Mechanism step ${idx + 1}. ${step}.`
      });
    });
  }

  // Filter out empty lines
  speechQueue = steps.filter(step => step.text && step.text.trim() !== "");
  queueIndex = 0;

  if (speechQueue.length === 0) return;

  // 3. Play queue helper
  const playNext = () => {
    // If the session has changed, abort immediately to prevent overlapping audio (resound)
    if (currentSessionId !== narrationSessionId) return;

    // If the reaction has changed or been reset, abort loop
    if (currentReactionTitle !== reaction.title) return;
    
    // If we are programmatically paused, stop advancing the queue
    if (isProgrammaticallyPaused) return;

    if (queueIndex >= speechQueue.length) {
      // Completed narration naturally! Reset states
      currentReactionTitle = null;
      window.dispatchEvent(new CustomEvent("reaction-speech-highlight", { detail: { key: null } }));
      window.dispatchEvent(new CustomEvent("reaction-speech-state", {
        detail: { state: "stopped", title: reaction.title }
      }));
      return;
    }

    const currentStep = speechQueue[queueIndex];
    
    // Dispatch highlight event to let React component know which box to glow
    window.dispatchEvent(new CustomEvent("reaction-speech-highlight", { detail: { key: currentStep.key } }));

    // Phonetic replacements for chemically accurate pronunciation
    const spokenText = currentStep.text
      .replace(/\bcation\b/gi, "kat-ai-yun")
      .replace(/\bcations\b/gi, "kat-ai-yuns");

    // Create utterance with safe defaults and debug logging
    const utterance = new SpeechSynthesisUtterance(spokenText);
    activeUtterances.add(utterance);

    // Natural speed, normal pitch, and clear volume settings
    utterance.rate = 0.92; // Natural speed, highly audible and clear
    utterance.pitch = 1.08; // Slightly brighter female-friendly tone
    utterance.volume = 1.0; // Max volume for clear audibility

    // Locate all available speech synthesis voices
    const voices = window.speechSynthesis.getVoices() || [];
    try {
      console.debug('[SpeechController] available voices count:', voices.length);
    } catch (e) {}

    const safeFind = (fn) => {
      try {
        return voices.find(fn);
      } catch (e) {
        return undefined;
      }
    };

    // Prioritize English (India) female voices for an Indian accent.
    // Fall back to other English female voices, then any female voice, then any English voice.
    const findIndianFemaleVoice = () => {
      // 1. English (India) Female Voice
      let voice = safeFind(v => 
        (v.lang || '').toLowerCase().replace('_', '-').includes('en-in') && 
        (/(female|heera|priya|neerja|google|girl|woman|zira)/i.test(v.name || ''))
      );
      if (voice) return voice;

      // 2. English (India) Any Voice
      voice = safeFind(v => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in'));
      if (voice) return voice;

      // 3. English Female Voice (en-US, en-GB, etc.)
      voice = safeFind(v => 
        (v.lang || '').toLowerCase().startsWith('en') && 
        (/(female|zira|samantha|karen|veena|hazel|moira|tessa|google|girl|woman)/i.test(v.name || ''))
      );
      if (voice) return voice;

      // 4. Any Female Voice
      voice = safeFind(v => /(female|zira|samantha|karen|veena|hazel|moira|tessa|google|girl|woman)/i.test(v.name || ''));
      if (voice) return voice;

      // 5. Any English Voice
      voice = safeFind(v => (v.lang || '').toLowerCase().startsWith('en'));
      if (voice) return voice;

      // 6. Default fallback
      return voices[0] || null;
    };

    const targetVoice = findIndianFemaleVoice();

    if (targetVoice) {
      try {
        utterance.voice = targetVoice;
        if (targetVoice.lang) utterance.lang = targetVoice.lang;
        console.debug('[SpeechController] selected voice:', targetVoice.name, targetVoice.lang);
      } catch (e) {
        console.warn('[SpeechController] failed to assign voice', e);
      }
    }

    utterance.onend = () => {
      activeUtterances.delete(utterance);
      if (currentSessionId !== narrationSessionId) return;
      if (isProgrammaticallyPaused) return;
      queueIndex++;
      playNext();
    };

    utterance.onerror = (e) => {
      activeUtterances.delete(utterance);
      console.error('Speech Synthesis Error:', e);
      if (currentSessionId !== narrationSessionId) return;
      if (isProgrammaticallyPaused) return;
      queueIndex++;
      playNext();
    };

    currentUtterance = utterance;
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
      console.debug('[SpeechController] speaking:', spokenText);
    } catch (e) {
      activeUtterances.delete(utterance);
      console.error('[SpeechController] speak() failed:', e);
      // Advance to next to avoid stuck state
      queueIndex++;
      playNext();
    }
  };

  playNextFn = playNext;
  // Start while the button click still has user activation. Delaying this call can
  // cause browsers to discard speech started outside the user gesture.
  playNext();
};

export const stopSpeaking = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  isProgrammaticallyPaused = false;

  // Increment session ID to cancel any active callbacks
  narrationSessionId++;

  if (startTimeout) {
    clearTimeout(startTimeout);
    startTimeout = null;
  }

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.cancel();
  activeUtterances.clear();

  const title = currentReactionTitle;
  currentReactionTitle = null;
  playNextFn = null;
  // Reset queue to avoid resuming stale items
  speechQueue = [];
  queueIndex = 0;
  window.dispatchEvent(new CustomEvent("reaction-speech-highlight", { detail: { key: null } }));
  window.dispatchEvent(new CustomEvent("reaction-speech-state", {
    detail: { state: "stopped", title: title }
  }));
};
