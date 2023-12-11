import React, { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';

const FavoritesPage  = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext); // Access favorites from context

  const handleUnfavorite = (artPieceId) => {
    removeFromFavorites(artPieceId); // Call removeFromFavorites function
  };

  
  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-container">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <img src={favorite._links.thumbnail.href} alt={favorite.title} />
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



