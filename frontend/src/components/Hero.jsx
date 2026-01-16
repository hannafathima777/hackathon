import React, { useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    // Force perfect center and prevent any shifting
    heroContainer: {
      height: '100vh',
      width: '100vw',
      background: '#020202',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: '"Inter", sans-serif',
    },
    // Floating Side Element Left
    sideGlowLeft: {
      position: 'absolute',
      left: '10%',
      top: '50%',
      width: '2px',
      height: '300px',
      background: 'linear-gradient(to bottom, transparent, #00ff96, transparent)',
      boxShadow: '0 0 20px #00ff96',
      opacity: isHovered ? 0.8 : 0.2,
      transition: '0.8s',
    },
    // Floating Side Element Right
    sideGlowRight: {
      position: 'absolute',
      right: '10%',
      top: '50%',
      width: '2px',
      height: '300px',
      background: 'linear-gradient(to bottom, transparent, #00ff96, transparent)',
      boxShadow: '0 0 20px #00ff96',
      opacity: isHovered ? 0.8 : 0.2,
      transition: '0.8s',
    },
    // The "Cool Stuff": Rotating Glass Squares in background
    bgSquare: (top, left, delay) => ({
      position: 'absolute',
      top: top,
      left: left,
      width: '60px',
      height: '60px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(255,255,255,0.02)',
      backdropFilter: 'blur(5px)',
      transform: 'rotate(45deg)',
      animation: `float 6s ease-in-out infinite alternate ${delay}`,
      zIndex: 0,
    }),
    title: {
      fontSize: 'clamp(3rem, 10vw, 7rem)', // Responsive size
      fontWeight: '900',
      color: 'white',
      margin: 0,
      letterSpacing: '20px',
      zIndex: 2,
      textAlign: 'center',
      textShadow: isHovered ? '0 0 30px rgba(0,255,150,0.6)' : '0 0 10px rgba(255,255,255,0.1)',
      transition: 'all 0.5s ease',
    },
    glassCard: {
      marginTop: '30px',
      padding: '40px 60px',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(25px)',
      borderRadius: '2px', // Sharp industrial look
      border: isHovered ? '1px solid #00ff96' : '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: '0.4s',
      boxShadow: isHovered ? 'inset 0 0 20px rgba(0,255,150,0.1)' : 'none',
      zIndex: 2,
    },
    btn: {
      background: isHovered ? '#00ff96' : 'transparent',
      color: isHovered ? 'black' : 'white',
      border: isHovered ? 'none' : '1px solid white',
      padding: '15px 40px',
      fontSize: '0.8rem',
      fontWeight: '900',
      letterSpacing: '3px',
      cursor: 'pointer',
      transition: '0.3s',
      marginTop: '20px',
    }
  };

  return (
    <div style={styles.heroContainer}>
      {/* Background Style Tag for the floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: rotate(45deg) translateY(0px); }
          100% { transform: rotate(60deg) translateY(-40px); }
        }
      `}</style>

      {/* Side Decorative Elements */}
      <div style={styles.sideGlowLeft}></div>
      <div style={styles.sideGlowRight}></div>
      <div style={styles.bgSquare('20%', '15%', '0s')}></div>
      <div style={styles.bgSquare('70%', '80%', '1s')}></div>
      <div style={styles.bgSquare('15%', '85%', '2s')}></div>

      <h1 style={styles.title}>BOYCO2</h1>
      
      <div 
        style={styles.glassCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p style={{color: '#666', fontSize: '0.7rem', letterSpacing: '5px', marginBottom: '20px'}}>
          ESTIMATION MODULE V.1.0
        </p>
        
        <button 
          style={styles.btn}
          onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
        >
          {isHovered ? 'INITIALIZE ANALYSIS' : 'PROCEED'}
        </button>
      </div>

      {/* Subtle bottom indicator */}
      <div style={{position: 'absolute', bottom: '40px', color: '#333', fontSize: '0.7rem', letterSpacing: '2px'}}>
        SCROLL TO DECODE DATA
      </div>
    </div>
  );
};

export default Hero;