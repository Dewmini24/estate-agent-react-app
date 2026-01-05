import React, { useState, useMemo } from 'react';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import FavoritesList from '../components/FavoritesList';
import "../styles/SearchPage.css";

const SearchPage = () => {
  // Search criteria state
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    dateBefore: '',
    postcode: ''
  });

  // Favorites state
  const [favorites, setFavorites] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [removeZoneActive, setRemoveZoneActive] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Parse date from property format
  const parsePropertyDate = (dateObj) => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    return new Date(dateObj.year, monthMap[dateObj.month], dateObj.day);
  };

  // Search logic
  const filteredProperties = useMemo(() => {
    return propertiesData.properties.filter(property => {
      if (searchCriteria.type !== 'any' && 
          property.type.toLowerCase() !== searchCriteria.type.toLowerCase()) {
        return false;
      }

      if (searchCriteria.minPrice && property.price < Number(searchCriteria.minPrice)) {
        return false;
      }
      if (searchCriteria.maxPrice && property.price > Number(searchCriteria.maxPrice)) {
        return false;
      }

      if (searchCriteria.minBedrooms && property.bedrooms < Number(searchCriteria.minBedrooms)) {
        return false;
      }
      if (searchCriteria.maxBedrooms && property.bedrooms > Number(searchCriteria.maxBedrooms)) {
        return false;
      }

      const propertyDate = parsePropertyDate(property.added);
      if (searchCriteria.dateAfter) {
        const afterDate = new Date(searchCriteria.dateAfter);
        if (propertyDate < afterDate) return false;
      }
      if (searchCriteria.dateBefore) {
        const beforeDate = new Date(searchCriteria.dateBefore);
        if (propertyDate > beforeDate) return false;
      }

      if (searchCriteria.postcode) {
        const postcodePrefix = property.location.match(/[A-Z]+\d+/i)?.[0] || '';
        if (!postcodePrefix.toLowerCase().includes(searchCriteria.postcode.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchCriteria]);

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  // Reset search
  const handleReset = () => {
    setSearchCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAfter: '',
      dateBefore: '',
      postcode: ''
    });
    setSearchPerformed(false);
  };

  // Add to favorites
  const addToFavorites = (property) => {
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Handle drag over main content area (remove zone)
  const handleMainDragOver = (e) => {
    const hasFavoriteData = e.dataTransfer.types.includes('remove-favorite');
    if (hasFavoriteData) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setRemoveZoneActive(true);
    }
  };

  // Handle drag leave main content area
  const handleMainDragLeave = () => {
    setRemoveZoneActive(false);
  };

  // Handle drop on main content area (remove from favorites)
  const handleMainDrop = (e) => {
    e.preventDefault();
    setRemoveZoneActive(false);
    
    const propertyId = e.dataTransfer.getData('remove-favorite');
    if (propertyId) {
      removeFromFavorites(propertyId);
    }
  };

  return (
    <div className="search-page">
      <header className="page-header">
        <h1>Find Your Dream Property</h1>
        <p>Search from our collection of premium properties</p>
      </header>

      <div className="search-container">
        <aside className="favorites-sidebar">
          <FavoritesList 
            favorites={favorites}
            onRemove={removeFromFavorites}
            onClear={clearFavorites}
            onAddToFavorites={addToFavorites}
          />
        </aside>

        <main 
          className={`main-content ${removeZoneActive ? 'remove-zone-active' : ''}`}
          onDragOver={handleMainDragOver}
          onDragLeave={handleMainDragLeave}
          onDrop={handleMainDrop}
        >
          {removeZoneActive && (
            <div className="remove-zone-indicator">
              <div className="remove-zone-content">
                <span className="remove-icon">🗑️</span>
                <span>Drop here to remove from favorites</span>
              </div>
            </div>
          )}

          <form className="search-form" onSubmit={handleSearch}>
            <h2>Search Properties</h2>
            
            <div className="form-grid">
              {/* Property Type */}
              <div className="form-group">
                <label htmlFor="type">Property Type</label>
                <select
                  id="type"
                  name="type"
                  value={searchCriteria.type}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="any">Any</option>
                  <option value="house">House</option>
                  <option value="flat">Flat</option>
                </select>
              </div>

              {/* Min Price */}
              <div className="form-group">
                <label htmlFor="minPrice">Min Price (£)</label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={searchCriteria.minPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 250000"
                  className="form-control"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Max Price */}
              <div className="form-group">
                <label htmlFor="maxPrice">Max Price (£)</label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={searchCriteria.maxPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 500000"
                  className="form-control"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Min Bedrooms */}
              <div className="form-group">
                <label htmlFor="minBedrooms">Min Bedrooms</label>
                <input
                  type="number"
                  id="minBedrooms"
                  name="minBedrooms"
                  value={searchCriteria.minBedrooms}
                  onChange={handleInputChange}
                  placeholder="e.g., 2"
                  className="form-control"
                  min="0"
                  max="10"
                />
              </div>

              {/* Max Bedrooms */}
              <div className="form-group">
                <label htmlFor="maxBedrooms">Max Bedrooms</label>
                <input
                  type="number"
                  id="maxBedrooms"
                  name="maxBedrooms"
                  value={searchCriteria.maxBedrooms}
                  onChange={handleInputChange}
                  placeholder="e.g., 4"
                  className="form-control"
                  min="0"
                  max="10"
                />
              </div>

              {/* Date After */}
              <div className="form-group">
                <label htmlFor="dateAfter">Date Added After</label>
                <input
                  type="date"
                  id="dateAfter"
                  name="dateAfter"
                  value={searchCriteria.dateAfter}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              {/* Date Before */}
              <div className="form-group">
                <label htmlFor="dateBefore">Date Added Before</label>
                <input
                  type="date"
                  id="dateBefore"
                  name="dateBefore"
                  value={searchCriteria.dateBefore}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              {/* Postcode */}
              <div className="form-group">
                <label htmlFor="postcode">Postcode Area</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={searchCriteria.postcode}
                  onChange={handleInputChange}
                  placeholder="e.g., BR1, BR2"
                  className="form-control"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                Search Properties
              </button>
              <button type="button" onClick={handleReset} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>

          {/* Results Section */}
          <section className="results-section">
            <div className="results-header">
              <h2>
                {searchPerformed 
                  ? `Found ${filteredProperties.length} ${filteredProperties.length === 1 ? 'Property' : 'Properties'}`
                  : 'All Properties'}
              </h2>
            </div>

            <div className="properties-grid">
              {(searchPerformed ? filteredProperties : propertiesData.properties).map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onAddToFavorites={addToFavorites}
                  isFavorite={favorites.some(fav => fav.id === property.id)}
                />
              ))}
            </div>

            {searchPerformed && filteredProperties.length === 0 && (
              <div className="no-results">
                <p>No properties found matching your criteria.</p>
                <p>Try adjusting your search filters.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;