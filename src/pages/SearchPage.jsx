import { useState } from "react";
import propertiesData from "../data/properties.json";

function SearchPage() {
  const [typeFilter, setTypeFilter] = useState("any");

  const filteredProperties = propertiesData.properties.filter((property) => {
    if (typeFilter === "any") return true;
    return property.type.toLowerCase() === typeFilter;
  });

  return (
    <div>
      <h2>Search Properties</h2>

      {/* Property Type Filter */}
      <label>
        Property Type:&nbsp;
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="any">Any</option>
          <option value="house">House</option>
          <option value="flat">Flat</option>
        </select>
      </label>

      <hr />

      {filteredProperties.map((property) => (
        <div
          key={property.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <img
            src={property.picture}
            alt={property.type}
            style={{ width: "200px" }}
          />
          <h3>{property.type}</h3>
          <p>£{property.price}</p>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.location}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;