import { useState } from "react";
// cSpell:disableru ru
const DESTINATIONS = [
  {
    id: 1, name: "Paris", country: "France", emoji: "🗼", region: "Europe",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=700&q=80",
    nights: 3,
    places: [
      { name: "Eiffel Tower", type: "Landmark", icon: "🗼", rating: 4.8, time: "2–3 hrs", desc: "Iconic iron lattice tower with panoramic city views from its observation decks." },
      { name: "Louvre Museum", type: "Museum", icon: "🖼️", rating: 4.9, time: "3–5 hrs", desc: "World's largest art museum, home to the Mona Lisa and Venus de Milo." },
      { name: "Montmartre", type: "District", icon: "🎨", rating: 4.6, time: "2–3 hrs", desc: "Bohemian hilltop district with the Sacré-Cœur basilica and charming cafés." },
      { name: "Seine River Cruise", type: "Experience", icon: "🚢", rating: 4.7, time: "1–2 hrs", desc: "Float past Notre-Dame and the Musée d'Orsay on a romantic evening cruise." },
      { name: "Palace of Versailles", type: "Palace", icon: "👑", rating: 4.8, time: "4–6 hrs", desc: "Opulent royal château with the Hall of Mirrors and vast formal gardens." },
      { name: "Musée d'Orsay", type: "Museum", icon: "🎭", rating: 4.8, time: "2–3 hrs", desc: "Impressionist masterpieces by Monet, Renoir, and Van Gogh in a converted railway station." },
    ],
    itinerary: [
      { title: "Arrival & Iconic First Look", items: ["Check in near Le marais", "Evening walk along Seine", "Dinner at a classic brasserie", "Eiffel Tower lit up at night"] },
      { title: "Art & Culture Day", items: ["Louvre Museum opening hour visit", "Lunch at Café Marly", "Musée d'Orsay afternoon", "Wine tasting in Saint-Germain"] },
      { title: "Beyond the City", items: ["Morning at Palace of Versailles", "Montmartre afternoon stroll", "Farewell dinner in Pigalle"] },
    ]
  },
  {
    id: 2, name: "Goa", country: "India", emoji: "🌴", region: "Asia",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80",
    nights: 3,
    places: [
      { name: "Baga Beach", type: "Beach", icon: "🏖️", rating: 4.7, time: "2–4 hrs", desc: "Goa's most famous beach with shacks, water sports, and a buzzing nightlife scene." },
      { name: "Basilica of Bom Jesus", type: "Historic Site", icon: "⛪", rating: 4.8, time: "1–2 hrs", desc: "UNESCO World Heritage church housing the mortal remains of St. Francis Xavier." },
      { name: "Dudhsagar Falls", type: "Nature", icon: "💧", rating: 4.9, time: "Half day", desc: "One of India's tallest waterfalls — a stunning four-tiered cascade deep in the jungle." },
      { name: "Anjuna Flea Market", type: "Market", icon: "🛍️", rating: 4.6, time: "2–3 hrs", desc: "Iconic Wednesday market with handicrafts, spices, clothes and local street food." },
      { name: "Fort Aguada", type: "Landmark", icon: "🏰", rating: 4.7, time: "1–2 hrs", desc: "17th-century Portuguese fort with a lighthouse and panoramic views of the Arabian Sea." },
      { name: "Palolem Beach", type: "Beach", icon: "🌅", rating: 4.8, time: "Half day", desc: "Crescent-shaped paradise beach in South Goa — calm waters, beach huts and sunsets." },
    ],
    itinerary: [
      { title: "North Goa Beaches", items: ["Baga Beach morning swim", "Shack lunch with fresh seafood", "Anjuna Flea Market afternoon", "Sunset at Vagator Beach"] },
      { title: "Heritage & History", items: ["Basilica of Bom Jesus morning", "Old Goa churches walk", "Spice plantation tour", "Candlelight dinner in Panaji"] },
      { title: "South Goa & Nature", items: ["Dudhsagar Falls day trip", "Palolem Beach afternoon", "Farewell seafood BBQ dinner"] },
    ]
  },
  {
    id: 3, name: "Tokyo", country: "Japan", emoji: "⛩️", region: "Asia",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80",
    nights: 4,
    places: [
      { name: "Senso-ji Temple", type: "Temple", icon: "⛩️", rating: 4.8, time: "1–2 hrs", desc: "Tokyo's oldest temple in Asakusa, with a vibrant market street leading to it." },
      { name: "Shibuya Crossing", type: "Landmark", icon: "🚦", rating: 4.7, time: "30–60 min", desc: "World's busiest pedestrian crossing — best viewed from the Starbucks overhead." },
      { name: "Tsukiji Outer Market", type: "Food Market", icon: "🍣", rating: 4.8, time: "2–3 hrs", desc: "Fresh sushi breakfast and street food from Japan's most famous fish market area." },
      { name: "teamLab Borderless", type: "Experience", icon: "✨", rating: 4.9, time: "2–3 hrs", desc: "Immersive digital art museum — a surreal world of flowing light and color." },
      { name: "Meiji Shrine", type: "Shrine", icon: "🌿", rating: 4.7, time: "1–2 hrs", desc: "Forested Shinto shrine dedicated to Emperor Meiji, a peaceful city escape." },
      { name: "Akihabara", type: "District", icon: "🎮", rating: 4.6, time: "2–4 hrs", desc: "Electric Town — anime, manga, retro games, and electronics galore." },
    ],
    itinerary: [
      { title: "Traditional Tokyo", items: ["Senso-ji Temple at dawn", "Tsukiji Market breakfast", "Hamarikyu Gardens", "Ginza shopping afternoon"] },
      { title: "Modern & Pop Culture", items: ["teamLab Borderless morning", "Shibuya Crossing & Harajuku", "Meiji Shrine walk", "Akihabara night exploration"] },
      { title: "Day Trip: Nikko", items: ["Nikko's ornate shrines & temples", "Kegon Waterfall", "Return for ramen dinner in Shinjuku"] },
      { title: "Neighborhoods & Farewell", items: ["Yanaka historic district morning", "Ueno museums", "Last sushi dinner in Ginza"] },
    ]
  },
  {
    id: 4, name: "Ooty", country: "India", emoji: "🍃", region: "Asia",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80",
    nights: 3,
    places: [
      { name: "Ooty Lake", type: "Nature", icon: "🚣", rating: 4.6, time: "1–2 hrs", desc: "Scenic artificial lake perfect for boating, surrounded by eucalyptus trees and green hills." },
      { name: "Botanical Gardens", type: "Park", icon: "🌿", rating: 4.7, time: "2–3 hrs", desc: "Government Botanical Gardens with 650+ plant species, fossil trees and stunning flower beds." },
      { name: "Doddabetta Peak", type: "Nature", icon: "⛰️", rating: 4.8, time: "2–3 hrs", desc: "Highest peak in the Nilgiris at 2,637m — panoramic views of the entire hill station." },
      { name: "Nilgiri Mountain Railway", type: "Experience", icon: "🚂", rating: 4.9, time: "3–4 hrs", desc: "UNESCO World Heritage toy train winding through misty tea gardens and tunnels." },
      { name: "Tea Gardens", type: "Nature", icon: "🍵", rating: 4.7, time: "1–2 hrs", desc: "Rolling emerald tea estates with factory tours and fresh Nilgiri tea tasting." },
      { name: "Rose Garden", type: "Park", icon: "🌹", rating: 4.5, time: "1–2 hrs", desc: "Largest rose garden in India with over 20,000 varieties of roses in full bloom." },
    ],
    itinerary: [
      { title: "Arrival & Hills", items: ["Nilgiri Mountain Railway ride", "Ooty Lake boating", "Botanical Gardens evening stroll", "Dinner at a local Tamil restaurant"] },
      { title: "Peaks & Tea", items: ["Doddabetta Peak sunrise", "Tea garden factory tour & tasting", "Rose Garden afternoon", "Local market shopping"] },
      { title: "Nature & Farewell", items: ["Avalanche Lake morning trip", "Pykara Waterfalls visit", "Farewell meal with Nilgiri cuisine"] },
    ]
  },
  {
    id: 5, name: "Shimla", country: "India", emoji: "❄️", region: "Asia",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&q=80",
    nights: 4,
    places: [
      { name: "The Ridge", type: "Landmark", icon: "🏔️", rating: 4.7, time: "1–2 hrs", desc: "Open space in the heart of Shimla with stunning views of the snow-capped Himalayas." },
      { name: "Mall Road", type: "Street", icon: "🛍️", rating: 4.6, time: "2–3 hrs", desc: "Shimla's famous promenade lined with colonial-era shops, cafés and vibrant street life." },
      { name: "Jakhu Temple", type: "Temple", icon: "🐒", rating: 4.8, time: "2–3 hrs", desc: "Ancient Hanuman temple atop Jakhu Hill at 2,455m — panoramic Himalayan views." },
      { name: "Toy Train Kalka–Shimla", type: "Experience", icon: "🚂", rating: 4.9, time: "5–6 hrs", desc: "UNESCO Heritage railway through 102 tunnels and 864 bridges across stunning mountain passes." },
      { name: "Kufri", type: "Adventure", icon: "⛷️", rating: 4.7, time: "Half day", desc: "Hill station near Shimla famous for skiing in winter and scenic nature walks in summer." },
      { name: "Christ Church", type: "Historic Site", icon: "⛪", rating: 4.6, time: "30–60 min", desc: "Second oldest church in North India — stunning neo-Gothic architecture on the Ridge." },
    ],
    itinerary: [
      { title: "Arrive & Explore", items: ["Toy Train from Kalka to Shimla", "Mall Road evening stroll", "Christ Church visit", "Dinner at a Himachali dhaba"] },
      { title: "Temples & Views", items: ["Jakhu Temple sunrise hike", "The Ridge morning walk", "Local market shopping", "Snow point visit if in season"] },
      { title: "Kufri Day Trip", items: ["Kufri adventure activities", "Himalayan Nature Park", "Return for sunset from Ridge"] },
      { title: "Hidden Shimla & Farewell", items: ["Annandale grounds morning", "Viceregal Lodge visit", "Farewell Himachali Dham meal"] },
    ]
  },
  {
    id: 6, name: "New York", country: "USA", emoji: "🗽", region: "Americas",
    img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=700&q=80",
    nights: 4,
    places: [
      { name: "Central Park", type: "Park", icon: "🌳", rating: 4.8, time: "2–4 hrs", desc: "843-acre urban oasis with rowboats, the Bethesda Fountain, and Strawberry Fields." },
      { name: "Metropolitan Museum", type: "Museum", icon: "🏛️", rating: 4.9, time: "3–5 hrs", desc: "The Met — one of the world's greatest art museums spanning 5,000 years." },
      { name: "Brooklyn Bridge", type: "Landmark", icon: "🌉", rating: 4.8, time: "1 hr", desc: "Walk across this 1883 suspension bridge for skyline views of Lower Manhattan." },
      { name: "High Line", type: "Park", icon: "🌿", rating: 4.7, time: "1–2 hrs", desc: "Elevated park built on a former freight rail line through Chelsea and Hudson Yards." },
      { name: "Times Square", type: "Landmark", icon: "✨", rating: 4.4, time: "30–60 min", desc: "Neon-blazing crossroads of the world — dazzling at night, chaotic and unforgettable." },
      { name: "One World Observatory", type: "Viewpoint", icon: "🌆", rating: 4.8, time: "1–2 hrs", desc: "Top of One World Trade Center — 360° views from the tallest building in the Western Hemisphere." },
    ],
    itinerary: [
      { title: "Manhattan Classics", items: ["Central Park morning stroll", "Met Museum afternoon", "High Line walk at sunset", "Chelsea Market dinner"] },
      { title: "Downtown & History", items: ["Brooklyn Bridge walk", "DUMBO & Brooklyn Heights", "9/11 Memorial & Museum", "Financial District cocktails"] },
      { title: "Culture & Neighborhoods", items: ["MoMA morning visit", "Midtown food tour", "Greenwich Village evening", "Jazz at Village Vanguard"] },
      { title: "Views & Departure", items: ["One World Observatory morning", "Times Square last look", "JFK departure afternoon"] },
    ]
  },
  {
    id: 7, name: "Dubai", country: "UAE", emoji: "🏙️", region: "Middle East",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80",
    nights: 3,
    places: [
      { name: "Burj Khalifa", type: "Landmark", icon: "🏙️", rating: 4.8, time: "2–3 hrs", desc: "World's tallest building — At the Top observation deck on level 124 is unmissable." },
      { name: "Dubai Mall", type: "Shopping", icon: "🛍️", rating: 4.7, time: "3–5 hrs", desc: "World's largest mall with an indoor ice rink, aquarium, and 1,200+ shops." },
      { name: "Old Dubai (Deira)", type: "District", icon: "🕌", rating: 4.6, time: "2–3 hrs", desc: "Spice and gold souks along Dubai Creek — cross by abra water taxi for authenticity." },
      { name: "Desert Safari", type: "Adventure", icon: "🐪", rating: 4.9, time: "Half day", desc: "Dune bashing, camel rides, sandboarding and BBQ dinner under the stars." },
      { name: "Palm Jumeirah", type: "Landmark", icon: "🌴", rating: 4.7, time: "2–3 hrs", desc: "The world's largest man-made island — monorail ride to Atlantis hotel and beach." },
      { name: "Dubai Frame", type: "Architecture", icon: "🖼️", rating: 4.6, time: "1–2 hrs", desc: "Giant picture frame bridging old and new Dubai with a glass-floored sky bridge." },
    ],
    itinerary: [
      { title: "Modern Dubai", items: ["Burj Khalifa sunrise visit", "Dubai Fountain show", "Dubai Mall afternoon", "Rooftop dinner overlooking Downtown"] },
      { title: "Old & New", items: ["Old Dubai souk morning", "Abra crossing & Dubai Museum", "Dubai Frame afternoon", "JBR beach evening"] },
      { title: "Desert & Farewell", items: ["Palm Jumeirah morning visit", "Afternoon desert safari", "BBQ under the stars", "Late night departure"] },
    ]
  },
  {
    id: 8, name: "Thailand", country: "Thailand", emoji: "🐘", region: "Asia",
    img: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=700&q=80",
    nights: 4,
    places: [
      { name: "Grand Palace Bangkok", type: "Landmark", icon: "👑", rating: 4.9, time: "2–3 hrs", desc: "Dazzling royal complex with the sacred Emerald Buddha — the spiritual heart of Thailand." },
      { name: "Phi Phi Islands", type: "Beach", icon: "🏝️", rating: 4.9, time: "Full day", desc: "Stunning limestone islands with crystal-clear turquoise water and world-class snorkelling." },
      { name: "Chiang Mai Night Bazaar", type: "Market", icon: "🏮", rating: 4.7, time: "2–3 hrs", desc: "Vibrant night market with handicrafts, street food, and traditional Thai silk." },
      { name: "Doi Inthanon", type: "Nature", icon: "🌄", rating: 4.8, time: "Full day", desc: "Thailand's highest peak with misty waterfalls, royal pagodas and hill tribe villages." },
      { name: "Wat Pho", type: "Temple", icon: "🛕", rating: 4.8, time: "1–2 hrs", desc: "Temple of the Reclining Buddha — a 46m golden Buddha and the birthplace of Thai massage." },
      { name: "Floating Markets", type: "Experience", icon: "🚤", rating: 4.7, time: "2–3 hrs", desc: "Iconic canal markets where vendors sell fresh fruits, Thai food and crafts from wooden boats." },
    ],
    itinerary: [
      { title: "Bangkok Arrival", items: ["Grand Palace & Emerald Buddha", "Wat Pho reclining Buddha", "Chao Phraya river cruise", "Khao San Road night life"] },
      { title: "Floating Markets & Culture", items: ["Damnoen Saduak floating market", "Ayutthaya ancient ruins day trip", "Thai cooking class evening", "Street food tour"] },
      { title: "Chiang Mai", items: ["Fly to Chiang Mai", "Elephant sanctuary visit", "Night Bazaar shopping", "Khao Soi noodle dinner"] },
      { title: "Islands & Farewell", items: ["Phi Phi Islands boat trip", "Maya Bay snorkelling", "Sunset beach dinner", "Return to Bangkok for flight"] },
    ]
  },
];

const REGIONS = ["All", "Europe", "Asia", "Americas", "Middle East"];
const totalDays = (dests) => dests.reduce((s, d) => s + d.nights, 0) + 1;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0C0A08; }
  ::-webkit-scrollbar-thumb { background: #3A3020; border-radius: 3px; }
  .app { font-family: 'Outfit', sans-serif; background: #0C0A08; color: #F0EAD6; min-height: 100vh; overflow-x: hidden; }
  .btn { cursor: pointer; border: none; font-family: 'Outfit', sans-serif; transition: all 0.25s; }
  .lift:hover { transform: translateY(-3px); }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  .f1 { animation: fadeUp 0.7s 0.05s both; }
  .f2 { animation: fadeUp 0.7s 0.2s both; }
  .f3 { animation: fadeUp 0.7s 0.38s both; }
  .f4 { animation: fadeUp 0.7s 0.55s both; }
  .dest-card { transition: all 0.35s cubic-bezier(.25,.8,.25,1); cursor: pointer; }
  .dest-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.5) !important; }
  .sel-card { outline: 2.5px solid #E8B86D; outline-offset: -2px; }
  .place-chip { transition: all 0.2s; cursor: pointer; }
  .place-chip:hover { border-color: #E8B86D !important; background: rgba(232,184,109,0.07) !important; }
  .tab-pill { transition: all 0.25s; cursor: pointer; }
  .tab-pill:hover { opacity: 0.75; }
  .night-btn { transition: all 0.15s; cursor: pointer; border: none; }
  .night-btn:hover { background: #E8B86D !important; color: #0C0A08 !important; }
  input[type=range] { -webkit-appearance: none; height: 3px; background: #2A2218; border-radius: 2px; outline: none; cursor: pointer; width: 100%; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #E8B86D; cursor: pointer; }
  .day-row:hover { background: rgba(232,184,109,0.03) !important; }
  .nav-link { transition: color 0.2s; cursor: pointer; border: none; background: none; font-family: 'Outfit', sans-serif; }
  .nav-link:hover { color: #E8B86D !important; }

  /* ── MOBILE BOTTOM NAV ── */
  .mobile-nav { display: none; }
  @media (max-width: 768px) {
    .desktop-nav-tabs { display: none !important; }
    .mobile-nav { display: flex !important; position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;
      background: rgba(10,8,6,0.97); border-top: 1px solid #2A2218;
      padding: 8px 0 env(safe-area-inset-bottom, 12px); justify-content: space-around; }
    .mnav-btn { display: flex; flex-direction: column; align-items: center; gap: 3px;
      font-family: 'Outfit', sans-serif; font-size: 10px; letter-spacing: 0.3px;
      color: #3A3020; cursor: pointer; border: none; background: none; padding: 4px 10px; }
    .mnav-btn.active { color: #E8B86D; }
    .mnav-icon { font-size: 19px; line-height: 1; }
    .app { padding-bottom: 72px; }
    .nav-logo-text { font-size: 17px !important; }
    .nav-badge { display: none !important; }
  }

  /* ── BUILD GRID ── */
  .build-grid { display: grid; grid-template-columns: 1fr 370px; min-height: calc(100vh - 62px); }
  @media (max-width: 900px) {
    .build-grid { grid-template-columns: 1fr !important; }
    .build-right-panel { position: static !important; height: auto !important; border-left: none !important; border-top: 1px solid #1A1612 !important; max-height: none !important; }
  }

  /* ── HERO ── */
  .hero-float { display: block; }
  .hero-stats { display: flex; justify-content: center; gap: 52px; }
  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 600px) {
    .hero-float { display: none !important; }
    .hero-stats { gap: 24px !important; }
    .hero-btns { flex-direction: column; align-items: center; width: 100%; }
    .hero-btns button { width: 90% !important; }
    .hero-section { padding: 60px 20px 80px !important; min-height: 80vh !important; }
  }

  /* ── GRIDS ── */
  .dest-grid-home { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 18px; }
  .explore-grid   { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px; }
  .places-grid    { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 13px; }
  .build-dest-grid{ display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 16px; }
  .itin-items     { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr)); gap: 7px; }
  .day-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .trip-stats     { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  @media (max-width: 600px) {
    .dest-grid-home  { grid-template-columns: 1fr 1fr; gap: 10px; }
    .explore-grid    { grid-template-columns: 1fr; gap: 14px; }
    .places-grid     { grid-template-columns: 1fr 1fr; gap: 10px; }
    .build-dest-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
    .itin-items      { grid-template-columns: 1fr; gap: 5px; }
    .day-summary-grid{ grid-template-columns: 1fr; gap: 5px; }
  }

  /* ── REGION FILTER SCROLL ── */
  .region-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  @media (max-width: 600px) {
    .region-filters { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .region-filters::-webkit-scrollbar { display: none; }
  }

  /* ── PAGE PADDING ── */
  .page-pad  { padding: 48px 32px 100px; }
  .home-strip{ padding: 56px 32px 80px; }
  @media (max-width: 600px) {
    .page-pad   { padding: 28px 16px 80px !important; }
    .home-strip { padding: 32px 16px 60px !important; }
    .build-left-pad { padding: 24px 16px 80px !important; }
    .build-right-pad { padding: 24px 16px 32px !important; }
  }

  /* ── DETAIL HERO ── */
  .detail-hero { height: 380px; }
  @media (max-width: 600px) {
    .detail-hero { height: 220px !important; border-radius: 14px !important; }
    .detail-hero-title { font-size: 32px !important; }
    .detail-hero-btns { flex-direction: column !important; }
    .detail-hero-btns button { width: 100% !important; }
  }

  /* ── ITINERARY ── */
  .itin-title { font-size: 52px; }
  .itin-timeline { display: flex; gap: 24px; }
  @media (max-width: 600px) {
    .itin-title { font-size: 30px !important; }
    .itin-timeline { gap: 10px !important; }
    .timeline-dots { display: none !important; }
    .famous-title  { font-size: 26px !important; }
    .dest-section-title { font-size: 20px !important; }
  }

  /* ── NAV HEADER ── */
  @media (max-width: 600px) {
    .nav-header { padding: 0 16px !important; height: 54px !important; }
  }
`;

export default function TravelPlanner() {
  const [view, setView] = useState("home");
  const [selectedDests, setSelectedDests] = useState([]);
  const [filterRegion, setFilterRegion] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [startDate, setStartDate] = useState("");
  const [expandedPlace, setExpandedPlace] = useState(null);
  const [activeDestDetail, setActiveDestDetail] = useState(null);
  const [tripName, setTripName] = useState("My Dream Trip");

  const filtered = DESTINATIONS.filter(d =>
    (filterRegion === "All" || d.region === filterRegion) &&
    (d.name.toLowerCase().includes(searchQ.toLowerCase()) || d.country.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const toggleDest = (dest) => {
    setSelectedDests(prev =>
      prev.find(d => d.id === dest.id)
        ? prev.filter(d => d.id !== dest.id)
        : [...prev, { ...dest }]
    );
  };

  const moveDest = (idx, dir) => {
    const arr = [...selectedDests];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setSelectedDests(arr);
  };

  const updateNights = (id, val) => {
    setSelectedDests(prev => prev.map(d => d.id === id ? { ...d, nights: Math.max(1, Math.min(14, d.nights + val)) } : d));
  };

  const buildItinerary = () => {
    let dayCount = 1;
    const result = [];
    selectedDests.forEach((dest, di) => {
      dest.itinerary.forEach((day, i) => {
        if (i < dest.nights) {
          result.push({ dayNum: dayCount++, dest: dest.name, emoji: dest.emoji, ...day, isTransit: false });
        }
      });
      if (di < selectedDests.length - 1) {
        result.push({
          dayNum: dayCount++, dest: dest.name, emoji: "✈️",
          title: `Travel to ${selectedDests[di + 1].name}`,
          items: [`Check out from ${dest.name}`, `Flight / train to ${selectedDests[di + 1].name}`, `Arrive & settle at ${selectedDests[di + 1].name}`],
          isTransit: true
        });
      }
    });
    return result;
  };

  const itineraryDays = selectedDests.length > 0 ? buildItinerary() : [];

  const Nav = () => (
    <>
      <nav className="nav-header" style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(12,10,8,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1E1A12", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 62 }}>
        <div onClick={() => setView("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{ fontSize: 20 }}>✈</span>
          <span className="nav-logo-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#F0EAD6" }}>Travel Planner</span>
        </div>
        <div className="desktop-nav-tabs" style={{ display: "flex", gap: 4 }}>
          {[["home","Discover"],["build",`Plan Trip${selectedDests.length ? ` (${selectedDests.length})` : ""}`],["itinerary","My Itinerary"],["explore","Explore"]].map(([v, label]) => (
            <button key={v} className="tab-pill btn" onClick={() => setView(v)} style={{ padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: view === v ? "#E8B86D" : "transparent", color: view === v ? "#0C0A08" : "#6A5E44", border: view === v ? "none" : "1px solid transparent" }}>{label}</button>
          ))}
        </div>
        <div className="nav-badge" style={{ fontSize: 13, color: "#3A3020" }}>
          {selectedDests.length > 0 && <span style={{ background: "#E8B86D", color: "#0C0A08", borderRadius: 10, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{totalDays(selectedDests)} days</span>}
        </div>
      </nav>
      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav">
        {[["home","🏠","Discover"],["build","🗺️","Plan"],["itinerary","📋","Itinerary"],["explore","🔍","Explore"]].map(([v, icon, label]) => (
          <button key={v} className={`mnav-btn ${view === v ? "active" : ""}`} onClick={() => setView(v)}>
            <span className="mnav-icon">{icon}</span>
            <span>{label}</span>
            {v === "build" && selectedDests.length > 0 && <span style={{ background: "#E8B86D", color: "#0C0A08", borderRadius: 8, padding: "0px 5px", fontSize: 9, fontWeight: 700, marginTop: 1 }}>{selectedDests.length}</span>}
          </button>
        ))}
      </div>
    </>
  );

  if (view === "home") return (
    <div className="app">
      <style>{CSS}</style>
      <Nav />
      <div className="hero-section" style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "80px 40px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1C1408 0%, #0C0A08 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(232,184,109,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        {[
          [DESTINATIONS[0], { top:"18%", left:"6%", width:"200px", height:"270px", transform:"rotate(-8deg)", opacity:"0.32" }],
          [DESTINATIONS[2], { top:"14%", right:"6%", width:"170px", height:"230px", transform:"rotate(7deg)", opacity:"0.32" }],
          [DESTINATIONS[4], { bottom:"14%", left:"10%", width:"150px", height:"200px", transform:"rotate(5deg)", opacity:"0.22" }],
          [DESTINATIONS[5], { bottom:"16%", right:"9%", width:"155px", height:"205px", transform:"rotate(-6deg)", opacity:"0.22" }]
        ].map(([dest, st]) => (
          <div key={dest.id} className="hero-float" style={{ position: "absolute", borderRadius: 18, overflow: "hidden", ...st }}>
            <img src={dest.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 740, width: "100%" }}>
          <p className="f1" style={{ fontSize: 11, letterSpacing: 5, color: "#E8B86D", textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>Multi-City Travel Planner</p>
          <h1 className="f2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px,9vw,94px)", fontWeight: 400, lineHeight: 1.0, color: "#F0EAD6", marginBottom: 24, letterSpacing: -2 }}>
            Plan your<br /><em style={{ color: "#E8B86D" }}>world</em> in one trip
          </h1>
          <p className="f3" style={{ fontSize: "clamp(14px,2vw,17px)", color: "#5A4E38", lineHeight: 1.8, marginBottom: 44, maxWidth: 500, margin: "0 auto 44px" }}>
            Combine multiple destinations into one seamless journey. Curated famous places, day-by-day itineraries, and smart planning — all together.
          </p>
          <div className="f4 hero-btns">
            <button className="btn lift" onClick={() => setView("build")} style={{ padding: "16px 40px", borderRadius: 50, background: "#E8B86D", color: "#0C0A08", fontSize: 15, fontWeight: 600, boxShadow: "0 8px 32px rgba(232,184,109,0.3)" }}>Start Building Your Trip →</button>
            <button className="btn lift" onClick={() => setView("explore")} style={{ padding: "16px 32px", borderRadius: 50, background: "transparent", border: "1px solid #2A2218", color: "#6A5E44", fontSize: 15, fontWeight: 500 }}>Explore Destinations</button>
          </div>
        </div>
        <div className="hero-stats" style={{ position: "absolute", bottom: 36, left: 0, right: 0 }}>
          {[["8","Destinations"],["120+","Famous Places"],["∞","Combinations"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#E8B86D" }}>{n}</div>
              <div style={{ fontSize: 10, color: "#3A3020", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-strip" style={{ borderTop: "1px solid #1A1612" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 400, textAlign: "center", marginBottom: 8 }}>Popular Destinations</h2>
        <p style={{ textAlign: "center", color: "#3A3020", marginBottom: 40, fontSize: 14 }}>Tap any city to explore its famous places</p>
        <div className="dest-grid-home">
          {DESTINATIONS.map(dest => (
            <div key={dest.id} className="dest-card" onClick={() => { setActiveDestDetail(dest); setView("explore"); }} style={{ borderRadius: 18, overflow: "hidden", background: "#0E0C08", border: "1px solid #1A1610" }}>
              <div style={{ position: "relative", height: 175 }}>
                <img src={dest.img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,8,0.85) 0%, transparent 55%)" }} />
                <span style={{ position: "absolute", top: 12, right: 12, fontSize: 22 }}>{dest.emoji}</span>
                <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px,3vw,21px)", color: "#F0EAD6" }}>{dest.name}</div>
                  <div style={{ fontSize: 11, color: "#6A5E44" }}>{dest.country} · {dest.places.length} places</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (view === "build") return (
    <div className="app">
      <style>{CSS}</style>
      <Nav />
      <div className="build-grid">
        <div className="build-left-pad" style={{ padding: "40px 40px 80px", borderRight: "1px solid #1A1612", overflowY: "auto" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,5vw,40px)", fontWeight: 400, marginBottom: 6 }}>Choose Destinations</h1>
          <p style={{ color: "#3A3020", marginBottom: 24, fontSize: 14 }}>Select 2+ cities — itinerary stitched automatically</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 180px", display: "flex", alignItems: "center", gap: 8, background: "#131008", border: "1px solid #2A2218", borderRadius: 10, padding: "10px 14px" }}>
              <span style={{ color: "#3A3020", fontSize: 14 }}>🔍</span>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search cities..." style={{ flex: 1, border: "none", background: "transparent", color: "#F0EAD6", fontFamily: "'Outfit', sans-serif", fontSize: 13, outline: "none" }} />
            </div>
            <div className="region-filters">
              {REGIONS.map(r => (
                <button key={r} className="btn" onClick={() => setFilterRegion(r)} style={{ padding: "8px 14px", borderRadius: 8, fontSize: 12, background: filterRegion === r ? "#E8B86D" : "#131008", color: filterRegion === r ? "#0C0A08" : "#4A3E28", border: filterRegion === r ? "none" : "1px solid #2A2218", whiteSpace: "nowrap" }}>{r}</button>
              ))}
            </div>
          </div>
          <div className="build-dest-grid">
            {filtered.map(dest => {
              const sel = !!selectedDests.find(d => d.id === dest.id);
              return (
                <div key={dest.id} className={`dest-card ${sel ? "sel-card" : ""}`} onClick={() => toggleDest(dest)} style={{ borderRadius: 18, overflow: "hidden", background: "#0E0C08", border: `1px solid ${sel ? "#E8B86D" : "#1A1610"}`, position: "relative" }}>
                  {sel && <div style={{ position: "absolute", top: 10, left: 10, zIndex: 3, background: "#E8B86D", color: "#0C0A08", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>✓</div>}
                  <div style={{ position: "relative", height: 140 }}>
                    <img src={dest.img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: sel ? "brightness(0.82)" : "none", transition: "filter 0.3s" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,8,0.8) 0%, transparent 50%)" }} />
                    <span style={{ position: "absolute", top: 8, right: 10, fontSize: 18 }}>{dest.emoji}</span>
                    <div style={{ position: "absolute", bottom: 8, left: 10 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#F0EAD6" }}>{dest.name}</div>
                      <div style={{ fontSize: 10, color: "#6A5E44" }}>{dest.country}</div>
                    </div>
                  </div>
                  <div style={{ padding: "8px 12px", display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 9, color: "#4A3E28" }}>{dest.region}</span>
                    <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 9, color: "#4A3E28" }}>📍{dest.places.length}</span>
                    <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 9, color: "#4A3E28" }}>🌙{dest.nights}n</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="build-right-panel build-right-pad" style={{ padding: "36px 26px", background: "#0A0806", overflowY: "auto", position: "sticky", top: 62, height: "calc(100vh - 62px)", borderLeft: "1px solid #1A1612" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 23, marginBottom: 6 }}>Your Trip</h2>
          <input value={tripName} onChange={e => setTripName(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2A2218", color: "#6A5E44", fontFamily: "'Outfit', sans-serif", fontSize: 13, padding: "6px 0", marginBottom: 24, outline: "none" }} placeholder="Name your trip..." />
          {selectedDests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "52px 0" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>🗺️</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3020" }}>Select 2+ destinations to build your multi-city journey</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                {selectedDests.map((dest, idx) => (
                  <div key={dest.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0" }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #2A2218" }}>
                        <img src={dest.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#F0EAD6", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dest.emoji} {dest.name}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                          <button className="night-btn btn" onClick={() => updateNights(dest.id, -1)} style={{ width: 20, height: 20, borderRadius: 4, background: "#1E1A12", color: "#6A5E44", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                          <span style={{ fontSize: 11, color: "#5A4E38", minWidth: 50, textAlign: "center" }}>{dest.nights} nights</span>
                          <button className="night-btn btn" onClick={() => updateNights(dest.id, 1)} style={{ width: 20, height: 20, borderRadius: 4, background: "#1E1A12", color: "#6A5E44", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 3 }}>
                        <button className="night-btn btn" onClick={() => moveDest(idx, -1)} disabled={idx === 0} style={{ width: 24, height: 24, borderRadius: 5, background: "#1A1610", color: idx === 0 ? "#2A2218" : "#6A5E44", fontSize: 11 }}>↑</button>
                        <button className="night-btn btn" onClick={() => moveDest(idx, 1)} disabled={idx === selectedDests.length - 1} style={{ width: 24, height: 24, borderRadius: 5, background: "#1A1610", color: idx === selectedDests.length - 1 ? "#2A2218" : "#6A5E44", fontSize: 11 }}>↓</button>
                        <button className="night-btn btn" onClick={() => toggleDest(dest)} style={{ width: 24, height: 24, borderRadius: 5, background: "#1A1610", color: "#6A3A2A", fontSize: 12 }}>✕</button>
                      </div>
                    </div>
                    {idx < selectedDests.length - 1 && <div style={{ marginLeft: 17, paddingLeft: 29, borderLeft: "1px dashed #2A2218", padding: "2px 0 2px 28px", fontSize: 11, color: "#2A2218" }}>✈ transit day</div>}
                  </div>
                ))}
              </div>
              <div style={{ background: "#131008", borderRadius: 10, padding: "12px 14px", marginBottom: 20, fontSize: 13 }}>
                <div style={{ fontSize: 10, color: "#3A3020", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Route</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                  {selectedDests.map((d, i) => (
                    <span key={d.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#C8A85C", fontWeight: 500, fontSize: 13 }}>{d.name}</span>
                      {i < selectedDests.length - 1 && <span style={{ color: "#2A2218" }}>→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 22 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: "#4A3E28", letterSpacing: 1, textTransform: "uppercase" }}>Travelers</span>
                    <span style={{ fontSize: 13, color: "#E8B86D", fontWeight: 500 }}>{travelers}</span>
                  </div>
                  <input type="range" min={1} max={12} value={travelers} onChange={e => setTravelers(+e.target.value)} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: "#4A3E28", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 7 }}>Start Date</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: "100%", background: "#131008", border: "1px solid #2A2218", borderRadius: 8, padding: "9px 12px", color: "#F0EAD6", fontFamily: "'Outfit', sans-serif", fontSize: 13, outline: "none" }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: "#4A3E28", letterSpacing: 1, textTransform: "uppercase" }}>Budget / person</span>
                    <span style={{ fontSize: 13, color: "#E8B86D", fontWeight: 500 }}>${budget.toLocaleString()}</span>
                  </div>
                  <input type="range" min={500} max={20000} step={250} value={budget} onChange={e => setBudget(+e.target.value)} />
                </div>
              </div>
              <div className="trip-stats" style={{ marginBottom: 20 }}>
                {[["Cities", selectedDests.length],["Total Days", totalDays(selectedDests)],["Travelers", travelers],["Est. Total", `$${(budget * travelers).toLocaleString()}`]].map(([k, v]) => (
                  <div key={k} style={{ background: "#131008", borderRadius: 10, padding: "12px 13px", border: "1px solid #1A1610" }}>
                    <div style={{ fontSize: 10, color: "#3A3020", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: "#E8B86D" }}>{v}</div>
                  </div>
                ))}
              </div>
              <button className="btn lift" onClick={() => setView("itinerary")} style={{ width: "100%", padding: "15px", borderRadius: 12, background: "linear-gradient(135deg,#E8B86D,#C8883D)", color: "#0C0A08", fontSize: 15, fontWeight: 600, boxShadow: "0 8px 24px rgba(232,184,109,0.2)" }}>Generate Full Itinerary →</button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (view === "itinerary") return (
    <div className="app">
      <style>{CSS}</style>
      <Nav />
      {selectedDests.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "72vh", gap: 20, padding: "0 20px", textAlign: "center" }}>
          <div style={{ fontSize: 52 }}>🗺️</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,32px)", fontWeight: 400 }}>No trip planned yet</h2>
          <button className="btn lift" onClick={() => setView("build")} style={{ padding: "14px 34px", borderRadius: 50, background: "#E8B86D", color: "#0C0A08", fontSize: 15, fontWeight: 600 }}>Plan a Trip →</button>
        </div>
      ) : (
        <div className="page-pad" style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: "#E8B86D", textTransform: "uppercase", marginBottom: 12 }}>Your Custom Journey</p>
            <h1 className="itin-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>{tripName}</h1>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
              {selectedDests.map((d, i) => (
                <span key={d.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ background: "#131008", border: "1px solid #2A2218", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#C8A85C" }}>{d.emoji} {d.name}</span>
                  {i < selectedDests.length - 1 && <span style={{ color: "#2A2218", fontSize: 12 }}>✈</span>}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["🗓️", `${totalDays(selectedDests)} days`], ["🌍", `${selectedDests.length} cities`], ["👥", `${travelers} traveler${travelers > 1 ? "s" : ""}`], ["💰", `$${(budget * travelers).toLocaleString()}`], ...(startDate ? [["📅", new Date(startDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]] : [])].map(([icon, label]) => (
                <span key={label} style={{ background: "#131008", border: "1px solid #1A1610", borderRadius: 20, padding: "5px 12px", fontSize: 11, color: "#5A4E38" }}>{icon} {label}</span>
              ))}
            </div>
          </div>
          <div className="itin-timeline" style={{ marginBottom: 60 }}>
            <div className="timeline-dots" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
              {itineraryDays.map((day, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: day.isTransit ? "#141210" : "#1C1610", border: `2px solid ${day.isTransit ? "#2A2218" : "#E8B86D"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: day.isTransit ? "#3A3020" : "#E8B86D", flexShrink: 0 }}>{day.dayNum}</div>
                  {i < itineraryDays.length - 1 && <div style={{ width: 1, height: 74, background: "linear-gradient(to bottom, #2A2218, #181410)" }} />}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 11 }}>
              {itineraryDays.map((day, i) => (
                <div key={i} className="day-row" style={{ background: day.isTransit ? "#0C0A08" : "#111008", border: `1px solid ${day.isTransit ? "#181410" : "#1E1A12"}`, borderRadius: 15, padding: "16px 18px", opacity: day.isTransit ? 0.65 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ background: "#1A1610", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#5A4E38" }}>{day.emoji} {day.dest}</span>
                        {day.isTransit && <span style={{ background: "#161410", borderRadius: 6, padding: "2px 8px", fontSize: 10, color: "#3A3020", letterSpacing: 1 }}>TRANSIT</span>}
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(15px,3vw,19px)", fontWeight: 400, color: "#F0EAD6" }}>{day.title}</h3>
                    </div>
                    <span style={{ fontSize: 10, color: "#2A2218", whiteSpace: "nowrap", paddingLeft: 8 }}>Day {day.dayNum}</span>
                  </div>
                  <div className="itin-items">
                    {day.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#5A4E38" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: day.isTransit ? "#2A2218" : "#E8B86D", flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="famous-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, marginBottom: 8 }}>Famous Places to Explore</h2>
            <p style={{ color: "#3A3020", marginBottom: 36, fontSize: 14 }}>Top-rated landmarks & experiences — tap any for details</p>
            {selectedDests.map(dest => (
              <div key={dest.id} style={{ marginBottom: 44 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #1A1610", flexWrap: "wrap" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", border: "2px solid #2A2218", flexShrink: 0 }}>
                    <img src={dest.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <h3 className="dest-section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400 }}>{dest.emoji} {dest.name}</h3>
                    <span style={{ fontSize: 11, color: "#3A3020" }}>{dest.country} · {dest.nights} nights · {dest.places.length} places</span>
                  </div>
                </div>
                <div className="places-grid">
                  {dest.places.map((place, pi) => {
                    const key = `${dest.id}-${pi}`;
                    const isOpen = expandedPlace === key;
                    return (
                      <div key={pi} className="place-chip" onClick={() => setExpandedPlace(isOpen ? null : key)}
                        style={{ background: "#0C0A08", border: `1px solid ${isOpen ? "#E8B86D" : "#1A1610"}`, borderRadius: 14, padding: "14px 14px 12px", transition: "all 0.25s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <span style={{ fontSize: 24 }}>{place.icon}</span>
                          <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 11, color: "#E8B86D", fontWeight: 500 }}>★ {place.rating}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#F0EAD6", marginBottom: 6 }}>{place.name}</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          <span style={{ background: "#131008", padding: "2px 7px", borderRadius: 6, fontSize: 10, color: "#4A3E28" }}>{place.type}</span>
                          <span style={{ background: "#131008", padding: "2px 7px", borderRadius: 6, fontSize: 10, color: "#4A3E28" }}>⏱ {place.time}</span>
                        </div>
                        {isOpen && <p style={{ fontSize: 12, color: "#4A4030", lineHeight: 1.65, borderTop: "1px solid #1A1610", paddingTop: 10, marginTop: 10 }}>{place.desc}</p>}
                        <div style={{ fontSize: 10, color: "#2A2218", textAlign: "right", marginTop: 8 }}>{isOpen ? "▲ less" : "▼ details"}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn lift" onClick={() => setView("build")} style={{ flex: 1, minWidth: 140, padding: "14px", borderRadius: 12, background: "#131008", border: "1px solid #2A2218", color: "#6A5E44", fontSize: 14 }}>← Edit Trip</button>
            <button className="btn lift" onClick={() => setView("explore")} style={{ flex: 1, minWidth: 140, padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#E8B86D,#C8883D)", color: "#0C0A08", fontSize: 14, fontWeight: 600 }}>Explore More</button>
          </div>
        </div>
      )}
    </div>
  );

  if (view === "explore") return (
    <div className="app">
      <style>{CSS}</style>
      <Nav />
      {activeDestDetail ? (
        <div className="page-pad" style={{ maxWidth: 920, margin: "0 auto" }}>
          <button className="btn nav-link" onClick={() => setActiveDestDetail(null)} style={{ color: "#4A3E28", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>← All Destinations</button>
          <div className="detail-hero" style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 28 }}>
            <img src={activeDestDetail.img} alt={activeDestDetail.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,8,0.88) 0%, transparent 55%)" }} />
            <span style={{ position: "absolute", top: 18, right: 20, fontSize: 36 }}>{activeDestDetail.emoji}</span>
            <div style={{ position: "absolute", bottom: 24, left: 28 }}>
              <p style={{ fontSize: 10, letterSpacing: 4, color: "#E8B86D", textTransform: "uppercase", marginBottom: 8 }}>{activeDestDetail.country} · {activeDestDetail.region}</p>
              <h1 className="detail-hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,6vw,56px)", fontWeight: 400, color: "#F0EAD6", marginBottom: 6 }}>{activeDestDetail.name}</h1>
              <p style={{ fontSize: 12, color: "#6A5E44" }}>{activeDestDetail.places.length} famous places · Recommended {activeDestDetail.nights} nights</p>
            </div>
          </div>
          <div className="detail-hero-btns" style={{ display: "flex", gap: 12, marginBottom: 40 }}>
            <button className="btn lift" onClick={() => { toggleDest(activeDestDetail); setView("build"); }} style={{ flex: 1, padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 15, background: selectedDests.find(d => d.id === activeDestDetail.id) ? "#1E1810" : "linear-gradient(135deg,#E8B86D,#C8883D)", color: selectedDests.find(d => d.id === activeDestDetail.id) ? "#5A4E38" : "#0C0A08", border: selectedDests.find(d => d.id === activeDestDetail.id) ? "1px solid #2A2218" : "none" }}>
              {selectedDests.find(d => d.id === activeDestDetail.id) ? "✓ Added to Trip" : "+ Add to My Trip"}
            </button>
            <button className="btn lift" onClick={() => setView("build")} style={{ flex: 1, padding: "14px", borderRadius: 12, fontWeight: 500, fontSize: 15, background: "#131008", border: "1px solid #2A2218", color: "#6A5E44" }}>Trip Builder →</button>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,34px)", fontWeight: 400, marginBottom: 8 }}>Famous Places</h2>
          <p style={{ color: "#3A3020", marginBottom: 24, fontSize: 14 }}>Top-rated attractions, landmarks & experiences</p>
          <div className="places-grid" style={{ marginBottom: 48 }}>
            {activeDestDetail.places.map((place, pi) => (
              <div key={pi} className="dest-card" style={{ background: "#0C0A08", border: "1px solid #1A1610", borderRadius: 16, padding: "18px 16px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{place.icon}</span>
                  <span style={{ background: "#131008", padding: "3px 10px", borderRadius: 10, fontSize: 11, color: "#E8B86D", height: "fit-content" }}>★ {place.rating}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#F0EAD6", marginBottom: 6 }}>{place.name}</div>
                <p style={{ fontSize: 12, color: "#3A3020", lineHeight: 1.65, marginBottom: 10 }}>{place.desc}</p>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 6, fontSize: 10, color: "#4A3E28" }}>{place.type}</span>
                  <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 6, fontSize: 10, color: "#4A3E28" }}>⏱ {place.time}</span>
                </div>
              </div>
            ))}
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,34px)", fontWeight: 400, marginBottom: 8 }}>Sample Itinerary</h2>
          <p style={{ color: "#3A3020", marginBottom: 24, fontSize: 14 }}>A curated {activeDestDetail.nights}-night plan</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activeDestDetail.itinerary.map((day, i) => (
              <div key={i} style={{ background: "#0E0C08", border: "1px solid #1A1610", borderRadius: 15, padding: "16px 18px", display: "flex", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1C1610", border: "1px solid #E8B86D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#E8B86D", fontWeight: 600, flexShrink: 0 }}>D{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(15px,3vw,18px)", marginBottom: 10, color: "#F0EAD6" }}>{day.title}</div>
                  <div className="day-summary-grid">
                    {day.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#4A4030" }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#E8B86D", flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="page-pad" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: "#E8B86D", textTransform: "uppercase", marginBottom: 12 }}>Curated Collection</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,6vw,50px)", fontWeight: 400, marginBottom: 20 }}>Explore Destinations</h1>
            <div className="region-filters">
              {REGIONS.map(r => (
                <button key={r} className="btn" onClick={() => setFilterRegion(r)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, background: filterRegion === r ? "#E8B86D" : "#131008", color: filterRegion === r ? "#0C0A08" : "#4A3E28", border: filterRegion === r ? "none" : "1px solid #2A2218", whiteSpace: "nowrap" }}>{r}</button>
              ))}
            </div>
          </div>
          <div className="explore-grid">
            {filtered.map(dest => (
              <div key={dest.id} className="dest-card" onClick={() => setActiveDestDetail(dest)} style={{ borderRadius: 20, overflow: "hidden", background: "#0C0A08", border: "1px solid #1A1610" }}>
                <div style={{ position: "relative", height: 200 }}>
                  <img src={dest.img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,8,0.86) 0%, transparent 50%)" }} />
                  <span style={{ position: "absolute", top: 14, right: 14, fontSize: 22 }}>{dest.emoji}</span>
                  <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px,3vw,24px)", fontWeight: 400, color: "#F0EAD6" }}>{dest.name}</h3>
                    <p style={{ fontSize: 11, color: "#6A5E44" }}>{dest.country} · {dest.nights} nights rec.</p>
                  </div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {dest.places.slice(0, 3).map((p, i) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: 4, background: "#131008", border: "1px solid #1A1610", borderRadius: 7, padding: "3px 8px", fontSize: 10, color: "#3A3020" }}>
                        {p.icon} {p.name}
                      </span>
                    ))}
                    {dest.places.length > 3 && <span style={{ fontSize: 10, color: "#2A2218", alignSelf: "center" }}>+{dest.places.length - 3}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return null;
}