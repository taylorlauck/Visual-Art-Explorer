//ArtDetailsModal.js
import './ArtDetailsModal.css'; // Import the CSS file



const ArtDetailsModal = ({ artPiece, onClose, onFavorite, thumbnailUrl }) => {
 const { id,title, date, dimensions, medium, category, slug, additional_information, } = artPiece;

 const handleFavorite = () => {
  onFavorite({ ...artPiece, id, thumbnailUrl  }); // Trigger the favorite action passed from the parent component
};

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img className="modal-image" src={thumbnailUrl} alt={title} />
        <div className="details">
          <h2>{title}</h2>
          <p>Date: {date}</p>
          <p>Dimensions: {dimensions.in.text} or {dimensions.cm.text}</p>
          <p>Medium: {medium}</p>
          <p>Category: {category}</p>
          <p>Artist: {slug}</p>
          <p>Additional Information: {additional_information}</p>
          <button className="favorite-button" onClick={handleFavorite}>
            Favorite
          </button>
          </div>
      </div>
    </div>
  );
};


export default ArtDetailsModal;


  