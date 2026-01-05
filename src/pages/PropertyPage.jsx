import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "../styles/PropertyPage.css";

function PropertyPage() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Extract postcode from location
  const extractPostcode = (location) => {
    if (!location) return "N/A";
    const match = location.match(/\b[A-Z]{1,2}[0-9]{1,2}[A-Z]?\b/);
    return match ? match[0] : "N/A";
  };

  if (!property) {
    return (
      <div className="property-page">
        <h2>Property not found</h2>
        <Link to="/" className="back-link">← Back to Search</Link>
      </div>
    );
  }

  const images = property.images || [];

  return (
    <div className="property-page">

      {/* HEADER */}
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
            <div className="detail-value">
              {extractPostcode(property.location)}
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE GALLERY */}
      {images.length > 0 && (
        <div className="gallery">
          <img
            src={`/${images[activeImage]}`}
            alt={`${property.type} image`}
            className="main-image"
          />

          <div className="thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={`/${img}`}
                alt={`Thumbnail ${index + 1}`}
                className={`thumb ${index === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* TABS */}
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
            <p>{property.description}</p>
          )}

          {activeTab === "floorplan" && property.floorPlan && (
            <img
              src={`/${property.floorPlan}`}
              alt="Floor Plan"
              className="floorplan-image"
            />
          )}

          {activeTab === "map" && (
            <div className="map-container">
              <iframe
                title="Property Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.location
                )}&output=embed`}
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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