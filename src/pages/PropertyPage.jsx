import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "../styles/PropertyPage.css";

function PropertyPage() {
  const { id } = useParams();

  // 🔥 FIX: ensure correct matching
  const property = propertiesData.properties.find(
    p => p.id.toString() === id
  );

  const [activeTab, setActiveTab] = useState("description");

  if (!property) {
    return <h2 style={{ color: "white" }}>Property not found</h2>;
  }

  return (
    <div className="property-page">

      {/* DEBUG CONFIRMATION */}
      <h1 style={{ marginBottom: "20px" }}>
        {property.type} – £{property.price.toLocaleString()}
      </h1>

      {/* IMAGE (simple version – SAFE) */}
      <img
        src={property.picture}
        alt="Property"
        className="main-image"
      />

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "description" ? "tab active" : "tab"}
          onClick={() => setActiveTab("description")}
        >
          Description
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
          <p>{property.description || "No description available."}</p>
        )}

        {activeTab === "map" && (
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=London&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
          />
        )}
      </div>

      <Link to="/" className="btn-view-details" style={{ marginTop: "20px", display: "inline-block" }}>
        ← Back to Search
      </Link>

    </div>
  );
}

export default PropertyPage;