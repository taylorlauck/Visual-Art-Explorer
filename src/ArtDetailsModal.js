import React from 'react';
import './ArtDetailsModal.css'; // Import the CSS file

const ArtDetailsModal = ({ artPiece, onClose,thumbnailUrl }) => {
  if (!artPiece) {
    return null;
  }

  const { title, date, dimensions, medium, category, slug, additional_information } = artPiece;
  
  //const urlRegex = /(https?:\/\/[^\s]+)/g;
  //const urls = additional_information.match(urlRegex);
  //console.log(additional_information); 
  
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img className="modal-image" src={thumbnailUrl} alt={title} /> {/* Display the thumbnail */}
        <div className="details">
          <h2>{title}</h2>
          <p>Date: {date}</p>
          <p>Dimensions: {dimensions.in.text} or {dimensions.cm.text}</p>
          <p>Medium: {medium}</p>
          <p>Category: {category}</p>
          <p>Artist: {slug}</p>
          <p>Additional Information: {additional_information}</p>
         </div>
      </div>
    </div>
  );
};

export default ArtDetailsModal;


  



