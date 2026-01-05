import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "../styles/PropertyPage.css";

function PropertyPage() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    p => p.id === id
  );

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Extract postcode from location (e.g., "High Street, Orpington BR6" -> "BR6")
  const extractPostcode = (location) => {
    if (!location) return 'N/A';
    const match = location.match(/\b[A-Z]{1,2}[0-9]{1,2}[A-Z]?\b/);
    return match ? match[0] : 'N/A';
  };

  if (!property) {
    return (
      <div className="property-page">
        <h2>Property not found</h2>
        <Link to="/" className="back-link">
          ← Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="property-page">
      
      {/* HEADER SECTION */}
      <div className="property-header">
        <h1>
          {property.type} – £{property.price.toLocaleString()}
        </h1>
        <p className="property-location">{property.location}</p>
        
        <div className="property-details">
          <div className="detail-item">
            <div className="detail-label">Bedrooms</div>
            <div className="detail-value">{property.bedrooms}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Type</div>
            <div className="detail-value">{property.type}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Postcode</div>
            <div className="detail-value">{extractPostcode(property.location)}</div>
          </div>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div className="gallery">
        <img
          src={`${import.meta.env.BASE_URL}${property.images?.[activeImage] || property.picture}`}
          alt={`${property.type} - Image ${activeImage + 1}`}
          className="main-image"
        />
        
        {property.images && property.images.length > 1 && (
          <div className="thumbnails">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`Thumbnail ${index + 1}`}
                className={`thumb ${index === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
              />

            ))}
          </div>
        )}
      </div>

      {/* TABS SECTION */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            📝 Description
          </button>
          
          <button
            className={`tab ${activeTab === "floorplan" ? "active" : ""}`}
            onClick={() => setActiveTab("floorplan")}
          >
            📐 Floor Plan
          </button>
          
          <button
            className={`tab ${activeTab === "map" ? "active" : ""}`}
            onClick={() => setActiveTab("map")}
          >
            🗺️ Map
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <p>{property.description || "No description available for this property."}</p>
          )}

          {activeTab === "floorplan" && (
            property.floorPlan ? (
              <img
                src={`${import.meta.env.BASE_URL}${property.floorPlan}`}
                alt="Floor Plan"
              />
            ) : (
              <p>Floor plan not available for this property.</p>
            )
          )}

          {activeTab === "map" && (
            <iframe
              title={`Map of ${property.location}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
              width="100%"
              height="400"
            />
          )}
        </div>
      </div>

      <Link to="/" className="back-link">
        ← Back to Search
      </Link>

    </div>
  );
}

export default PropertyPage;