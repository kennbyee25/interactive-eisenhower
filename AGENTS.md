# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the React app source, with entry points in `src/index.js` and `src/App.js`.
- UI pieces live in `src/components/` and stateful wiring in `src/containers/`; each component typically has a sibling `.css` file (for example `src/components/Graph/Graph.js` and `src/components/Graph/Graph.css`).
- Domain logic lives in `src/models/` (Task, TaskList, and persistence helpers).
- Tests are colocated under `src/models/__tests__/`.
- Static assets and the HTML shell live in `public/`.

## Build, Test, and Development Commands
Use CRA scripts from `package.json`:
```sh
npm start       # Run the dev server at http://localhost:3000
npm test        # Run Jest in watch mode
npm run build   # Create a production build in /build
npm run eject   # One-way: copy build config into the repo
```

## Coding Style & Naming Conventions
- Indentation is 2 spaces; use semicolons and single quotes for strings as in existing files.
- React components and classes use PascalCase (for example `TaskList`), while functions and variables use camelCase (`handleAddTask`).
- Keep CSS in component-local `.css` files and import them from the component module.
- ESLint follows the CRA defaults (`react-app` and `react-app/jest`).

## Testing Guidelines
- Tests use Jest and React Testing Library (see `src/setupTests.js`).
- Name tests with the `*.test.js` pattern and keep them colocated, as in `src/models/__tests__/Task.test.js`.
- Prefer unit tests for models and lightweight integration tests for app flows.

## Commit & Pull Request Guidelines
- Recent history shows short, imperative commit subjects (for example `implement tasklist selection in toolbar`). Keep them concise and focused.
- PRs should include a brief description, testing notes (commands run), and screenshots or GIFs for UI changes. Link related issues if available.
