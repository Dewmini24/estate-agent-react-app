import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/PropertyCard.css";

const PropertyCard = ({ property, onAddToFavorites, isFavorite, onDragStart }) => {
  // Format price with commas
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Handle drag start
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(property));
    if (onDragStart) {
      onDragStart(property);
    }
  };

  // Handle favorite button click
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFavorite) {
      onAddToFavorites(property);
    }
  };

  return (
    <div 
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="property-image-container">
        <Link to={`/property/${property.id}`}>
          <img 
            src={property.picture} 
            alt={property.location}
            className="property-image"
          />
        </Link>
        <button 
          className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Already in favorites' : 'Add to favorites'}
          disabled={isFavorite}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="property-details">
        <div className="property-price">{formatPrice(property.price)}</div>
        
        <div className="property-meta">
          <span className="property-type">{property.type}</span>
          <span className="property-bedrooms">{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          <span className="property-tenure">{property.tenure}</span>
        </div>

        <div className="property-location">
          <span className="location-icon">📍</span>
          {property.location}
        </div>

        <p className="property-description">
          {property.description.length > 150 
            ? `${property.description.substring(0, 150)}...` 
            : property.description}
        </p>

        <div className="property-footer">
          <span className="date-added">
            Added: {property.added.month} {property.added.day}, {property.added.year}
          </span>
          <Link to={`/property/${property.id}`} className="view-details-btn">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;