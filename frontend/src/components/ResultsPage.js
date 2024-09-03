import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DisconnectButton from './DisconnectButton'; 
import socket from '../socket';



const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, role, instrument } = location.state || { results: [], userRole: '', instrument: '' };

  const handleSelect = async (song) => {
    const { fileName, songName, artist } = song;
    socket.emit('song-selected', { fileName, songName, artist });
    navigate('/live', { state: { fileName, songName, artist, role, instrument } });
  };

  const handleBackToAdminMain = () => {
    navigate('/adminMain', { state: { role, instrument } });
  };

  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button 
        onClick={handleBackToAdminMain} 
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Search Again
      </button>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <table style={{ width: '70%', margin: 'auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Song Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Artist</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{result.songName}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{result.artist || 'Unknown'}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {result.image ? (
                    <img src={result.image} alt={result.songName} style={{ width: '100px', height: 'auto' }} />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  <button onClick={() => handleSelect(result)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No results found.</div>
      )}
      <DisconnectButton /> 
    </div>
  );
};

export default Results;