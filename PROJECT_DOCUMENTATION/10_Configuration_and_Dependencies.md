# Configuration and Dependencies

## Root `package.json`

Scripts:

- `npm run dev` → `vite`
- `npm run build` → `vite build`
- `npm run preview` → `vite preview`

This is the package file used for the combined application. Root dependencies are described in `02_Technology_Stack.md`; their exact resolved versions are recorded in root `package-lock.json` and may differ from caret ranges.

## Root `vite.config.js`

- Adds React and Tailwind Vite plugins.
- Adds custom `local-chemistry-chat-api` middleware for local `POST /api/chemistry-chat`.
- Calls `loadEnv(mode, process.cwd(), '')`, making non-`VITE_` environment variables available to the *server config/middleware*. This is necessary for a server-side Gemini key but should not be copied into browser client code.
- Deduplicates and aliases React, React DOM, router, Framer Motion, Three/R3F/Drei and Lucide to root `node_modules`. This matters because subproject source imports are compiled by the root app.
- Excludes 3Dmol from dependency pre-bundling because it is loaded as a global vendor file.
- Allows parent filesystem access for the imported sibling source folders.
- Splits production chunks into 3D, React and UI groups; sets a 1200 kB chunk warning threshold.

## Environment variables

The root chat core reads:

| Name | Required | Use |
|---|---|---|
| `GEMINI_API_KEY` | Yes for live root chat | Server-side Gemini REST authorization. |
| `GEMINI_MODEL` | Optional | First model attempted; core default is `gemini-2.5-flash-lite`. |

`.env.example` documents names. `.env.local` is a local secret file and is not included here. In Vercel, configure equivalent environment values in the deployment project settings.

## Vercel configuration

`vercel.json` rewrites all paths to `/index.html`, supporting client-side routing on refresh. The `/api/chemistry-chat.js` handler remains the serverless API convention. The rewrite file itself does not configure environment variables, custom headers, or API authentication.

## Organic standalone configuration

- `organic-chemistry-visualizer/vite.config.js`: React plugin, 3Dmol optimization exclusion, manual chunks and external setting for 3Dmol.
- `tailwind.config.js`, `postcss.config.js`: Tailwind/PostCSS setup for the standalone organic build.
- `server/package.json`: independent `node server.js` scripts and Express/Gemini dependencies.

Because the combined root build does not invoke the organic Vite build, these are not active for `npm run build` at repository root. Organic JSX class names still compile under root Tailwind setup because source is imported into root Vite compilation.

## Inorganic standalone configuration

- `periodic table/vite.config.ts`: React + Tailwind plugin.
- `tsconfig.json`: ES2022 target, bundler resolution, strict checking, React JSX transform, no emitted JS.
- `package.json`: `build` first runs `tsc`, then Vite.

The root build transpiles imported TSX through root Vite, but does not run this subproject’s standalone `tsc && vite build` script.

## Declared but not direct source implementation

| Dependency/artifact | Audit result |
|---|---|
| `gsap` in organic package | No source import found. |
| Root `motion-dom`, `motion-utils` | No direct source import found; potentially transitive support packages. |
| npm `3dmol` | Declared, but viewers use global `/public/vendor/3Dmol-min.js`. |
| Organic `ChatPage` and Express chat | Implemented but absent from active root organic route map. |
| SDF and `xyz_*.json` artifacts | Present; primary inspected viewer paths use inline/source XYZ models. |
