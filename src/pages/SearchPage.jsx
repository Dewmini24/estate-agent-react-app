import { useState } from "react";
import propertiesData from "../data/properties.json";

function SearchPage() {
  const [typeFilter, setTypeFilter] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [dateAfter, setDateAfter] = useState("");

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

    return true;
  });

  return (
    <div>
      <h2>Available Properties</h2>

      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Property Type:&nbsp;
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </label>

        &nbsp;&nbsp;&nbsp;

        <label>
          Min Price (£):&nbsp;
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 300000"
          />
        </label>

        &nbsp;&nbsp;&nbsp;

        <label>
          Max Price (£):&nbsp;
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 800000"
          />
        </label>

        &nbsp;&nbsp;&nbsp;

        <label>
          Min Bedrooms:&nbsp;
          <input
            type="number"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
            placeholder="e.g. 2"
            min="0"
          />
        </label>

        &nbsp;&nbsp;&nbsp;

        <label>
            Date Added After:&nbsp;
            <input
            type="date"
            value={dateAfter}
            onChange={(e) => setDateAfter(e.target.value)}
            />
        </label>

      </div>

      {/* Property list */}
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
          <p>£{property.price.toLocaleString()}</p>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.location}</p>
        </div>
      ))}

      {filteredProperties.length === 0 && (
        <p>No properties match your criteria.</p>
      )}
    </div>
  );
}

export default SearchPage;