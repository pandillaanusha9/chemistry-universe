# Technology Stack Audit

## Root build: declared versions and verified use

| Technology | Declared version | Actual use | Files / responsibility |
|---|---:|---|---|
| React | `^19.2.6` | Used | `src/main.jsx`, all JSX/TSX components: components, state, effects and rendering. |
| React DOM | `^19.2.6` | Used | `createRoot(...)` in `src/main.jsx`. |
| React Router DOM | `^7.15.0` | Used | Root routes; links; organic nested routes. |
| Vite | `^8.0.12` | Used | Root `dev`, `build`, `preview` scripts and `vite.config.js`. |
| `@vitejs/plugin-react` | `^6.0.2` | Used | Root Vite plugin for JSX/Fast Refresh. |
| Tailwind CSS + `@tailwindcss/vite` | `^4.3.0` | Used | Root plugin and utility classes throughout JSX/TSX. |
| Three.js | `^0.184.0` | Used | Directly imported in landing scene and inorganic 3D renderers. |
| React Three Fiber | `^9.6.1` | Used | `<Canvas>` and `useFrame` in root landing and inorganic atom/molecule components. |
| React Three Drei | `^10.7.7` | Used | `Float`, `Line`, `Stars`, `Text`, `OrbitControls`, `Html`. |
| React Three Postprocessing | `^3.0.4` | Used | `EffectComposer` and `Bloom` in inorganic 3D viewers. |
| Framer Motion | `^12.23.24` | Used | Page/component transitions and interactive motion. |
| Lucide React | `^0.468.0` | Used | SVG icon components across root, organic and inorganic UI. |
| 3Dmol | `^2.5.4` | Partially used | Components use the global browser bundle `/public/vendor/3Dmol-min.js`, not the npm module import. |

`motion-dom` and `motion-utils` are declared directly in the root package, but no root/source import of either was found. Framer Motion may depend on them internally; they are **not directly implemented by project source**.

## Technologies supplied by the imported source trees

### Organic source tree

`organic-chemistry-visualizer/package.json` declares React, router, Three.js, R3F/Drei, 3Dmol, Framer Motion, Lucide, Tailwind/PostCSS, Vite, and `gsap`.

- The root build uses the organic JSX files that import React Router, Framer Motion, Lucide and global 3Dmol.
- **GSAP `^3.15.0` is installed but no source import was found.**
- The organic standalone Vite config is not used by the root build; it is useful only if that subproject is run independently.
- `@react-three/fiber`, Drei and Three.js are declared in this subproject, but its inspected organic pages use 3Dmol for molecule viewing; the root landing and inorganic code are the verified R3F consumers.

### Inorganic source tree

`periodic table/package.json` declares TypeScript, Vite, React, Framer Motion, Three.js, R3F/Drei/Postprocessing, Tailwind, and type packages. The TypeScript/TSX implementation actively uses React, Framer Motion, Three/R3F/Drei/Postprocessing, Tailwind utilities and Lucide icons. Its own Vite config is not used when the root app imports `periodic table/src/App.tsx`.

## Backend and AI technologies

| Technology | Status | Where / why |
|---|---|---|
| Gemini REST `generateContent` | Active root path | `api/chemistryChatCore.js` posts to Google Generative Language API. The reply powers Chemistry Doubt Bot. |
| Vercel serverless convention | Active deployment path | `api/chemistry-chat.js` exports the request handler. |
| Node/Vite middleware | Active local-development path | Custom Vite middleware exposes the same route and shared core. |
| Express 4 | Present, separate legacy backend | `organic-chemistry-visualizer/server/server.js`, listening on port 5000 if started separately. |
| Google Generative AI SDK | Present, separate legacy backend | Express server uses `@google/generative-ai` and `gemini-1.5-flash`. |
| CORS, dotenv, multer | Present, separate legacy backend | Express config, environment loading, and in-memory image uploads. |

The root organic route does **not** render `ChatPage.jsx`, so `src/services/apiService.js` and the Express port-5000 chat/AI quiz path are not invoked by the currently integrated root route. Organic `QuizBot` may call its quiz service, which attempts the port-5000 API before falling back to local question data.

## Browser platform APIs

- **Web Speech Recognition**: `SpeechRecognition`/`webkitSpeechRecognition` in `ChemistryDoubtBot.jsx` and `ChatPage.jsx`; microphone input is browser/permission dependent.
- **Web Speech Synthesis**: `SpeechSynthesisUtterance` and `window.speechSynthesis` in root bot, organic reaction narration, and inorganic narration/trends modules.
- **WebGL**: used by Three.js/R3F and 3Dmol in supported browsers.
- **Fetch / AbortController**: root Gemini request and frontend API requests.

## Development/deployment tools

- Vite development server and Rollup-based production build.
- Vercel rewrite configuration in `vercel.json`: all paths rewrite to `index.html`; API files follow Vercel’s `/api` convention.
- npm lockfiles pin resolved package trees in each independently installable project folder.
