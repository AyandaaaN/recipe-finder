# Recipe Finder by Ingredients

Find meals using what you already have. Desktop-first React app using TheMealDB, with Favorites saved locally.

## Demo
- 🎥 Loom video: <>

## Why
Most people start with ingredients on hand, not a recipe. This app searches recipes by one or more comma-separated ingredients and lets you save favorites.

## Key Features
- 🔎 Search by ingredients (supports multi-ingredient intersection)
- 🗂️ Category chips for quick browsing
- 📄 Recipe details (ingredients + instructions + image, YouTube link if present)
- ⭐ Save to Favorites (LocalStorage – persists)
- 💻 Desktop-first responsive UI (fluid grid, skeleton loading)
- ⚠️ Friendly empty/error states

## Tech Stack
- React + Vite
- Axios for API calls
- TheMealDB (public API)
- LocalStorage for persistence
- Vanilla CSS

## Getting Started
```bash
npm install
npm run dev
# for production check:
npm run build && npm run preview
