import axios from 'axios';
import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // TODO: on login, get favorites from db and set here

  const addToFavorites = (artPiece) => {
    setFavorites([...favorites, artPiece]);
    return axios.post(
        'http://localhost:4000/favorite',
        {artworkId: artPiece.id},
        {authorization: window.localStorage.getItem('token')}
    );
  };

  const removeFromFavorites = (artPieceId) => {
    const updatedFavorites = favorites.filter((piece) => piece.id !== artPieceId);
    setFavorites(updatedFavorites);
    return axios.patch(
        'http://localhost:4000/favorite',
        {artworkId: artPieceId},
        {authorization: window.localStorage.getItem('token')}
    );
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