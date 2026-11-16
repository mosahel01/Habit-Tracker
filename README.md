# Habit Tracker

A small, focused habit tracker for building better daily routines.

Habits are easier to keep when they're easy to see. This project keeps the
interface out of the way: a clean weekly view, simple navigation between
weeks, and just enough feedback to know how the day is going.

## Built with

- **React** — component-driven UI
- **TypeScript** — type-safe code from the ground up
- **Vite** — fast development and optimized builds
- **Tailwind CSS** — utility-first styling
- **Oxlint** — quick, reliable linting

## Getting started

You'll need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the project with Oxlint |

## Project structure

```
src/
├── components/   # Reusable UI pieces
├── App.tsx       # Application shell and layout
├── main.tsx      # Entry point
└── index.css     # Tailwind CSS entry and base styles
```

## Status

Early days — the weekly header and navigation are in place, with habit
creation and tracking on the way.
