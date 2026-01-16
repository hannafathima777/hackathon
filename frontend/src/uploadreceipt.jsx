import React, { useState } from "react";
import { uploadReceipt, getEmissionResults } from "./services/api";

export default function UploadReceipt({ setResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setLoading(true);
    try {
      await uploadReceipt(file);
      const results = await getEmissionResults();
      setResults(results);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const styles = {
    sectionContainer: {
      minHeight: '100vh',
      width: '100vw',
      background: '#020202', // Matches Hero background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    glassCard: {
      width: '100%',
      maxWidth: '500px',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRadius: '2px', // Sharp industrial look to match Hero
      border: isHovered ? '1px solid #00ff96' : '1px solid rgba(255, 255, 255, 0.1)',
      padding: '50px 40px',
      textAlign: 'center',
      transition: '0.4s ease',
      boxShadow: isHovered ? '0 0 40px rgba(0, 255, 150, 0.1)' : 'none',
    },
    title: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '900',
      letterSpacing: '5px',
      textTransform: 'uppercase',
      marginBottom: '30px',
    },
    fileInputContainer: {
      marginBottom: '30px',
      position: 'relative',
    },
    // Custom style for the file input text
    fileText: {
      color: '#666',
      fontSize: '0.8rem',
      letterSpacing: '2px',
      display: 'block',
      marginBottom: '10px',
    },
    button: {
      background: loading ? '#333' : (isHovered ? '#00ff96' : 'transparent'),
      color: isHovered || loading ? 'black' : 'white',
      border: isHovered ? 'none' : '1px solid white',
      padding: '15px 40px',
      fontSize: '0.8rem',
      fontWeight: '900',
      letterSpacing: '3px',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: '0.3s',
      width: '100%',
      textTransform: 'uppercase',
    }
  };

  return (
    <div style={styles.sectionContainer}>
      <div 
        style={styles.glassCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 style={styles.title}>Carbon emmission tracking</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.fileInputContainer}>
            <span style={styles.fileText}>
              {file ? `FILE: ${file.name.toUpperCase()}` : "SELECT RECEIPT SOURCE"}
            </span>
            <input
              type="file"
              accept=".jpg,.png,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                color: '#888',
                fontSize: '0.7rem',
                width: '100%',
                cursor: 'pointer'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={styles.button}
          >
            {loading ? "PROCESSING..." : "RUN ANALYSIS"}
          </button>
        </form>

        {/* Subtle decorative versioning */}
        <div style={{marginTop: '40px', color: '#222', fontSize: '0.6rem', letterSpacing: '3px'}}>
          ENCRYPTED UPLOAD SECURE // MODULE 02
        </div>
      </div>
    </div>
  );
}