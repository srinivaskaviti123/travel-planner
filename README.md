# ✈ Rimago – Multi-City Travel Planner

A beautiful travel planning app built with React + Vite. Plan multi-city trips, explore famous landmarks, and generate full day-by-day itineraries.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Navigate into the project folder
cd rimago-travel-planner

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder — ready to deploy to Vercel, Netlify, GitHub Pages, etc.

### Deploy to Vercel (free, 1 command)
```bash
npx vercel
```

### Deploy to Netlify (free)
```bash
npx netlify deploy --prod --dir=dist
```

---

## 🗂 Project Structure

```
rimago-travel-planner/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
├── public/
│   └── favicon.svg         # App icon
└── src/
    ├── main.jsx            # React DOM entry
    ├── App.jsx             # Root component
    ├── index.css           # Global styles
    └── TravelPlanner.jsx   # Main app component (all logic + UI)
```

---

## ✨ Features

- **Multi-City Trip Builder** — Select 2+ destinations and build one seamless journey
- **Auto Itinerary Generator** — Day-by-day plan stitched across all cities with transit days
- **120+ Famous Places** — Top-rated landmarks, museums, temples & experiences per city
- **8 Destinations** — Paris, Rome, Tokyo, Barcelona, Bali, New York, Dubai, Cape Town
- **Trip Settings** — Adjust nights per city, number of travelers, budget, start date
- **Explore View** — Browse destinations by region, view sample itineraries
- **Dark luxury aesthetic** — Playfair Display + Outfit fonts, gold accent palette

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Google Fonts** — Playfair Display + Outfit (loaded via CSS import)
- **Unsplash** — Destination photography (via URL, no API key needed)

No other dependencies required.

---

## 📝 Customization

All destination data, famous places, and itineraries live in the `DESTINATIONS` array at the top of `src/TravelPlanner.jsx`. You can:

- Add new destinations by adding an object to the array
- Add/edit famous places in the `places` array per destination
- Edit day-by-day plans in the `itinerary` array per destination

---

Made with ❤️ using Claude
