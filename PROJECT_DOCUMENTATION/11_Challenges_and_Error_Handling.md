# Observed Challenges, Error Handling and Limitations

This document distinguishes source evidence from unverified project history. It does not claim that any issue happened during prior development unless visible in code/runtime configuration.

## Error handling that is implemented

| Area | Mechanism | Evidence |
|---|---|---|
| Lazy root routes | Suspense spinner + `RouteErrorBoundary` | `src/App.jsx` |
| Inorganic WebGL atom screen | Class `ErrorBoundary` with diagnostic panel | `periodic table/src/App.tsx` |
| Chat request | Abort controller and 18-second UI timeout | `ChemistryDoubtBot.jsx` |
| Gemini request | 15-second timeout, status mapping, model fallback | `api/chemistryChatCore.js` |
| Chat API methods | 405 for non-POST | Vite middleware and `api/chemistry-chat.js` |
| 3Dmol initialization | Dynamic script load, catch error, viewer cleanup | organic viewers and inorganic molecule viewer |
| Legacy API client | Retry twice with exponential backoff | `services/apiService.js` |
| Legacy quiz parsing | Direct/substring/code-fence JSON parse attempts | legacy Express server |
| Speech | Support guards, onerror/end reset, cancel/stop functions | root/organic/inorganic speech modules |

## Actual architectural complexity

1. **Three codebases are physically present.** The root compiles sibling source directories rather than using declared workspaces. Package aliases/dedupe are a deliberate mitigation for duplicated React/3D libraries.
2. **Two Gemini integration styles coexist.** Root uses REST/Vercel-style handler; legacy organic server uses Express and SDK. This can cause confusion about which environment file, port and endpoint is active.
3. **Two router approaches coexist.** Root/organic uses React Router; inorganic uses local state plus History API. Both work in composition but require care when adding routes.
4. **3D library loading differs.** R3F is bundled as modules while 3Dmol is global/dynamically loaded. WebGL and browser script load can fail independently.

## Observable limitations / potential weaknesses

- Root chatbot uses a small generic local fallback after API failure. It avoids an empty chat but is not a substitute for Gemini answers.
- No persistence/database/authentication was found for chat history, quiz results, user accounts or progress.
- Browser speech recognition availability and microphone permission are outside application control; implementation cannot make unsupported browsers support it.
- Vercel rewrite config is broad; API handler behavior must be validated in actual deployment. No deployment environment settings are stored in source.
- Legacy Express CORS is permissive. Multer uses memory storage and no visible upload size/type policy. This is acceptable for a prototype only after appropriate operational review.
- Legacy Gemini JSON parsing is necessarily defensive because generative output may not be valid JSON; malformed model output can still fail the endpoint.
- Inorganic `Nucleus` uses randomized coordinates and a cap of 45 displayed particles for visual/performance reasons; it is not an exact nucleus model.
- An atomic/electron display is educational visualization, not a scientific wavefunction or quantum calculation.
- There are separate version declarations for the same libraries in root/subprojects. Root aliases mitigate runtime duplication in the combined build, but upgrades must be coordinated.

## Recent fixes visible in current source

- `InorganicQuizBot.tsx` effects use block callbacks, avoiding returning a DOM method result as a React effect cleanup.
- Gemini root core retries alternate models after several service/model errors.
- Reaction narration starts speech in the click flow and avoids forcing a missing language voice.
- Root bot includes answer read/stop controls and recognition cleanup/error handling.

## Recommended validation, not implemented changes

Before deployment, manually test on target browser/device: chat response, microphone prompt/transcript, speech voice output, 3D WebGL performance, direct URL refresh under Vercel, and any legacy Express endpoint that remains intended for use. These are testing recommendations, not claims of missing functionality.
