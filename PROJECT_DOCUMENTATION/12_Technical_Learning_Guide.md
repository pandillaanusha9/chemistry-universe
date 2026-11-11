# Technical Learning Guide

## React components, props, state and hooks

A component is a function that returns UI. `ChemistryUniverseHome()` returns the landing page; `AtomModel({ position, color, scale })` is reusable because data enters through **props**.

**State** is data that changes UI: `ChemistryDoubtBot` keeps `messages`, `thinking`, `listening` and `speaking` with `useState`. Calling `setMessages` schedules a render with the new chat bubbles.

**Effects** run after render for outside-world work. Examples: the home loading timer uses `useEffect`; 3Dmol viewers create/clean up an imperative DOM/WebGL viewer in `useEffect`; the bot cleanup cancels recognition/speech. `useRef` stores mutable values such as recognition, utterances or Three meshes without re-rendering every animation tick.

## Props and component communication

`PeriodicTable` receives `onSelectElement` from inorganic `App.tsx`. A tile invokes the callback with an element; parent state becomes `activeElement`; `AtomViewer` receives that selected element as a prop. This upward callback/downward prop pattern is central React data flow.

## APIs, REST and asynchronous JavaScript

`fetch` is asynchronous, so `askChemistryApi` is `async` and waits using `await`. The browser sends HTTP POST JSON; a handler returns HTTP status plus JSON. `try/catch/finally` makes loading-state cleanup happen whether success or failure occurs. `AbortController` can cancel a slow fetch.

Root chat is REST-like: `POST /api/chemistry-chat` creates/generates one answer from the submitted representation. Gemini itself is called with another POST to `generateContent`.

## Frontend/backend boundary and secrets

React browser code is public to visitors. A Gemini key must therefore remain on the server: `ChemistryDoubtBot` only calls `/api/chemistry-chat`; `chemistryChatCore` reads the key from its server environment and makes the Google request. Never move the key into a `VITE_*` browser variable, JSX, or source repository.

## 3D pipeline

WebGL is the browser graphics layer. Three.js constructs scene objects (geometry, material, meshes, lights, camera). R3F lets React describe those objects as JSX. `<Canvas>` owns the renderer; `useFrame` updates an object every frame. In `ElectronOrbit`, elapsed time becomes an angle; sine/cosine turn that angle into x/y orbital position.

```text
React props/state → R3F JSX scene → Three.js objects → WebGL GPU draw → pixels
```

3Dmol is a different, specialized molecular renderer. The project gives it authored XYZ coordinates, tells it stick/sphere styles, then it draws atoms/bonds in its own viewer.

## Gemini integration

`buildGeminiPrompt` combines system constraints, recent dialogue and current message. `requestGeminiReply` makes a model request, and `extractGeminiText` reads candidate parts. Model output is not trusted as code; it is rendered as plain text in the root bot. The legacy quiz endpoint must parse generated JSON, which illustrates why structured AI output requires validation.

## Speech APIs

`SpeechRecognition` turns microphone audio into transcript events. `SpeechSynthesisUtterance` turns text into a queued spoken utterance. Both are browser capabilities rather than npm packages, so feature detection and permission/error handlers are needed. The project does this with `window.SpeechRecognition || window.webkitSpeechRecognition` and `window.speechSynthesis` checks.

## Build and deployment

Vite transforms JS/JSX/TSX and bundles assets. `npm run dev` serves modules and hot updates; `npm run build` produces `dist/`. Vercel can serve that SPA and execute functions in `api/`. `vercel.json` ensures a direct navigation such as `/organic/haloalkanes` returns the SPA entry point, after which React Router chooses the page.

## How to explain the project succinctly

“Chemistry Universe is a React/Vite SPA that composes organic and inorganic learning modules. It uses R3F/Three for interactive atomic visuals and 3Dmol for coordinate-based molecules, local curated chemistry data for lessons/quizzes, and a server-side Gemini route for the global doubt bot. Browser speech APIs provide voice input and narrated learning content.”
