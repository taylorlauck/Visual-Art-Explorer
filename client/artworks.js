//Artworks.js
import React, { useState, useEffect, useContext } from 'react';
import './styles.css';
import ArtDetailsModal from './ArtDetailsModal';

//import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from './FavoritesContext';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  //const navigate = useNavigate(); // Initialize useNavigate
  const { addToFavorites } = useContext(FavoritesContext); // Access favorites context action
 const {removeFromFavorites} = useContext(FavoritesContext);
 


   useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

        const tokenResponse = await fetch('https://api.artsy.net/api/tokens/xapp_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to authenticate.');
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.token;

        const artResponse = await fetch('https://api.artsy.net/api/artworks?size=200', {
          headers: {
            'X-Xapp-Token': token,
          },
        });

        if (!artResponse.ok) {
          throw new Error('Failed to fetch artwork data.');
        }

        const data = await artResponse.json();
        const uniqueArtworks = data._embedded.artworks.reduce((unique, artwork) => {
          return unique.some((a) => a.id === artwork.id) ? unique : [...unique, artwork];
        }, []);

        setArtworks(uniqueArtworks);
      } catch (error) {
        console.error('Error fetching art data:', error);
      }
    };

    fetchData();
  }, []);

  const showArtDetails = (artwork) => {
    console.log('Selected Artwork:', artwork);
    setSelectedArtwork(artwork);
  };

  const closeArtDetails = () => {
    setSelectedArtwork(null);
  };
  
  const handleFavorite = (artPiece) => {
    addToFavorites(artPiece); // Add art to favorites using context action
  };

const handleUnfavorite = (artworkId) => {
 // Extract the artwork ID
  removeFromFavorites(artworkId);
  // Other logic
};

  return (
    <div className="Artworks">
      <div>
      <div className="box">
        <h1>Welcome to The Gallery! Click on some art to find out more about it!</h1>
        </div>
        <div className="art-container-horizontal">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="art-piece-horizontal" onClick={() => showArtDetails(artwork)}>
              <img src={artwork._links.thumbnail.href} alt={artwork.title} />
              <p>{artwork.title}</p>
             
            
            </div>
          ))}
        </div>
      </div>

      {selectedArtwork && (
        <ArtDetailsModal
          artPiece={selectedArtwork}
          onClose={closeArtDetails}
          thumbnailUrl={selectedArtwork._links.thumbnail.href} // Pass the thumbnail URL as a prop
          onFavorite={handleFavorite} // Pass the handleFavorite function
          removeFromFavorites={handleUnfavorite}
        />
      )}
    </div>
  );
};

export default Artworks;