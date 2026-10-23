# Skinatlas — A Valorant Skins Catalog

A fan-made, static, client-side catalog of Valorant weapon skins. Browse, filter, and inspect every skin — including pricing, rarity, and radianite costs — without any backend, accounts, or secrets. Built with React and Vite, and deployable to any static host.

> **Fan project notice:** Skinatlas is an unofficial fan project. It is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc. This project is created under Riot Games' ["Legal Jibber Jabber"](https://www.riotgames.com/en/legal) policy. Riot Games does not endorse or sponsor this project.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)
- [Credits](#credits)
- [Disclaimer](#disclaimer)

## Features

- Browse the full Valorant skin catalog on a responsive, animated grid
- Filter skins by weapon, rarity, and price range
- Search skins by name
- Detailed per-skin pages with pricing, rarity, and radianite upgrade breakdowns
- Shareable, deep-linkable URLs for individual skins (`/skin/:id`)
- Pagination for large catalogs
- Copy-to-clipboard share links
- Dark, Valorant-themed UI with smooth animations (Framer Motion)
- Zero backend — all data served from a static JSON file

## Tech Stack

- **Framework:** React 18
- **Bundler:** Vite 8
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 3 + tailwindcss-animate
- **UI Primitives:** Radix UI
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Linting:** ESLint 9

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/fr0gtastic/skinatlas.git
cd skinatlas

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server (http://localhost:5173)
npm run dev

# Build for production into dist/
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

## Configuration

This project has no environment variables or secrets. All configuration is file-based.

| File | Purpose |
|------|---------|
| `public/data/skins.json` | The entire skin dataset (source of truth). Edit or replace this file to update the catalog. |
| `vite.config.js` | Vite build configuration (plugins, aliases). |
| `tailwind.config.js` | Tailwind theme, colors, and animation settings. |
| `postcss.config.js` | PostCSS pipeline (Tailwind + Autoprefixer). |
| `eslint.config.js` | ESLint rules. |
| `vercel.json` | SPA rewrite rules for deep links. |

### Data Format

Each entry in `public/data/skins.json` should include the fields consumed by the adapters in `src/lib/adapters/skinsAdapter.js`. Refer to that file for the canonical mapping. Skin images are loaded from the third-party host `vinfo-api.com` referenced within the JSON.

## Project Structure

```
skinatlas/
├── public/
│   ├── data/skins.json        # Skin dataset
│   └── favicon.svg
├── src/
│   ├── components/            # Reusable UI components
│   │   └── ui/                # Radix-based primitives
│   ├── lib/                   # Hooks, utilities, adapters
│   ├── pages/                 # Route-level pages (Catalog, SkinDetail)
│   ├── App.jsx                # Route definitions
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── vercel.json
```

## Deployment

The site is a static SPA and can be deployed to any static host.

### Vercel (recommended)

1. Import the repository into Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. The included `vercel.json` rewrites deep links (e.g. `/skin/:id`) to `index.html`.

### Other Hosts

Run `npm run build`, then serve the `dist/` directory. Ensure your host is configured to fall back to `index.html` for unknown routes so deep links work.

## License

[MIT](./LICENSE)

## Credits

- Skin data and imagery referenced from third-party sources including [Vinfo API](https://vinfo-api.com/).
- Built with [React](https://react.dev), [Vite](https://vitejs.dev), and [Tailwind CSS](https://tailwindcss.com).
- UI primitives powered by [Radix UI](https://www.radix-ui.com).

## Disclaimer

Skinatlas is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

This is an unofficial, fan-made project created under Riot Games' ["Legal Jibber Jabber"](https://www.riotgames.com/en/legal) policy. Riot Games does not endorse or sponsor this project.