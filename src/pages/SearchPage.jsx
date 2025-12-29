import propertiesData from "../data/properties.json";

function SearchPage() {
  return (
    <div>
      <h2>Available Properties</h2>

      {propertiesData.properties.map((property) => (
        <div key={property.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
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