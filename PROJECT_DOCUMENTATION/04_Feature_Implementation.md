# Feature-by-Feature Implementation

## Root landing experience

**Purpose:** present the two chemistry portals in a procedural 3D scene.

`ChemistryUniverseHome.jsx` creates `AtomModel`, `BenzeneRing`, `DnaFragment`, and `ElementCard3D` from Three primitives. `ChemistryScene` uses R3F `useFrame` to respond gently to pointer position and animate meshes. `<Canvas>` renders the scene; Drei supplies `Float`, `Stars`, `Line`, and `Text`; Framer Motion runs the loading overlay and portal-button animation. React Router `Link` sends users to `/organic` or `/inorganic`.

## Organic learning area

**Page shell:** `components/layout/AppShell.jsx` provides background, navbar, `<Outlet>`, and floating `QuizBot`.

**Home page:** `pages/HomePage.jsx` displays category cards and two decorative 3Dmol molecules. Its `Floating3DMolecule` loads `/vendor/3Dmol-min.js` if necessary, creates a viewer, adds XYZ from `moleculeModels`, applies custom bond orders, assigns styles by element, and rotates every animation frame.

**Category page:** `pages/CategoryPage.jsx` receives `categorySlug` via `useParams`, obtains its content from `chemistryContent.js`, and composes the relevant sections. The content module supplies category metadata, explanation text, reactions, test material, serializable chapter content, and XYZ molecular strings; this is local data, not a content API.

**Lesson sections:** `IntroductionSection`, `PhysicalPropertiesSection`, `ImportantOrdersSection`, `NamedReactionsSection`, `ConversionsSection`, and `TestsSection` are reusable presentational learning sections. `SectionShell` standardizes their layout. `ReactionBlock` shows a reaction and delegates graphical representation to `ReactionVisualization`; `VoiceButton` invokes `SpeechController` to narrate the selected reaction and broadcast highlight state.

**Organic quiz:** `QuizBot.jsx` is a conversational configuration wizard: entrance exam → difficulty → category → practice/mock mode. `quizService.js` first tries `generateAIQuiz` using the legacy port-5000 service and falls back to its local question bank when unavailable. `QuizArea.jsx` manages question index, selection, timer, answers, score and completion callback. `QuizResults.jsx` presents results/retry/new-quiz actions.

## Inorganic learning area

**Navigation/state:** `periodic table/src/App.tsx` has a `ViewState`, maps URL paths to views, pushes history entries, and handles browser back/forward via `popstate`. `LandingPage` and `FuturisticNavbar` lead to periodic table and block modules.

**Periodic table:** `PeriodicTable.tsx` maps `ELEMENTS` into `ElementTile` instances. It receives `onSelectElement`, `hoveredCategory` and setter from `App.tsx`; selected elements set `activeElement`.

**Selected element screen:** when `activeElement` is non-null, `App.tsx` loads `components/AtomViewer.tsx` with `React.lazy`. `InfoPanel` displays mass, configuration, group/period and shell information. `OrbitalControls` changes a `HighlightState` for all/shell/subshell filtering. `CloseButton` clears selection.

**Block learning:** `SBlockModule`, `PBlockModule`, `DBlockModule`, and `FBlockModule` use local block-specific data and shared UI such as `ElementSelector`, `CompoundCard`, `ApplicationCard`, `TrendVisualizer`, `BlockLearningPage`, and `chemistry/MoleculeViewer`. Some application/compound cards expose narration through the Web Speech API.

**Inorganic quiz:** `InorganicQuizBot.tsx` has a parallel wizard but generates questions locally from `baseQuestions`; `generateInorganicQuiz` filters/pads/shuffles static records. It reuses the organic `QuizArea.jsx` and `QuizResults.jsx` components directly.

## Chemistry Doubt Bot

`ChemistryDoubtBot.jsx` is mounted at the root, so it appears on every route. It stores open state, typed text, messages, loading, recognition and speech state. Quick prompts call `sendQuestion`; normal messages call `askChemistryApi`, which sends JSON to `/api/chemistry-chat`. Successful replies append to messages; request failure calls local `buildChemistryAnswer`, a small keyword-based fallback. Bot replies expose browser text-to-speech read/stop controls. The mic button starts Web Speech recognition and submits a final transcript.

## Scope clarification

`organic-chemistry-visualizer/src/pages/ChatPage.jsx` is feature-rich (sessions, image upload, voice and port-5000 tutor calls) but no active root/organic integrated route renders it. It is documented as present code, not an active page in the root route map.
