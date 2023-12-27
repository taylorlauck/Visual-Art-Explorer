//FavoritesPage.js
import React, { useContext, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';
//<p>Artwork ID: {favorite.artworkid}</p> {/* Display Artwork ID */}
const FavoritesPage = () => {
  const { favorites, removeFromFavorites, fetchFavorites } = useContext(FavoritesContext);

  const handleUnfavorite = (artworkid) => {
    removeFromFavorites(artworkid); // Remove art from favorites using context action
  };

  useEffect(() => {
    fetchFavorites(); // Fetch favorites when the component mounts
  }, []); // Empty dependency array to execute once

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-container">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <div className="favorite-details">
                <p>{favorite.title}</p>
                <p> {favorite.slug}</p>
                {favorite.image_url && (
                  <img src={favorite.thumbnailUrl} alt={favorite.title} /> // Displaying the image
                )}
                {/* Assuming you have a button to unfavorite */}
                <button onClick={() => handleUnfavorite(favorite.artworkid)}>Unfavorite</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
