import TravelPlanner from './TravelPlanner.jsx'

const Footer = () => (
  <footer style={{
    background: '#0f0f0f', 
    borderTop: '1px solid #1A1612', 
    padding: '20px', 
    textAlign: 'center', 
    color: '#6A5E44', 
    fontFamily: "'Outfit', sans-serif",
    marginTop: 'auto'
  }}>
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#E8B86D', marginBottom: 8 }}>Temple Yatra Planner</h3>
    <p style={{ fontSize: 14, marginBottom: 20, maxWidth: 400, margin: '0 auto 20px', lineHeight: 1.5 }}>
      Curating sacred temple destinations and comprehensive pilgrimage itineraries across Telangana & Andhra Pradesh.
    </p>
    <div style={{ 
      fontSize: 16, 
      color: '#f5e6c8', 
      fontWeight: 600,
      textShadow: '0 0 10px rgba(245, 230, 200, 0.4)',
      letterSpacing: 0.5 
    }}>
      © 2026 Temple Yatra Planning. All Rights Reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <div style={{ backgroundColor: '#0C0A08', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <TravelPlanner />
      </div>
      <Footer />
    </div>
  )
}
