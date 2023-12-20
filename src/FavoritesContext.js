import axios from 'axios';
import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // TODO: on login, get favorites from db and set here

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:4000/favorites', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      setFavorites(response.data.favorites); // Assuming your response contains an array of favorites
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const addToFavorites = async (artPiece) => {
    try {
      setFavorites([...favorites, artPiece]);
      await axios.post(
        'http://localhost:4000/favorite',
        { artworkId: artPiece.id },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (artPieceId) => {
    try {
      const updatedFavorites = favorites.filter((piece) => piece.id !== artPieceId);
      setFavorites(updatedFavorites);
      await axios.delete(`http://localhost:4000/favorite/${artPieceId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;


