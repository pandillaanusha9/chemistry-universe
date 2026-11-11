# Speech Functionality

## Browser APIs used

Speech functions use the browser Web Speech API; there is no external TTS/STT service or audio dependency. Availability therefore depends on browser implementation, user permission, system voices and the page context.

## Speech-to-text (voice typing)

### Active root chatbot

`src/components/ChemistryDoubtBot.jsx` detects `window.SpeechRecognition || window.webkitSpeechRecognition`. The mic button creates a recognition object with:

- `lang = navigator.language || 'en-US'`;
- interim results enabled;
- non-continuous capture;
- one alternative.

`onresult` joins transcript alternatives, places the live transcript in input state, and calls `sendQuestion(transcript)` once a final result exists. `onstart`, `onend`, `onerror`, button toggling, try/catch around `.start()`, and effect cleanup maintain recognition state. Browser microphone permission is required; unsupported browsers show the existing unsupported title and disabled control.

### Legacy organic chat page

`organic-chemistry-visualizer/src/pages/ChatPage.jsx` also creates browser speech recognition. This is implemented code but the root app does not currently route to `ChatPage`.

## Text-to-speech

### Root chatbot replies

The active bot attaches **Read aloud** to bot messages. `speakReply(text)` creates `SpeechSynthesisUtterance`, sets rate/volume, tracks start/end/error state, and invokes `window.speechSynthesis.speak`. The control changes to **Stop reading**, which calls `speechSynthesis.cancel()` through `stopReading`. Unmount cleanup aborts recognition and cancels queued speech.

### Organic reaction narration

`components/voice/VoiceButton.jsx` calls `toggleSpeech(reaction)` in `SpeechController.js`. The controller builds a queue from a reaction’s title, reactants, reagents, conditions, products, observations and mechanism. It selects an available preferred English voice where possible, speaks sequential `SpeechSynthesisUtterance` objects, and dispatches custom browser events:

- `reaction-speech-state` drives play/pause/resume labels;
- `reaction-speech-highlight` lets `ReactionBlock.jsx` glow the relevant reaction detail.

`stopSpeaking` cancels speech, invalidates the session, clears the queue and clears highlights. The first `speak()` occurs synchronously after the user click path to preserve browser user activation.

### Inorganic narration

- `hooks/useVoiceNarration.ts` offers `speak`, `stop`, `speaking`, `isMuted` and `toggleMute`, backed by global mute state and subscriber set.
- `VoiceNarrator.tsx`, `PeriodicTrends.tsx`, and block modules (`SBlockModule`, `PBlockModule`, `DBlockModule`, `FBlockModule`) invoke speech for explanatory/application content.
- Several modules choose an available English/Indian-English voice when possible and otherwise rely on browser synthesis.

## Requirements and limitations

| Capability | Requirement | Code behavior if unavailable |
|---|---|---|
| Voice typing | Supporting browser + granted microphone permission | Root mic control is disabled when recognition constructor is absent; recognition errors end listening. |
| Read aloud | Supporting `speechSynthesis` and an installed/system voice | Functions return without speech when synthesis is absent; errors reset speech state. |
| 3rd-party speech | Not implemented | No cloud audio/STT request exists. |

Speech recognition is inherently not portable across every browser. The code includes the WebKit-prefixed constructor to support Chromium variants, but no code can create recognition in an engine that does not implement it.
