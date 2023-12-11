import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (artPiece) => {
    setFavorites([...favorites, artPiece]);
  };

  const removeFromFavorites = (artPieceId) => {
    const updatedFavorites = favorites.filter((piece) => piece.id !== artPieceId);
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;


