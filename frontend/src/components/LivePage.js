import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Function to check if a string contains Hebrew characters
const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

const LivePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lyricsAndChords, setLyricsAndChords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textDirection, setTextDirection] = useState('ltr');
  const [scrolling, setScrolling] = useState(false);
  const containerRef = useRef(null);

  const { fileName, songName, artist, role, instrument } = location.state || {};
  console.log("fileName: ", fileName);
  console.log("songName: ", songName);
  console.log("artist: ", artist);
  console.log("role: ", role);
  console.log("instrument: ", instrument);

  useEffect(() => {
    const fetchLyricsAndChords = async () => {
      if (fileName) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/songs/songs/${fileName}/lyrics`);
          const lyricsData = response.data;

          if (lyricsData.length > 0 && lyricsData[0].length > 0) {
            const firstLine = lyricsData[0][0].lyrics;
            setTextDirection(isHebrew(firstLine) ? 'rtl' : 'ltr');
          }

          setLyricsAndChords(lyricsData);
        } catch (error) {
          console.error('Error fetching lyrics and chords!:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLyricsAndChords();
  }, [fileName]);

  // Auto-scrolling effect
  useEffect(() => {
    let intervalId;
    if (scrolling && containerRef.current) {
      intervalId = setInterval(() => {
        containerRef.current.scrollTop += 1; // Adjust scroll speed as needed
      }, 50); // Adjust interval for scrolling speed
    }
    return () => clearInterval(intervalId);
  }, [scrolling]);

  const handleScrollToggle = () => {
    setScrolling(!scrolling);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        direction: textDirection,
        backgroundColor: '#000', // High contrast background
        color: '#fff', // High contrast text color
        fontSize: '1.5em', // Large font size
        textAlign: 'center',
        overflowY: 'scroll', // Use the default scrollbar
        height: '100vh' // Ensure it uses the full height of the viewport
      }}
      ref={containerRef}
    >
      <h2>{songName || 'Unknown Title'} - {artist || 'Unknown Artist'}</h2>
      {lyricsAndChords.length > 0 ? (
        <div style={{ textAlign: 'center'}}>
          {lyricsAndChords.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              {section.map((word, wordIndex) => (
                <div
                  key={wordIndex}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word'
                  }}
                > 
                  {word.chords && instrument !== 'Vocals' && (
                    <div style={{ color: 'blue', fontSize: '1.2em', marginBottom: '5px' }}>
                      {word.chords}
                    </div>
                  )}
                  <p style={{ margin: 0 }}>{word.lyrics}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No lyrics and chords available.</p>
      )}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button
          onClick={handleScrollToggle}
          style={{ padding: '10px', fontSize: '1em' }}
        >
          {scrolling ? 'Stop Scrolling' : 'Start Scrolling'}
        </button>
      </div>
      {role === 'admin' && (
        <div style={{ position: 'fixed', top: '20px', right: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '10px', fontSize: '1em' }}
          >
            Quit
          </button>
        </div>
      )}
    </div>
  );
};

export default LivePage;
