# Habit Tracker

A small, focused habit tracker for building better daily routines.

Habits are easier to keep when they're easy to see. This project keeps the
interface out of the way: a clean weekly grid, simple navigation between
weeks, and just enough feedback to know how the day is going.

## Features

- Add and delete habits
- Mark any day of the week as done, with future days disabled
- Weekly view with previous and next week navigation
- Current streak per habit
- Today's progress in the header
- Habits persisted locally in the browser

## Built with

- **React** — component-driven UI
- **TypeScript** — type-safe code from the ground up
- **Vite** — fast development and optimized builds
- **Tailwind CSS** — utility-first styling
- **date-fns** — week and date formatting
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
├── components/
│   ├── Button.tsx
│   ├── HabitForm.tsx
│   ├── HabitList.tsx
│   └── Header.tsx
├── context/
│   ├── HabitProvider.tsx
│   └── useHabits.ts
├── hooks/
│   └── useLocalStorage.ts
├── App.tsx
├── index.css
└── main.tsx
```

State lives in `HabitProvider` and is exposed through the `useHabits` hook.
Everything is stored in `localStorage`, so no account or backend is required.

## License

[MIT](LICENSE)
