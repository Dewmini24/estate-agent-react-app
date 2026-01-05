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

  if (!property) {
    return <h2 style={{ color: "white" }}>Property not found</h2>;
  }

  return (
    <div className="property-page">

      {/* TITLE */}
      <h1 style={{ marginBottom: "20px" }}>
        {property.type} – £{property.price.toLocaleString()}
      </h1>

      {/* IMAGE GALLERY */}
      <div className="gallery">
        <img
          src={property.images[activeImage]}
          alt={property.type}
          className="main-image"
        />

        <div className="thumbnails">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={index === activeImage ? "thumb active" : "thumb"}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
        className={activeTab === "description" ? "tab active" : "tab"}
        onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        
        <button
        className={activeTab === "floorplan" ? "tab active" : "tab"}
        onClick={() => setActiveTab("floorplan")}
        >
          Floor Plan
        </button>
        
        <button
        className={activeTab === "map" ? "tab active" : "tab"}
        onClick={() => setActiveTab("map")}
        >
          Map
        </button>
      </div>


      {/* TAB CONTENT */}
      <div className="tab-content">
        
        {activeTab === "description" && (
          <p>{property.description}</p>
        )}

        {activeTab === "floorplan" && (
          property.floorPlan ? (
            <img
              src={property.floorPlan}
              alt="Floor Plan"
              className="floorplan"
            />
          ) : (
            <p>No floor plan available for this property.</p>
          )
        )}
      
        {activeTab === "map" && (
          <iframe
            title="map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              property.location
            )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="300"
          />
        )}
      </div>

      {/* BACK LINK */}
      <Link
        to="/"
        className="btn-view-details"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        ← Back to Search
      </Link>

    </div>
  );
}

export default PropertyPage;