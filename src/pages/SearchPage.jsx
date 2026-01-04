import { useState } from "react";
import propertiesData from "../data/properties.json";
import "../styles/SearchPage.css"; 
import { Link } from "react-router-dom";

function SearchPage() {
  const [typeFilter, setTypeFilter] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [postcode, setPostcode] = useState("");

  const resetFilters = () => {
    setTypeFilter("any");
    setMinPrice("");
    setMaxPrice("");
    setMinBedrooms("");
    setDateAfter("");
    setPostcode("");
  };

  const parsePropertyDate = (added) => {
  const months = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11
  };

  return new Date(added.year, months[added.month], added.day);
};

  const filteredProperties = propertiesData.properties.filter((property) => {
    // Type filter
    if (typeFilter !== "any" && property.type.toLowerCase() !== typeFilter) {
      return false;
    }

    // Min price filter
    if (minPrice && property.price < Number(minPrice)) {
      return false;
    }

    // Max price filter
    if (maxPrice && property.price > Number(maxPrice)) {
      return false;
    }

    // Min bedrooms filter
    if (minBedrooms && property.bedrooms < Number(minBedrooms)) {
      return false;
    }

    // Date added filter (after)
    if (dateAfter) {
        const propertyDate = parsePropertyDate(property.added);
        
        const selectedDate = new Date(dateAfter);
        
        if (propertyDate < selectedDate) {
            return false;
        }
    }
    
    // Postcode area filter
    if (postcode) {
      if (!property.location.toUpperCase().includes(postcode.toUpperCase())) {
        return false;
      }
    }

    return true;
  });

  return (
  <div className="search-page">
    {/* Header */}
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">YOUR HOME</div>
          <span className="logo-text">💕</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link active">For Buyers</a>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <div className="main-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Find a perfect home<br />you'll love
        </h1>
        <p className="hero-subtitle">
          Search thousands of properties for sale, purchase or rental of real estates.
        </p>
      </div>

      {/* Search Filters */}
      <div className="filters-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Property Type</label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-input"
            >
              <option value="any">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Min Price (£)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="e.g. 300000"
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Max Price (£)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 800000"
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Min Bedrooms</label>
            <input
              type="number"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              placeholder="e.g. 2"
              min="0"
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Date Added After</label>
            <input
              type="date"
              value={dateAfter}
              onChange={(e) => setDateAfter(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Postcode Area</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g. BR5"
              className="filter-input postcode-input"
            />
          </div>
        </div>

        <div className="filters-grid">
          <div className="filter-actions full-width">
            <button onClick={resetFilters} className="btn-reset">
              Reset
            </button>
            <button className="btn-search">
              Search Property
            </button>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="results-header">
        <h2 className="results-title">Available Properties</h2>
        <p className="results-count">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="property-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image-wrapper">
                <img
                  src={property.picture}
                  alt={property.type}
                  className="property-image"
                />
                <div className="property-badge">
                  {property.type}
                </div>
              </div>
              
              <div className="property-content">
                <div className="property-price">
                  £{property.price.toLocaleString()}
                </div>
                
                <div className="property-details">
                  <div className="property-detail">
                    <span>🛏️ {property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="property-detail">
                    <span>📍 {property.location}</span>
                  </div>
                </div>

                <Link
                to={`/property/${property.id}`}
                className="btn-view-details"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3 className="empty-title">No properties found</h3>
          <p className="empty-text">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  </div>
);

}

export default SearchPage;