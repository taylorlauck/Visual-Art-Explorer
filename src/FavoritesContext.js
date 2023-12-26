import axios from 'axios';



import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

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
      setFavorites([...favorites, artPiece, ]);
      await axios.post(
        'http://localhost:4000/favorite',
        { artworkId: artPiece.id,  slug: artPiece.slug, }, // Include artworkId, slug, and thumbnailUrl (image)
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



  const removeFromFavorites = async (artworkid) => {
    try {
      await axios.delete(`http://localhost:4000/favorites/${artworkid}`, {
      headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        data: { artworkid }, // Send artworkId in the request body
    });
      // Other logic after successful deletion
      //setFavorites((prevFavorites) =>
       // prevFavorites.filter((favorite) => favorite.artPiece !== artPiece)
     // );
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  
  
  
  
  


  useEffect(() => {
    fetchFavorites();
  }, []); // Fetch favorites when the component mounts

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