import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import kaleshwaramImg from "./assets/kaleshwaram.jpg";
import medaramImg from "./assets/medaram.jpg";
import thousandPillarImg from "./assets/thousand_pillar.jpg";
import vemulawadaImg from "./assets/vemulawada.jpg";
import ramappaImg from "./assets/ramappa.jpg";
import padmavathiImg from "./assets/padmavathi.jpg";
import charminarImg from "./assets/charminar.jpg";
import kondagattuImg from "./assets/kondagattu.jpg";
import jagannathImg from "./assets/jagannath.jpg";
import venkateswaraImg from "./assets/venkateswara.jpg";

const DESTINATIONS = [
  {
    id: 1, name: "Charminar", country: "India", region: "Telangana", lat: 17.3616, lng: 78.4747,
    img: charminarImg,
    nights: 3,
    places: [
      { name: "Charminar", type: "Landmark", rating: 4.8, time: "1–2 hrs", desc: "Iconic 16th-century mosque and monument at the heart of old Hyderabad, built by Sultan Muhammad Quli Qutb Shah in 1591." },
      { name: "Golconda Fort", type: "Historic Site", icon: "🏰", rating: 4.7, time: "3–4 hrs", desc: "Magnificent medieval fort famous for its acoustic system, palaces, and panoramic views — once home to the legendary Koh-i-Noor diamond." },
      { name: "Ramoji Film City", type: "Experience", icon: "🎬", rating: 4.6, time: "Full day", desc: "World's largest film studio complex — a sprawling entertainment city with sets, shows, and themed attractions." },
      { name: "Hussain Sagar Lake", type: "Nature", icon: "🌊", rating: 4.5, time: "1–2 hrs", desc: "Heart-shaped lake with a giant Buddha statue on a central island, perfect for a scenic boat ride at sunset." },
      { name: "Salar Jung Museum", type: "Museum", icon: "🏛️", rating: 4.7, time: "2–3 hrs", desc: "One of India's finest museums housing a massive collection of art, antiques, and manuscripts from around the world." },
      { name: "Laad Bazaar", type: "Market", icon: "💎", rating: 4.6, time: "1–2 hrs", desc: "Hyderabad's traditional bangle market next to Charminar — a riot of colour, lac bangles, pearls, and street food." },
    ],
    itinerary: [
      { title: "Arrival & Old City Wonders", items: ["Check in at a heritage hotel", "Evening visit to Charminar", "Laad Bazaar bangle shopping", "Hyderabadi Biryani dinner at Paradise"] },
      { title: "Forts & Culture", items: ["Golconda Fort morning exploration", "Sound & Light show at Golconda", "Salar Jung Museum afternoon", "Chaat and kebabs at street stalls"] },
      { title: "Lakes & Film City Farewell", items: ["Hussain Sagar Lake boat ride", "Ramoji Film City highlights tour", "Irani chai & Osmania biscuits farewell"] },
    ]
  },
  {
    id: 2, name: "Kaleshwaram Temple", country: "India",  region: "Telangana", lat: 18.8152, lng: 79.9056,
    img: kaleshwaramImg,
    nights: 2,
    places: [
      { name: "Mukteswara Swamy Temple", type: "Temple", icon: "🛕", rating: 4.9, time: "2–3 hrs", desc: "Ancient Shiva temple at the sacred confluence of Godavari and Pranahita rivers, revered as one of the 18 Shakti Peethas and dedicated to Lord Shiva as Kaleshwaram." },
      { name: "Triveni Sangamam", type: "Sacred Site", icon: "🌊", rating: 4.8, time: "1–2 hrs", desc: "Holy confluence of rivers Godavari, Pranahita and Saraswati — a deeply sacred bathing ghat visited by pilgrims from across the country." },
      { name: "Kaleshwaram Ghat", type: "Ghat", icon: "🙏", rating: 4.7, time: "1 hr", desc: "Scenic stone ghats on the Godavari banks where pilgrims perform rituals, puja, and take holy dips during festivals." },
      { name: "Dharmapuri Sri Lakshmi Narasimha Temple", type: "Temple", icon: "🛕", rating: 4.7, time: "1–2 hrs", desc: "Nearby famous temple dedicated to Lord Narasimha, located at the confluence of Godavari and Sirsa rivers in Dharmapuri." },
      { name: "Godavari River Cruise", type: "Experience", icon: "🚤", rating: 4.6, time: "1–2 hrs", desc: "Scenic boat ride on the Godavari river with views of lush forest gorges, rocky banks and the sacred temple complex." },
      { name: "Mahadev Hills", type: "Nature", icon: "⛰️", rating: 4.5, time: "1–2 hrs", desc: "Scenic forested hills around the temple complex offering tranquil nature trails and panoramic views of the Godavari valley." },
    ],
    itinerary: [
      { title: "Arrival & Temple Darshan", items: ["Check in at pilgrim guesthouse", "Evening aarti at Mukteswara Swamy Temple", "Triveni Sangamam holy dip", "Prasadam dinner"] },
      { title: "Sacred Riverside Day", items: ["Early morning Godavari ghat rituals", "Temple inner sanctum darshan", "Boat ride on Godavari", "Dharmapuri temple visit & departure"] },
    ]
  },
  {
    id: 3, name: "Medaram Temple", country: "India", region: "Telangana", lat: 18.2721, lng: 80.2520,
    img: medaramImg,
    nights: 2,
    places: [
      { name: "Sammakka Saralamma Shrine", type: "Temple", icon: "🛕", rating: 4.9, time: "2–3 hrs", desc: "Sacred tribal shrine dedicated to Sammakka and Saralamma — mother and daughter folk deities worshipped as forest goddesses. Site of the world's largest tribal festival held once every two years." },
      { name: "Medaram Jatara Grounds", type: "Sacred Site", icon: "🌿", rating: 4.8, time: "2–3 hrs", desc: "Sprawling festival ground in the dense Dandakaranya forest, where millions of Koya tribal devotees gather for the Sammakka Saralamma Jatara — the largest tribal fair in the world." },
      { name: "Sampangi Shrine", type: "Temple", icon: "🛕", rating: 4.7, time: "1 hr", desc: "Shrine of Sampangi, the husband of Saralamma, located in the Medaram complex — an integral part of the four-day Jatara pilgrimage circuit." },
      { name: "Kannepalli Shrine", type: "Temple", icon: "🙏", rating: 4.6, time: "1 hr", desc: "Sacred site dedicated to Govinda Raju (Saralamma's husband) visited as part of the Medaram pilgrimage route." },
      { name: "Godavari Ghat Medaram", type: "Ghat", icon: "🌊", rating: 4.6, time: "1 hr", desc: "Sacred ghat on the Jampanna Vagu stream near Medaram where devotees take a ritual bath before entering the shrines." },
      { name: "Dandakaranya Forest Trails", type: "Nature", icon: "🌳", rating: 4.5, time: "1–2 hrs", desc: "Ancient forest trails through the Dandakaranya jungle surrounding Medaram, home to tribal villages and rich biodiversity." },
    ],
    itinerary: [
      { title: "Arrival & Forest Shrines", items: ["Arrive at Medaram via Mulugu", "Ritual bath at Jampanna Vagu ghat", "Sammakka Shrine evening darshan", "Tribal cuisine dinner at camp"] },
      { title: "Full Pilgrimage Circuit", items: ["Saralamma shrine morning darshan", "Sampangi & Govinda Raju shrines", "Explore Jatara grounds & tribal stalls", "Forest walk & departure"] },
    ]
  },
  {
    id: 4, name: "Thousand Pillar Temple", country: "India", region: "Telangana", lat: 18.0051, lng: 79.5828,
    img: thousandPillarImg,
    nights: 2,
    places: [
      { name: "Thousand Pillar Temple", type: "Temple", icon: "🏛️", rating: 4.9, time: "2–3 hrs", desc: "Magnificent 12th-century Kakatiya-era trikuta (triple shrine) temple dedicated to Shiva, Vishnu and Surya, with star-shaped platforms and intricately carved basalt pillars — a marvel of Deccan architecture." },
      { name: "Warangal Fort", type: "Historic Site", icon: "🏰", rating: 4.8, time: "2–3 hrs", desc: "Iconic Kakatiya fort famous for its massive granite arched gateways (Kakatiya Kala Thoranam) — now a national symbol of Telangana's medieval glory." },
      { name: "Bhadrakali Temple Warangal", type: "Temple", icon: "🛕", rating: 4.7, time: "1–2 hrs", desc: "Ancient lakeside temple dedicated to Goddess Bhadrakali set on a rocky hill overlooking a scenic lake — one of the oldest Shakti shrines in Telangana." },
      { name: "Ramappa Temple", type: "UNESCO Site", icon: "🌟", rating: 4.9, time: "2–3 hrs", desc: "UNESCO World Heritage Site — a 13th-century Kakatiya temple famed for its floating bricks, exquisite bracket figures (Madanikas) and intricate sculptural artistry." },
      { name: "Pakhal Lake", type: "Nature", icon: "🌊", rating: 4.7, time: "1–2 hrs", desc: "Serene 13th-century artificial lake built by the Kakatiyas, surrounded by forest and teeming with migratory birds — perfect for birdwatching and sunsets." },
      { name: "Kakatiya Musical Garden", type: "Park", icon: "🌳", rating: 4.4, time: "1 hr", desc: "Well-maintained heritage park near the Thousand Pillar Temple with replica Kakatiya sculptures and peaceful evening ambience." },
    ],
    itinerary: [
      { title: "Arrival & Kakatiya Wonders", items: ["Arrive at Warangal", "Thousand Pillar Temple morning darshan", "Warangal Fort & kala thoranam arches", "Heritage dinner at local dhaba"] },
      { title: "Temples & Lakes", items: ["Bhadrakali Temple sunrise visit", "Pakhal Lake birdwatching", "Ramappa Temple afternoon", "Return journey to Hyderabad"] },
    ]
  },
  {
    id: 5, name: "Ramappa Temple", country: "India", region: "Telangana", lat: 18.2592, lng: 79.9436,
    img: ramappaImg,
    nights: 2,
    places: [
      { name: "Ramappa Temple (UNESCO)", type: "UNESCO Heritage", icon: "🌟", rating: 4.9, time: "2–3 hrs", desc: "A UNESCO World Heritage Site built in 1213 CE by Kakatiya general Recherla Rudra. Famous for its floating bricks, exquisite Madanika bracket figures, and intricate carvings — the only temple in India named after its architect Ramappa." },
      { name: "Ramappa Lake", type: "Nature", icon: "🌊", rating: 4.8, time: "1–2 hrs", desc: "13th-century Kakatiya-built reservoir surrounding the temple — offering serene boat rides amid lush greenery with the temple silhouette at sunrise." },
      { name: "Ghanpur Temple Complex", type: "Temple", icon: "🏛️", rating: 4.6, time: "1–2 hrs", desc: "Cluster of ruined Kakatiya temples at Ghanpur near Mulugu, with exquisite sculptural art comparable to Ramappa — an off-the-beaten-path heritage gem." },
      { name: "Laknavaram Lake", type: "Nature", icon: "🌿", rating: 4.7, time: "2 hrs", desc: "Stunning lake with a unique multi-island landscape connected by suspension bridges, surrounded by dense forest — ideal for boating and photography." },
      { name: "Bogatha Waterfall", type: "Nature", icon: "💧", rating: 4.8, time: "2 hrs", desc: "Often called the Niagara of Telangana — a dramatic multi-tiered waterfall in the Kinnersani forest, especially spectacular after monsoon rains." },
      { name: "Mulugu Town Heritage Walk", type: "Experience", icon: "🚶", rating: 4.4, time: "1 hr", desc: "Walk through the charming town of Mulugu with its local bazaar, tribal crafts, temple flower markets and traditional eateries." },
    ],
    itinerary: [


      
      { title: "Arrival & UNESCO Darshan", items: ["Arrive at Mulugu/Ramappa", "Ramappa Temple guided heritage tour", "Lakeside sunset at Ramappa Lake", "Local Kakatiya-style dinner"] },
      { title: "Lakes, Falls & Farewell", items: ["Bogatha Waterfall morning trip", "Laknavaram Lake boat ride", "Ghanpur temple ruins visit", "Return to Hyderabad"] },
    ]
  },
  {
    id: 6, name: "Sri Padmavathi Temple", country: "India", region: "Andhra Pradesh", lat: 13.6063, lng: 79.4447,
    img: padmavathiImg,
    nights: 2,
    places: [
      { name: "Sri Padmavathi Ammavari Temple", type: "Temple", icon: "🌸", rating: 4.9, time: "2–3 hrs", desc: "One of the most sacred Vaishnava temples in South India, dedicated to Goddess Padmavathi (Alamelu Manga) — the divine consort of Lord Venkateswara. Located at Tiruchanur near Tirupati, it is visited by millions of devotees annually." },
      { name: "Tirumala Venkateswara Temple", type: "Temple", icon: "🙏", rating: 5.0, time: "Half day", desc: "The world's most visited religious site — the sacred abode of Lord Venkateswara (Balaji) atop Tirumala Hills, drawing over 100,000 pilgrims daily." },
      { name: "ISKCON Tirupati", type: "Temple", icon: "🛕", rating: 4.6, time: "1–2 hrs", desc: "Magnificent Radha Govinda Dham temple by ISKCON with stunning architecture, devotional programs and peaceful spiritual atmosphere." },
      { name: "Sri Govindarajaswamy Temple", type: "Temple", icon: "🛕", rating: 4.7, time: "1–2 hrs", desc: "Ancient Vaishnava temple in the heart of Tirupati town, one of the most important Divya Desam shrines in the Pancharanga Kshetras." },
      { name: "Chandragiri Fort", type: "Historic Site", icon: "🏰", rating: 4.6, time: "2 hrs", desc: "14th-century fort of the Vijayanagara empire with the Raja Mahal, Rani Mahal, and a light-and-sound show narrating its glorious history." },
      { name: "Silathoranam", type: "Natural Wonder", icon: "🌿", rating: 4.7, time: "1 hr", desc: "A rare natural rock arch on the Tirumala Hills, considered the world's only natural arch formed in quartzite rock — a unique geological and sacred landmark." },
    ],
    itinerary: [
      { title: "Arrival & Goddess Darshan", items: ["Arrive at Tirupati", "Sri Padmavathi Ammavari Temple darshan", "Evening at Govindarajaswamy Temple", "Traditional Andhra dinner"] },
      { title: "Tirumala & Heritage", items: ["Tirumala Venkateswara Temple early morning darshan", "Silathoranam natural arch visit", "Chandragiri Fort afternoon", "Return journey"] },
    ]
  },
  {
    id: 7, name: "Vemulawada Temple", country: "India", region: "Telangana", lat: 18.4651, lng: 78.8741,
    img: vemulawadaImg,
    nights: 2,
    places: [
      { name: "Rajarajeshwara Swamy Temple", type: "Temple", icon: "⚡", rating: 4.9, time: "2–3 hrs", desc: "One of the most powerful Shiva temples in Telangana, dedicated to Lord Rajarajeshwara — known as the Dakshina Kashi (Varanasi of the South). Draws millions of devotees, especially during Maha Shivaratri." },
      { name: "Siddheshwara Temple", type: "Temple", icon: "🛕", rating: 4.7, time: "1–2 hrs", desc: "Adjacent temple to Siddheshwara, a form of Shiva associated with granting boons to devotees — integral to the Vemulawada pilgrimage circuit." },
      { name: "Raja Rajeswara Lake", type: "Nature", icon: "🌊", rating: 4.6, time: "1 hr", desc: "Serene tank adjacent to the main temple complex, where devotees take a ritual dip before darshan — peaceful and picturesque at dawn." },
      { name: "Komuravelli Mallanna Temple", type: "Temple", icon: "🙏", rating: 4.8, time: "1–2 hrs", desc: "Famous temple of Komuravelli Mallanna (a form of Shiva) near Siddipet — a key pilgrimage stop often combined with Vemulawada, especially revered by the Golla community." },
      { name: "Vemulawada Town Bazaar", type: "Market", icon: "🛒", rating: 4.4, time: "1 hr", desc: "Bustling pilgrim market filled with flower garlands, sacred offerings, traditional sweets, silver jewellery, and Karimnagar cotton sarees." },
      { name: "Dharma Koop Well", type: "Sacred Site", icon: "🪔", rating: 4.5, time: "30 min", desc: "Ancient sacred well inside the temple complex associated with divine legend — devotees offer prayers and lamp-lighting here as part of the ritual." },
    ],
    itinerary: [
      { title: "Arrival & Temple Darshan", items: ["Arrive at Vemulawada from Hyderabad/Karimnagar", "Ritual bath at Raja Rajeswara tank", "Evening aarti at Rajarajeshwara Temple", "Prasadam & local dinner"] },
      { title: "Full Pilgrimage Circuit", items: ["Early morning darshan at Rajarajeshwara", "Siddheshwara shrine visit", "Komuravelli Mallanna Temple trip", "Bazaar shopping & departure"] },
    ]
  },
  {
    id: 8, name: "Kondagattu Temple", country: "India", emoji: "🐒", region: "Telangana", lat: 18.7844, lng: 78.9647,
    img: kondagattuImg,
    nights: 2,
    places: [
      { name: "Kondagattu Anjaneya Swamy Temple", type: "Temple", icon: "🐒", rating: 4.9, time: "2–3 hrs", desc: "One of the most celebrated Hanuman temples in Telangana, perched atop a scenic hill at Kondagattu. The presiding deity Sri Anjaneya Swamy (Hanuman) is believed to fulfil devotees' wishes. Draws lakhs of pilgrims especially on Hanuman Jayanti and Saturdays." },
      { name: "Kondagattu Hill Trekking Path", type: "Adventure", icon: "⛰️", rating: 4.7, time: "1–2 hrs", desc: "Scenic steps and rocky trails leading up the Kondagattu hill through dense forest — a spiritually charged trek offering panoramic views of the Godavari plains." },
      { name: "Kondagattu Viewpoint", type: "Nature", icon: "🌄", rating: 4.8, time: "30–60 min", desc: "Breathtaking 360° views of lush Telangana countryside, Godavari tributary valleys, and forested hills from the temple hilltop — spectacular at sunrise." },
      { name: "Jagtial Fort", type: "Historic Site", icon: "🏰", rating: 4.5, time: "1–2 hrs", desc: "17th-century Mughal-era fort in nearby Jagtial town with bastions, gateways and ruins narrating the region's medieval history." },
      { name: "Sriram Sagar Project", type: "Nature", icon: "🌊", rating: 4.6, time: "1–2 hrs", desc: "One of Telangana's largest irrigation reservoirs — a scenic dam and reservoir on the Godavari near Nizamabad, popular for picnics and sunsets." },
      { name: "Sarangapur Temple", type: "Temple", icon: "🛕", rating: 4.7, time: "1 hr", desc: "Replica of the famous Sarangapur Hanumanji shrine, worshipped here by devotees seeking protection from evil spirits and negative energies." },
    ],
    itinerary: [
      { title: "Arrival & Hill Temple Darshan", items: ["Arrive at Kondagattu via Jagtial", "Trek up Kondagattu hill steps", "Anjaneya Swamy Temple darshan & aarti", "Viewpoint sunset & prasadam dinner"] },
      { title: "Surroundings & Departure", items: ["Early darshan at Kondagattu Temple", "Jagtial Fort heritage visit", "Sriram Sagar dam viewpoint", "Return to Hyderabad"] },
    ]
  },
  {
    id: 9, name: "Shree Jaganatha Swamy Temple", country: "India", region: "Odisha", lat: 19.8049, lng: 85.8180,
    img: jagannathImg,
    nights: 2,
    places: [
      { name: "Shree Jaganatha Swamy Temple", type: "Temple", icon: "🛕", rating: 4.9, time: "2–3 hrs", desc: "One of the original Char Dham pilgrimage sites, a majestic 12th-century temple dedicated to Lord Jagannath. Famous for the annual Ratha Yatra." },
      { name: "Puri Golden Beach", type: "Nature", icon: "🌊", rating: 4.6, time: "1–2 hrs", desc: "A pristine Blue Flag certified beach on the Bay of Bengal, perfect for spiritual reflection and watching stunning sunrises." },
      { name: "Konark Sun Temple", type: "UNESCO Site", icon: "☀️", rating: 4.9, time: "2–3 hrs", desc: "A 13th-century UNESCO World Heritage Site shaped like a giant chariot, renowned for its exquisite stone carvings and ancient astronomical significance." },
      { name: "Gundicha Temple", type: "Temple", icon: "🔱", rating: 4.5, time: "1 hr", desc: "Known as the Garden House of Lord Jagannath, where the deities reside for 9 days during the world-famous Ratha Yatra festival." },
      { name: "Chilika Lake", type: "Nature", icon: "🛶", rating: 4.7, time: "3–4 hrs", desc: "Asia's largest brackish water lagoon, a serene ecosystem home to migratory birds and the rare Irrawaddy dolphins." },
      { name: "Swargadwar Market", type: "Market", icon: "🛍️", rating: 4.4, time: "1–2 hrs", desc: "Bustling coastal market near the sacred cremation grounds, famous for traditional Odia handicrafts, sea-shell souvenirs, and local Khaja sweets." },
    ],
    itinerary: [
      { title: "Arrival & Sacred Darshan", items: ["Arrive in Puri & check-in", "Evening darshan at Shree Jaganatha Swamy Temple", "Stroll along Golden Beach", "Traditional Mahaprasad dinner"] },
      { title: "Heritage & Coastline", items: ["Konark Sun Temple morning tour", "Gundicha Temple visit", "Chilika Lake boat ride", "Evening at Swargadwar Market"] },
    ]
  },
  {
    id: 10, name: "Sri Venkateswara Swamy Temple", country: "India", emoji: "🙏", region: "Andhra Pradesh", lat: 13.6833, lng: 79.3473,
    img: venkateswaraImg,
    nights: 2,
    places: [
      { name: "Sri Venkateswara Vaari Temple", type: "Temple", icon: "🙏", rating: 5.0, time: "4–6 hrs", desc: "The legendary hill shrine of Lord Balaji on the Seshachalam hills. The richest and most visited Hindu temple in the world, radiating profound spiritual energy." },
      { name: "Swami Pushkarini Lake", type: "Sacred Site", icon: "💧", rating: 4.8, time: "1 hr", desc: "The highly sacred temple tank where pilgrims take a holy dip before entering the main Venkateswara temple for darshan." },
      { name: "Silathoranam", type: "Natural Wonder", icon: "🪨", rating: 4.7, time: "1 hr", desc: "A rare natural rock formation and geological monument on Tirumala hills, believed to be connected to the divine origins of the Lord." },
      { name: "Akasa Ganga Teertham", type: "Nature", icon: "🌊", rating: 4.6, time: "1–2 hrs", desc: "A sacred waterfall on the Tirumala hills. The holy water from this fall is used daily for the Lord's celestial bath (Abhishekam)." },
      { name: "Papavinasam Theertham", type: "Nature", icon: "🌿", rating: 4.5, time: "1–2 hrs", desc: "A holy stream cascading down the hills. As the name suggests, bathing in its waters is believed to cleanse devotees of their sins." },
      { name: "Srivari Mettu Trek", type: "Adventure", icon: "🚶", rating: 4.8, time: "2–3 hrs", desc: "The ancient, shorter, and historic pedestrian trekking route consisting of 2,388 steps to reach the Tirumala hilltop from the base." },
    ],
    itinerary: [
      { title: "Trek & Hilltop Arrival", items: ["Arrive at Tirupati base", "Trek up the Srivari Mettu steps", "Holy dip in Swami Pushkarini", "Evening rest at Tirumala guesthouse"] },
      { title: "Srivari Darshan & Wonders", items: ["Early morning Sri Venkateswara Swamy Darshan", "Visit Silathoranam rock arch", "Akasa Ganga & Papavinasam waterfalls", "Collect Laddu prasadam & return"] },
    ]
  }
];

const REGIONS = ["All", "Telangana", "Andhra Pradesh", "Odisha"];
const totalDays = (dests) => dests.reduce((s, d) => s + d.nights, 0) + 1;

const BoundsFitter = ({ dests }) => {
  const map = useMap();
  useEffect(() => {
    if (dests && dests.length > 0) {
      const gBounds = L.latLngBounds(dests.map(d => [d.lat, d.lng]));
      map.fitBounds(gBounds, { padding: [50, 50] });
    }
  }, [dests, map]);
  return null;
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0C0A08; }
  ::-webkit-scrollbar-thumb { background: #3A3020; border-radius: 3px; }
  .app { font-family: 'Outfit', sans-serif; background: #0C0A08; color: #F0EAD6; min-height: 100%; overflow-x: hidden; }
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

  .build-grid { display: grid; grid-template-columns: 1fr 370px; min-height: calc(100vh - 62px); }
  @media (max-width: 900px) {
    .build-grid { grid-template-columns: 1fr !important; }
    .build-right-panel { position: static !important; height: auto !important; border-left: none !important; border-top: 1px solid #1A1612 !important; max-height: none !important; }
  }

  @keyframes floatAnim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .hero-wrapper { display: flex; align-items: center; justify-content: space-between; max-width: 1300px; width: 100%; margin: 0 auto; position: relative; z-index: 2; gap: 40px; }
  .hero-center { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .hero-left, .hero-right { display: flex; flex-direction: column; gap: 24px; justify-content: center; align-items: center; flex-shrink: 0; }
  .hero-img { width: 220px; height: 280px; border-radius: 20px; object-fit: cover; box-shadow: 0 16px 40px rgba(0,0,0,0.5); border: 1px solid #1A1612; animation: floatAnim 6s ease-in-out infinite; }
  .hero-stats { display: flex; justify-content: center; gap: 52px; margin-top: 50px; }
  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 950px) {
    .hero-left, .hero-right { display: none !important; }
    .hero-stats { gap: 24px !important; margin-top: 40px; }
    .hero-btns { flex-direction: column; align-items: center; width: 100%; }
    .hero-btns button { width: 90% !important; }
    .hero-section { min-height: 80vh !important; }
  }

  .dest-grid-home { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 18px; }
  .explore-grid   { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px; }
  .places-grid    { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 13px; }
  .build-dest-grid{ display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 16px; }
  .itin-items     { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr)); gap: 7px; }
  .leaflet-popup-content-wrapper { background: #131008 !important; border: 1px solid #2A2218 !important; border-radius: 12px !important; padding: 0 !important; }
  .leaflet-popup-tip { background: #131008 !important; }
  .leaflet-container { font-family: 'Outfit', sans-serif !important; z-index: 1; }
  .map-tiles { filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }
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

  .region-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  @media (max-width: 600px) {
    .region-filters { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .region-filters::-webkit-scrollbar { display: none; }
  }

  .page-pad  { padding: 48px 32px 100px; }
  .home-strip{ padding: 56px 32px 80px; }
  @media (max-width: 600px) {
    .page-pad   { padding: 28px 16px 80px !important; }
    .home-strip { padding: 32px 16px 60px !important; }
    .build-left-pad { padding: 24px 16px 80px !important; }
    .build-right-pad { padding: 24px 16px 32px !important; }
  }

  .detail-hero { height: 380px; }
  @media (max-width: 600px) {
    .detail-hero { height: 220px !important; border-radius: 14px !important; }
    .detail-hero-title { font-size: 32px !important; }
    .detail-hero-btns { flex-direction: column !important; }
    .detail-hero-btns button { width: 100% !important; }
  }

  .itin-title { font-size: 52px; }
  .itin-timeline { display: flex; gap: 24px; }
  @media (max-width: 600px) {
    .itin-title { font-size: 30px !important; }
    .itin-timeline { gap: 10px !important; }
    .timeline-dots { display: none !important; }
    .famous-title  { font-size: 26px !important; }
    .dest-section-title { font-size: 20px !important; }
  }

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
  const [tripName, setTripName] = useState("My Sacred Temple Journey");

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
          dayNum: dayCount++, dest: dest.name, emoji: "🚌",
          title: `Travel to ${selectedDests[di + 1].name}`,
          items: [`Check out from ${dest.name}`, `Road journey to ${selectedDests[di + 1].name}`, `Arrive & settle at ${selectedDests[di + 1].name}`],
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
          <span style={{ fontSize: 20 }}>🛕</span>
          <span className="nav-logo-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#F0EAD6" }}>Temple Yatra Planner</span>
        </div>
        <div className="desktop-nav-tabs" style={{ display: "flex", gap: 4 }}>
          {[["home", "Discover"], ["build", `Plan Yatra${selectedDests.length ? ` (${selectedDests.length})` : ""}`], ["itinerary", "My Itinerary"], ["explore", "Explore"]].map(([v, label]) => (
            <button key={v} className="tab-pill btn" onClick={() => setView(v)} style={{ padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: view === v ? "#E8B86D" : "transparent", color: view === v ? "#0C0A08" : "#6A5E44", border: view === v ? "none" : "1px solid transparent" }}>{label}</button>
          ))}
        </div>
        <div className="nav-badge" style={{ fontSize: 13, color: "#3A3020" }}>
          {selectedDests.length > 0 && <span style={{ background: "#E8B86D", color: "#0C0A08", borderRadius: 10, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{totalDays(selectedDests)} days</span>}
        </div>
      </nav>
      <div className="mobile-nav">
        {[["home", "🏠", "Discover"], ["build", "🗺️", "Plan"], ["itinerary", "📋", "Itinerary"], ["explore", "🔍", "Explore"]].map(([v, icon, label]) => (
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

        <div className="hero-wrapper">
          <div className="hero-left">
            <img className="hero-img" src={DESTINATIONS[0].img} alt="Charminar" />
            <img className="hero-img" src={DESTINATIONS[8].img} style={{ animationDelay: "-3s" }} alt="Jagannath Temple" />
          </div>

          <div className="hero-center">
            <p className="f1" style={{ fontSize: 11, letterSpacing: 5, color: "#E8B86D", textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>Telangana & Andhra Temple Yatra Planner</p>
            <h1 className="f2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px,8vw,80px)", fontWeight: 400, lineHeight: 1.0, color: "#F0EAD6", marginBottom: 24, letterSpacing: -2 }}>
              Plan your<br /><em style={{ color: "#E8B86D" }}>sacred</em> journey
            </h1>
            <p className="f3" style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "#5A4E38", lineHeight: 1.8, marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>
              Combine multiple temple destinations into one seamless pilgrimage. Curated sacred sites, day-by-day yatra itineraries, and smart planning — all together.
            </p>
            <div className="f4 hero-btns">
              <button className="btn lift" onClick={() => setView("build")} style={{ padding: "16px 40px", borderRadius: 50, background: "#E8B86D", color: "#0C0A08", fontSize: 15, fontWeight: 600, boxShadow: "0 8px 32px rgba(232,184,109,0.3)" }}>Start Planning Your Yatra →</button>
              <button className="btn lift" onClick={() => setView("explore")} style={{ padding: "16px 32px", borderRadius: 50, background: "transparent", border: "1px solid #2A2218", color: "#6A5E44", fontSize: 15, fontWeight: 500 }}>Explore Temples</button>
            </div>
            <div className="hero-stats f4">
              {[["10", "Sacred Destinations"], ["60+", "Holy Sites"], ["∞", "Pilgrimage Routes"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#E8B86D" }}>{n}</div>
                  <div style={{ fontSize: 10, color: "#3A3020", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <img className="hero-img" src={DESTINATIONS[9].img} style={{ animationDelay: "-1.5s" }} alt="Venkateswara Temple" />
            <img className="hero-img" src={DESTINATIONS[7].img} style={{ animationDelay: "-4.5s" }} alt="Kondagattu Temple" />
          </div>
        </div>
      </div>
      <div className="home-strip" style={{ borderTop: "1px solid #1A1612" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 400, textAlign: "center", marginBottom: 8 }}>Sacred Destinations</h2>
        <p style={{ textAlign: "center", color: "#3A3020", marginBottom: 40, fontSize: 14 }}>Tap any temple to explore its sacred places & itinerary</p>
        <div className="dest-grid-home">
          {DESTINATIONS.map(dest => (
            <div key={dest.id} className="dest-card" onClick={() => { setActiveDestDetail(dest); setView("explore"); }} style={{ borderRadius: 18, overflow: "hidden", background: "#0E0C08", border: "1px solid #1A1610" }}>
              <div style={{ position: "relative", height: 175 }}>
                <img src={dest.img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,8,0.85) 0%, transparent 55%)" }} />
                <span style={{ position: "absolute", top: 12, right: 12, fontSize: 22 }}>{dest.emoji}</span>
                <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(14px,2.5vw,18px)", color: "#F0EAD6" }}>{dest.name}</div>
                  <div style={{ fontSize: 11, color: "#6A5E44" }}>{dest.region} · {dest.places.length} sacred sites</div>
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
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,5vw,40px)", fontWeight: 400, marginBottom: 6 }}>Choose Temple Destinations</h1>
          <p style={{ color: "#3A3020", marginBottom: 24, fontSize: 14 }}>Select 2+ temples — pilgrimage itinerary stitched automatically</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 180px", display: "flex", alignItems: "center", gap: 8, background: "#131008", border: "1px solid #2A2218", borderRadius: 10, padding: "10px 14px" }}>
              <span style={{ color: "#3A3020", fontSize: 14 }}>🔍</span>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search temples..." style={{ flex: 1, border: "none", background: "transparent", color: "#F0EAD6", fontFamily: "'Outfit', sans-serif", fontSize: 13, outline: "none" }} />
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
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#F0EAD6" }}>{dest.name}</div>
                      <div style={{ fontSize: 10, color: "#6A5E44" }}>{dest.region}</div>
                    </div>
                  </div>
                  <div style={{ padding: "8px 12px", display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 9, color: "#4A3E28" }}>{dest.region}</span>
                    <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 9, color: "#4A3E28" }}>🛕{dest.places.length}</span>
                    <span style={{ background: "#131008", padding: "2px 8px", borderRadius: 8, fontSize: 9, color: "#4A3E28" }}>🌙{dest.nights}n</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="build-right-panel build-right-pad" style={{ padding: "36px 26px", background: "#0A0806", overflowY: "auto", position: "sticky", top: 62, height: "calc(100vh - 62px)", borderLeft: "1px solid #1A1612" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 23, marginBottom: 6 }}>Your Yatra</h2>
          <input value={tripName} onChange={e => setTripName(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2A2218", color: "#6A5E44", fontFamily: "'Outfit', sans-serif", fontSize: 13, padding: "6px 0", marginBottom: 24, outline: "none" }} placeholder="Name your yatra..." />
          {selectedDests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "52px 0" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>🛕</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3020" }}>Select 2+ temples to build your sacred pilgrimage journey</p>
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
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#F0EAD6", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dest.emoji} {dest.name}</div>
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
                    {idx < selectedDests.length - 1 && <div style={{ marginLeft: 17, paddingLeft: 29, borderLeft: "1px dashed #2A2218", padding: "2px 0 2px 28px", fontSize: 11, color: "#2A2218" }}>🚌 transit day</div>}
                  </div>
                ))}
              </div>
              <div style={{ background: "#131008", borderRadius: 10, padding: "12px 14px", marginBottom: 20, fontSize: 13 }}>
                <div style={{ fontSize: 10, color: "#3A3020", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Pilgrimage Route</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                  {selectedDests.map((d, i) => (
                    <span key={d.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#C8A85C", fontWeight: 500, fontSize: 12 }}>{d.name}</span>
                      {i < selectedDests.length - 1 && <span style={{ color: "#2A2218" }}>→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 22 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: "#4A3E28", letterSpacing: 1, textTransform: "uppercase" }}>Pilgrims</span>
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
                    <span style={{ fontSize: 13, color: "#E8B86D", fontWeight: 500 }}>₹{budget.toLocaleString()}</span>
                  </div>
                  <input type="range" min={500} max={20000} step={250} value={budget} onChange={e => setBudget(+e.target.value)} />
                </div>
              </div>
              <div className="trip-stats" style={{ marginBottom: 20 }}>
                {[["Temples", selectedDests.length], ["Total Days", totalDays(selectedDests)], ["Pilgrims", travelers], ["Est. Total", `₹${(budget * travelers).toLocaleString()}`]].map(([k, v]) => (
                  <div key={k} style={{ background: "#131008", borderRadius: 10, padding: "12px 13px", border: "1px solid #1A1610" }}>
                    <div style={{ fontSize: 10, color: "#3A3020", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: "#E8B86D" }}>{v}</div>
                  </div>
                ))}
              </div>
              <button className="btn lift" onClick={() => setView("itinerary")} style={{ width: "100%", padding: "15px", borderRadius: 12, background: "linear-gradient(135deg,#E8B86D,#C8883D)", color: "#0C0A08", fontSize: 15, fontWeight: 600, boxShadow: "0 8px 24px rgba(232,184,109,0.2)" }}>Generate Full Yatra Itinerary →</button>
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
          <div style={{ fontSize: 52 }}>🛕</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,32px)", fontWeight: 400 }}>No yatra planned yet</h2>
          <button className="btn lift" onClick={() => setView("build")} style={{ padding: "14px 34px", borderRadius: 50, background: "#E8B86D", color: "#0C0A08", fontSize: 15, fontWeight: 600 }}>Plan a Yatra →</button>
        </div>
      ) : (
        <div className="page-pad" style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: "#E8B86D", textTransform: "uppercase", marginBottom: 12 }}>Your Sacred Pilgrimage</p>
            <h1 className="itin-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>{tripName}</h1>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
              {selectedDests.map((d, i) => (
                <span key={d.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ background: "#131008", border: "1px solid #2A2218", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#C8A85C" }}>{d.emoji} {d.name}</span>
                  {i < selectedDests.length - 1 && <span style={{ color: "#2A2218", fontSize: 12 }}>🚌</span>}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["🗓️", `${totalDays(selectedDests)} days`], ["🛕", `${selectedDests.length} temples`], ["👥", `${travelers} pilgrim${travelers > 1 ? "s" : ""}`], ["💰", `₹${(budget * travelers).toLocaleString()}`], ...(startDate ? [["📅", new Date(startDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })]] : [])].map(([icon, label]) => (
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

          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <h2 className="famous-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 400, marginBottom: 16 }}>Your Yatra Route Map 🇮🇳</h2>
            <div style={{ padding: "4px", background: "#131008", borderRadius: 24, border: "1px solid #1A1612", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <div style={{ height: 450, width: "100%", borderRadius: 20, overflow: "hidden", zIndex: 1 }}>
                <MapContainer style={{ height: "100%", width: "100%", background: "#0c0a08" }} scrollWheelZoom={false}>
                  <BoundsFitter dests={DESTINATIONS} />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  {DESTINATIONS.map((dest) => (
                    <Marker
                      key={dest.id}
                      position={[dest.lat, dest.lng]}
                      icon={L.divIcon({
                        className: 'custom-map-icon',
                        html: `<div style="font-size: 20px; background: #0C0A08; border: 2px solid #E8B86D; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(232,184,109,0.3);">${dest.emoji}</div>`,
                        iconSize: [36, 36],
                        iconAnchor: [18, 18]
                      })}
                    >
                      <Popup className="dark-popup">
                        <div style={{ textAlign: "center", color: "#F0EAD6", fontFamily: "'Outfit', sans-serif" }}>
                          <strong style={{ color: "#E8B86D" }}>{dest.name}</strong><br />
                          <span style={{ fontSize: 11, color: "#6A5E44" }}>{dest.region}</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  <Polyline
                    positions={DESTINATIONS.map(d => [d.lat, d.lng])}
                    color="#E8B86D"
                    weight={3}
                    dashArray="6, 8"
                    opacity={0.6}
                  />
                </MapContainer>
              </div>
            </div>
          </div>

          <div>
            <h2 className="famous-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, marginBottom: 8 }}>Sacred Sites to Visit</h2>
            <p style={{ color: "#3A3020", marginBottom: 36, fontSize: 14 }}>Top-rated temples & holy experiences — tap any for details</p>
            {selectedDests.map(dest => (
              <div key={dest.id} style={{ marginBottom: 44 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #1A1610", flexWrap: "wrap" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", border: "2px solid #2A2218", flexShrink: 0 }}>
                    <img src={dest.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <h3 className="dest-section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400 }}>{dest.emoji} {dest.name}</h3>
                    <span style={{ fontSize: 11, color: "#3A3020" }}>{dest.region} · {dest.nights} nights · {dest.places.length} sacred sites</span>
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
            <button className="btn lift" onClick={() => setView("build")} style={{ flex: 1, minWidth: 140, padding: "14px", borderRadius: 12, background: "#131008", border: "1px solid #2A2218", color: "#6A5E44", fontSize: 14 }}>← Edit Yatra</button>
            <button className="btn lift" onClick={() => setView("explore")} style={{ flex: 1, minWidth: 140, padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#E8B86D,#C8883D)", color: "#0C0A08", fontSize: 14, fontWeight: 600 }}>Explore More Temples</button>
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
          <button className="btn nav-link" onClick={() => setActiveDestDetail(null)} style={{ color: "#4A3E28", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>← All Temples</button>
          <div className="detail-hero" style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 28 }}>
            <img src={activeDestDetail.img} alt={activeDestDetail.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,8,0.88) 0%, transparent 55%)" }} />
            <span style={{ position: "absolute", top: 18, right: 20, fontSize: 36 }}>{activeDestDetail.emoji}</span>
            <div style={{ position: "absolute", bottom: 24, left: 28 }}>
              <p style={{ fontSize: 10, letterSpacing: 4, color: "#E8B86D", textTransform: "uppercase", marginBottom: 8 }}>{activeDestDetail.country} · {activeDestDetail.region}</p>
              <h1 className="detail-hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,46px)", fontWeight: 400, color: "#F0EAD6", marginBottom: 6 }}>{activeDestDetail.name}</h1>
              <p style={{ fontSize: 12, color: "#6A5E44" }}>{activeDestDetail.places.length} sacred sites · Recommended {activeDestDetail.nights} nights</p>
            </div>
          </div>
          <div className="detail-hero-btns" style={{ display: "flex", gap: 12, marginBottom: 40 }}>
            <button className="btn lift" onClick={() => { toggleDest(activeDestDetail); setView("build"); }} style={{ flex: 1, padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 15, background: selectedDests.find(d => d.id === activeDestDetail.id) ? "#1E1810" : "linear-gradient(135deg,#E8B86D,#C8883D)", color: selectedDests.find(d => d.id === activeDestDetail.id) ? "#5A4E38" : "#0C0A08", border: selectedDests.find(d => d.id === activeDestDetail.id) ? "1px solid #2A2218" : "none" }}>
              {selectedDests.find(d => d.id === activeDestDetail.id) ? "✓ Added to Yatra" : "+ Add to My Yatra"}
            </button>
            <button className="btn lift" onClick={() => setView("build")} style={{ flex: 1, padding: "14px", borderRadius: 12, fontWeight: 500, fontSize: 15, background: "#131008", border: "1px solid #2A2218", color: "#6A5E44" }}>Yatra Builder →</button>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,34px)", fontWeight: 400, marginBottom: 8 }}>Sacred Sites</h2>
          <p style={{ color: "#3A3020", marginBottom: 24, fontSize: 14 }}>Top-rated temples, ghats & holy experiences</p>
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,34px)", fontWeight: 400, marginBottom: 8 }}>Sample Yatra Itinerary</h2>
          <p style={{ color: "#3A3020", marginBottom: 24, fontSize: 14 }}>A curated {activeDestDetail.nights}-night pilgrimage plan</p>
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
            <p style={{ fontSize: 10, letterSpacing: 4, color: "#E8B86D", textTransform: "uppercase", marginBottom: 12 }}>Curated Sacred Collection</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,6vw,50px)", fontWeight: 400, marginBottom: 20 }}>Explore Temple Destinations</h1>
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
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(15px,2.5vw,22px)", fontWeight: 400, color: "#F0EAD6" }}>{dest.name}</h3>
                    <p style={{ fontSize: 11, color: "#6A5E44" }}>{dest.region} · {dest.nights} nights rec.</p>
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
