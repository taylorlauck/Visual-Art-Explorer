//FavoritesPage.js

import React, { useContext, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, fetchFavorites } = useContext(FavoritesContext);

  const handleUnfavorite = (artPieceId) => {
    removeFromFavorites(artPieceId);
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);//fetchFavorites

  // Limit favorites to the first 20 items
  const limitedFavorites = favorites.slice(0, 20);

  return (
    <div>
      <h1>Favorites</h1>
      {limitedFavorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-container">
          {limitedFavorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <div className="favorite-details">
                <h2>{favorite.title}</h2>
                <p>Artist: {favorite.slug}</p>
                {/* Add other details you want to display */}
                <button onClick={() => handleUnfavorite(favorite.id)}>Unfavorite</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;



