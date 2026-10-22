# Valorant Skins Catalog

Static React + Vite site. All data is `public/data/skins.json`; no backend, accounts, or secrets.

```bash
npm install
npm run dev      # local dev
npm run build    # outputs dist/
npm run preview  # serve dist/ locally
```

## Deploy (Vercel)

Import the repo; defaults work (build `npm run build`, output `dist`). `vercel.json` rewrites
deep links such as `/skin/:id` to `index.html`. The site is built for the domain root (`/`).

Skin images load from `vinfo-api.com` (third-party host referenced in the JSON).
