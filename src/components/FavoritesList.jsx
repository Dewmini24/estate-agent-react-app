import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/FavoritesList.css";

const FavoritesList = ({ favorites, onRemove, onClear }) => {
  const [draggedOver, setDraggedOver] = useState(false);

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOver(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    
    try {
      const propertyData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      // Check if property already exists in favorites
      const exists = favorites.some(fav => fav.id === propertyData.id);
      
      if (!exists) {
        console.log('Property dropped:', propertyData);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  // Handle remove by dragging out
  const handleItemDragStart = (e, property) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('remove-favorite', property.id);
  };

  // Format price
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  return (
    <div 
      className={`favorites-list ${draggedOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="favorites-header">
        <h3>
          <span className="heart-icon">♥</span>
          Favorites ({favorites.length})
        </h3>
        {favorites.length > 0 && (
          <button 
            className="clear-btn" 
            onClick={onClear}
            title="Clear all favorites"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>No favorites yet</p>
          <p className="drag-hint">Drag properties here or click the ☆ button</p>
        </div>
      ) : (
        <ul className="favorites-items">
          {favorites.map(property => (
            <li 
              key={property.id} 
              className="favorite-item"
              draggable="true"
              onDragStart={(e) => handleItemDragStart(e, property)}
            >
              <Link to={`/property/${property.id}`} className="favorite-link">
                <img 
                  src={property.picture} 
                  alt={property.location}
                  className="favorite-thumbnail"
                />
                <div className="favorite-info">
                  <div className="favorite-price">{formatPrice(property.price)}</div>
                  <div className="favorite-meta">
                    {property.bedrooms} bed {property.type}
                  </div>
                  <div className="favorite-location">{property.location}</div>
                </div>
              </Link>
              <button 
                className="remove-btn"
                onClick={() => onRemove(property.id)}
                title="Remove from favorites"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {draggedOver && (
        <div className="drop-indicator">
          Drop here to add to favorites
        </div>
      )}
    </div>
  );
};

export default FavoritesList;