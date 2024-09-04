import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import socket from '../socket'; 

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
          console.error('Error fetching lyrics and chords:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLyricsAndChords();
  }, [fileName]);

  useEffect(() => {
    let intervalId;
    if (scrolling && containerRef.current) {
      intervalId = setInterval(() => {
        containerRef.current.scrollTop += 1;
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [scrolling]);

  useEffect(() => {
    const handleAdminQuit = () => {
      console.log("Admin quit detected");
      if (role === 'admin') {
        navigate('/adminMain', { state: { role, instrument } });
      } else {
        navigate('/playerMain', { state: { role, instrument } });
      }
    };

    socket.on('adminQuit', handleAdminQuit);

    return () => {
      socket.off('adminQuit', handleAdminQuit);
    };
  }, [navigate, role, instrument]);

  const handleScrollToggle = () => {
    setScrolling(!scrolling);
  };

  const handleQuit = () => {
    socket.emit('adminQuit');
    console.log("Sent adminQuit event");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: '1rem',
        fontFamily: 'Arial, sans-serif',
        direction: textDirection,
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '1.5rem',
        textAlign: 'center',
        overflowY: 'scroll',
        height: '100vh',
        width: '100%',
      }}
      ref={containerRef}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', wordWrap: 'break-word' }}>
        {songName || 'Unknown Title'} - {artist || 'Unknown Artist'}
      </h2>
      {lyricsAndChords.length > 0 ? (
        <div style={{ textAlign: 'center', width: '100%' }}>
          {lyricsAndChords.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              style={{
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexWrap: 'wrap', 
                width: '100%',
              }}
            >
              {section.map((word, wordIndex) => (
                <div
                  key={wordIndex}
                  style={{
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    width: 'auto', 
                    maxWidth: '100%', 
                  }}
                >
                  {word.chords && instrument !== 'Vocals' && (
                    <div style={{ color: 'blue', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
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
      <div style={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>
        <button
          onClick={handleScrollToggle}
          style={{
            padding: '0.8rem',
            fontSize: '1rem',
          }}
        >
          {scrolling ? 'Stop Scrolling' : 'Start Scrolling'}
        </button>
      </div>
      {role === 'admin' && (
        <div style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
          <button
            onClick={handleQuit}
            style={{
              padding: '0.8rem',
              fontSize: '1rem',
            }}
          >
            Quit
          </button>
        </div>
      )}
    </div>
  );
};

export default LivePage;
