import { AnimatePresence, motion } from "framer-motion";
import { Bot, Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const starterMessages = [
  {
    sender: "bot",
    text: "Hi, I am your chemistry doubt assistant. Ask me anything from organic or inorganic chemistry."
  }
];

const quickPrompts = [
  "Explain SN1 vs SN2",
  "Why lanthanide contraction happens?",
  "Periodic trends shortcut",
  "Organic acidity order"
];

const CHAT_TIMEOUT_MS = 18000;

function buildChemistryAnswer(rawQuestion) {
  const question = rawQuestion.toLowerCase();

  if (question.includes("sn1") || question.includes("sn2")) {
    return "SN1 is two-step and forms a carbocation, so tertiary substrates and polar protic solvents help. SN2 is one-step backside attack, so methyl or primary substrates and strong nucleophiles in polar aprotic solvents are best. The key memory hook is: SN1 depends on carbocation stability, SN2 depends on low steric hindrance.";
  }

  if (question.includes("lanthanide") || question.includes("contraction") || question.includes("f block") || question.includes("f-block")) {
    return "Lanthanide contraction is the steady decrease in ionic size from La to Lu. It happens because 4f electrons shield nuclear charge poorly, so the effective nuclear charge keeps pulling the electron cloud inward. It explains similar sizes of 4d and 5d transition elements, such as Zr and Hf.";
  }

  if (question.includes("periodic") || question.includes("trend") || question.includes("atomic radius") || question.includes("ionization")) {
    return "Across a period, atomic radius decreases and ionization energy/electronegativity generally increase because effective nuclear charge increases. Down a group, atomic radius increases and ionization energy generally decreases because new shells and shielding dominate.";
  }

  if (question.includes("acid") || question.includes("basic") || question.includes("acidity") || question.includes("basicity")) {
    return "For acidity, stability of the conjugate base is the main idea. Electron-withdrawing groups increase acidity, electron-donating groups decrease it, and resonance stabilization makes an anion more stable. For basicity, check lone-pair availability: resonance delocalization usually reduces basicity.";
  }

  if (question.includes("grignard")) {
    return "Grignard reagents act like carbon nucleophiles and strong bases. They must be kept dry because water or alcohols protonate them immediately to form alkanes, destroying the reagent. They are very useful for forming new carbon-carbon bonds with carbonyl compounds.";
  }

  if (question.includes("coordination") || question.includes("ligand") || question.includes("crystal field")) {
    return "In coordination chemistry, ligands split metal d orbitals into different energy levels. Strong-field ligands like CN- and CO give larger splitting and often low-spin complexes. Weak-field ligands like F- and H2O give smaller splitting and often high-spin complexes.";
  }

  if (question.includes("haloalkane") || question.includes("haloarene")) {
    return "Haloalkanes usually undergo nucleophilic substitution more easily because the C-X bond is a normal polar sigma bond. Haloarenes are less reactive because resonance gives the aryl C-X bond partial double-bond character, making it shorter and stronger.";
  }

  return "A good way to attack this doubt is to identify the chapter, the driving force, and the exception. In organic chemistry, first check electron movement, stability, and steric hindrance. In inorganic chemistry, check periodic trend, oxidation state, size, shielding, and ligand effects. Ask the same doubt with a reaction, element, or option list and I can make the explanation more exact.";
}

export default function ChemistryDoubtBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);

  const speakReply = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    utterance.rate = 0.95;
    utterance.volume = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = utterance.onerror = () => {
      if (utteranceRef.current === utterance) {
        utteranceRef.current = null;
        setSpeaking(false);
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeaking(false);
  };

  const speechSupported = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  useEffect(() => () => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
  }, []);

  const askChemistryApi = async (text, history) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);
    let response;

    try {
      response = await fetch("/api/chemistry-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history: history.slice(-8)
        })
      });
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new Error(`Chemistry API returned ${response.status}`);
    }

    const data = await response.json();
    if (!data?.reply) throw new Error("Chemistry API returned no reply");
    return data.reply;
  };

  const sendQuestion = async (value = input) => {
    const text = value.trim();
    if (!text) return;

    setInput("");
    const userMessage = { sender: "user", text };
    setMessages((current) => [...current, userMessage]);
    setThinking(true);

    try {
      const reply = await askChemistryApi(text, [...messages, userMessage]);
      setMessages((current) => [...current, { sender: "bot", text: reply }]);
    } catch {
      setMessages((current) => [...current, { sender: "bot", text: buildChemistryAnswer(text) }]);
    } finally {
      setThinking(false);
    }
  };

  const toggleVoiceTyping = () => {
    if (!speechSupported || typeof window === "undefined") return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    recognition.onerror = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results, (result) => result[0]?.transcript || "").join(" ").trim();
      setInput(transcript);
      if (Array.from(event.results).some((result) => result.isFinal) && transcript) {
        sendQuestion(transcript);
      }
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
    }
  };

  return (
    <div className="fixed right-5 top-5 z-[80]">
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            aria-label="Open AI chemistry assistant"
            title="AI Chemistry Assistant"
            className="grid h-16 w-16 place-items-center rounded-[1.25rem] border border-fuchsia-400/60 bg-[#090916]/78 text-fuchsia-100 shadow-[0_0_34px_rgba(168,85,247,0.48),inset_0_0_20px_rgba(168,85,247,0.16)] backdrop-blur-xl transition hover:border-fuchsia-200 hover:shadow-[0_0_46px_rgba(255,64,241,0.62),inset_0_0_26px_rgba(168,85,247,0.2)]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-fuchsia-500/20 text-fuchsia-200 shadow-[0_0_22px_rgba(255,64,241,0.75)]">
              <Bot size={28} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            className="w-[min(360px,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-cyan-200/25 bg-black/72 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42),0_0_36px_rgba(34,211,238,0.18)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-cyan-300/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                  <Bot size={18} />
                </span>
                <div>
                  <h2 className="text-sm font-bold">Chemistry Doubt Bot</h2>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200/70">Organic + Inorganic</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-cyan-300/40 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div key={`${message.sender}-${index}`} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[86%] rounded-lg px-3 py-2 text-sm leading-6 ${message.sender === "user" ? "bg-cyan-500 text-white" : "border border-white/10 bg-white/[0.055] text-slate-100"}`}>
                    <p>{message.text}</p>
                    {message.sender === "bot" && index > 0 && (
                      <button
                        type="button"
                        onClick={() => (speaking ? stopReading() : speakReply(message.text))}
                        className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-200 transition hover:text-white"
                        title={speaking ? "Stop reading aloud" : "Read this answer aloud"}
                        aria-label={speaking ? "Stop reading aloud" : "Read this answer aloud"}
                      >
                        {speaking ? <VolumeX size={13} /> : <Volume2 size={13} />} {speaking ? "Stop reading" : "Read aloud"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <p className="max-w-[86%] rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 text-sm leading-6 text-slate-100">
                    Thinking through the chemistry...
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-cyan-300/10 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => sendQuestion(prompt)} className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-[10px] font-bold text-cyan-100 transition hover:border-cyan-200/50">
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && sendQuestion()}
                  placeholder="Type your chemistry doubt..."
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                />
                <button
                  type="button"
                  onClick={toggleVoiceTyping}
                  disabled={!speechSupported || thinking}
                  title={speechSupported ? "Voice typing" : "Voice typing is not supported in this browser"}
                  className={`grid h-10 w-10 place-items-center rounded-lg border transition ${listening ? "border-rose-300 bg-rose-400/15 text-rose-100" : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200"}`}
                >
                  {listening ? <MicOff size={17} /> : <Mic size={17} />}
                </button>
                <button type="button" disabled={thinking} onClick={() => sendQuestion()} className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white transition hover:opacity-95 disabled:opacity-50">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
