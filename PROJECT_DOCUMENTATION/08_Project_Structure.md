# Project Structure

```text
chem/
├─ src/                                  # Root integrated React application
│  ├─ App.jsx                            # Root routes, lazy boundaries, global bot
│  ├─ main.jsx                           # React DOM + BrowserRouter bootstrap
│  ├─ styles.css                         # Root visual styles
│  ├─ components/
│  │  ├─ ChemistryUniverseHome.jsx       # Landing R3F scene and portals
│  │  └─ ChemistryDoubtBot.jsx           # Active Gemini chat/voice UI
│  └─ integrations/
│     ├─ OrganicPlatform.jsx              # Imports organic source pages into root routes
│     └─ InorganicPlatform.jsx            # Imports inorganic TypeScript app
├─ api/
│  ├─ chemistry-chat.js                  # Vercel handler
│  └─ chemistryChatCore.js               # Shared Gemini prompt/request/error logic
├─ public/vendor/3Dmol-min.js            # Actual global 3Dmol browser bundle
├─ organic-chemistry-visualizer/         # Imported organic source tree; independently configured
│  ├─ src/components/                    # Layout, lessons, quiz, voice, molecule viewer
│  ├─ src/pages/                         # Home, category, legacy ChatPage
│  ├─ src/data/chemistryContent.js       # Local lesson/reaction/model/question data
│  ├─ src/services/apiService.js          # Legacy Express client
│  ├─ server/server.js                   # Separate Express/Gemini service
│  ├─ public/molecules/                  # SDF molecule assets
│  └─ package.json / vite.config.js      # Standalone configuration
├─ periodic table/                       # Imported inorganic TypeScript source tree
│  ├─ src/App.tsx                        # View-state shell and history control
│  ├─ src/data/elements.ts               # Element records
│  ├─ src/components/                    # Table, atom viewer, modules, quiz, landing
│  ├─ src/hooks/useVoiceNarration.ts     # Shared browser narration hook
│  ├─ src/utils/orbitHelpers.ts          # Electron/subshell helpers
│  └─ package.json / vite.config.ts      # Standalone configuration
├─ vite.config.js                        # Active root dev/build configuration
├─ vercel.json                           # SPA rewrite configuration
├─ package.json                          # Active root dependency/scripts declaration
└─ PROJECT_DOCUMENTATION/                # This audit
```

## Important integration relationships

- Root `OrganicPlatform.jsx` imports `AppShell`, `HomePage`, `CategoryPage` from the organic folder; it does not import the organic folder’s `App.jsx` or `main.jsx`.
- Root `InorganicPlatform.jsx` imports `periodic table/src/App.tsx`; it does not run `periodic table/src/main.tsx`.
- Root `vite.config.js` aliases/deduplicates shared packages to avoid multiple React/Three/R3F/router copies when these external source folders are compiled together.
- Root `index.html` is the actual host and includes 3Dmol vendor script. Subproject `index.html` files belong only to standalone subproject operation.

## Generated/untracked-by-architecture content

- `node_modules/` and `dist/` folders are dependency/generated build output and are not design source.
- `vite-dev.*` / `vite-live.log` are development runtime logs, not application modules.
- package lockfiles record resolved dependency trees.

## Other observed files

- `TECHNICAL_ARCHITECTURE.md` existed before this audit; it was not overwritten.
- `periodic table/extract_prompt.cjs` and `.js` are helper scripts present in the subproject; no active root import/reference was verified.
- `xyz_*.json` files in the organic folder are present data artifacts; inspected active 3Dmol viewer code uses `chemistryContent.js` models instead.
