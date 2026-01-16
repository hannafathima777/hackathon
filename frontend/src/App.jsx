import { useState } from "react";
import "./App.css";
import Hero from './components/Hero';
import Analytics from "./pages/Analytics";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("home"); // home | result | analytics
  const [isHovered, setIsHovered] = useState(false);

  // Unified Upload Logic
  const handleUpload = async (e) => {
    if (e) e.preventDefault();
    if (!file) return alert("SELECT RECEIPT SOURCE");

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/receipt/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("SERVER_OFFLINE");
      
      const data = await res.json();
      setResult(data);
      setPage("result"); // Switch to result view on success
    } catch (error) {
      console.error("Connection Error:", error);
      alert("BACKEND_CONNECTION_LOST");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#020202', minHeight: '100vh', width: '100vw', color: 'white', fontFamily: 'monospace' }}>
      
      {/* 1. NAVIGATION HEADER */}
      <nav style={navStyle}>
        <span onClick={() => setPage("home")} style={navLinkStyle(page === "home")}>[ SCANNER ]</span>
        <span onClick={() => setPage("analytics")} style={navLinkStyle(page === "analytics")}>[ ANALYTICS ]</span>
      </nav>

      {/* 2. HOME / UPLOAD VIEW */}
      {page === "home" && !loading && (
        <>
          <Hero />
          <div style={sectionContainer}>
            <div 
              style={glassCard(isHovered)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <h2 style={titleStyle}>Carbon emission tracking</h2>
              <div style={fileInputContainer}>
                <span style={fileTextStyle}>
                  {file ? `FILE: ${file.name.toUpperCase()}` : "SELECT RECEIPT SOURCE"}
                </span>
                <input
                  type="file"
                  accept=".jpg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={rawInputStyle}
                />
              </div>
              <button 
                onClick={handleUpload} 
                style={primaryButtonStyle(isHovered, loading)}
                disabled={loading}
              >
                RUN ANALYSIS
              </button>
            </div>
          </div>
        </>
      )}

      {/* 3. LOADING STATE */}
      {loading && (
        <div style={centerContainer}>
          <h2 className="pulse" style={{ color: '#00ff96', letterSpacing: '8px' }}>DECRYPTING_RECEIPT...</h2>
          <div className="scan-bar" style={scanBarStyle}></div>
        </div>
      )}

      {/* 4. RESULT VIEW */}
      {page === "result" && result && (
        <div style={centerContainer}>
          <div style={{ width: '100%', maxWidth: '800px', animation: 'fadeIn 0.5s' }}>
            <h1 style={resultTotalStyle}>
              {result.total_co2} <span style={{ fontSize: '1.5rem' }}>kg CO₂</span>
            </h1>
            
            <div style={resultCardStyle}>
              <h3 style={{ color: '#00ff96', marginBottom: '20px' }}>[ EMISSIONS_LOG ]</h3>
              {result.items.map((item, i) => (
                <div key={i} style={itemRowStyle}>
                  <span>{item.item}</span>
                  <span style={{ color: item.co2 > 2 ? '#ff4444' : '#00ff96' }}>{item.co2} kg</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
              <button onClick={() => setPage("home")} style={secondaryButtonStyle}>NEW_SCAN</button>
              <button onClick={() => setPage("analytics")} style={secondaryButtonStyle}>VIEW_HISTORY</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ANALYTICS VIEW */}
      {page === "analytics" && (
        <div style={{ paddingTop: '100px' }}>
          <Analytics />
        </div>
      )}

    </div>
  );
}

// --- STYLES OBJECTS ---

const navStyle = {
  position: 'fixed', top: 0, width: '100%', display: 'flex', justifyContent: 'center', 
  gap: '40px', padding: '30px', zIndex: 1000, background: 'rgba(2,2,2,0.8)', backdropFilter: 'blur(10px)'
};

const navLinkStyle = (active) => ({
  cursor: 'pointer', color: active ? '#00ff96' : '#444', letterSpacing: '2px', fontWeight: 'bold', transition: '0.3s'
});

const sectionContainer = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 20px'
};

const centerContainer = {
  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'
};

const glassCard = (hover) => ({
  width: '100%', maxWidth: '500px', background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(30px)', borderRadius: '2px', border: hover ? '1px solid #00ff96' : '1px solid rgba(255, 255, 255, 0.1)',
  padding: '50px 40px', textAlign: 'center', transition: '0.4s ease',
  boxShadow: hover ? '0 0 40px rgba(0, 255, 150, 0.1)' : 'none',
});

const titleStyle = { color: 'white', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '30px' };

const fileInputContainer = { marginBottom: '30px' };
const fileTextStyle = { color: '#666', fontSize: '0.7rem', letterSpacing: '2px', display: 'block', marginBottom: '10px' };
const rawInputStyle = { color: '#444', fontSize: '0.7rem', width: '100%', cursor: 'pointer' };

const primaryButtonStyle = (hover, loading) => ({
  background: loading ? '#333' : (hover ? '#00ff96' : 'transparent'),
  color: hover || loading ? 'black' : 'white',
  border: hover ? 'none' : '1px solid white',
  padding: '15px 40px', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '3px',
  cursor: loading ? 'not-allowed' : 'pointer', transition: '0.3s', width: '100%'
});

const resultTotalStyle = { fontSize: '5rem', color: '#00ff96', textAlign: 'center', margin: '0 0 20px 0' };

const resultCardStyle = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid #222', padding: '30px', textAlign: 'left'
};

const itemRowStyle = {
  display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #111', fontSize: '0.9rem'
};

const secondaryButtonStyle = {
  background: 'transparent', border: '1px solid #444', color: 'white', padding: '10px 25px', cursor: 'pointer', letterSpacing: '2px'
};

const scanBarStyle = { height: '2px', background: '#00ff96', width: '200px', marginTop: '20px', boxShadow: '0 0 10px #00ff96' };

export default App;