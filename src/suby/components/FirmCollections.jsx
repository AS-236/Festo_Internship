import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchFirmData = async () => {
      try {
        const response = await fetch(`${API_URL}/vendor/all-vendors`);
        const newFirmData = await response.json();
        setFirmData(newFirmData.vendors);
      } catch (error) {
        console.error("Failed to fetch firm data", error);
      }
    };
    fetchFirmData();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ marginBottom: "20px", fontSize: "22px", color: "#333" }}>
        Restaurants with Online Food Delivery
      </h3>
      <div style={{ marginBottom: "20px" }}>
        {["All", "South-Indian", "North-Indian", "Chinese", "Bakery"].map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedRegion(category);
              setActiveCategory(category.toLowerCase());
            }}
            style={{
              padding: "10px 15px",
              margin: "5px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: activeCategory === category.toLowerCase() ? "#ff5722" : "#ddd",
              color: activeCategory === category.toLowerCase() ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
          padding: "10px",
        }}
      >
        {firmData.map((vendor) =>
          vendor.firm.map((item) =>
            selectedRegion === "All" || item.region.includes(selectedRegion.toLowerCase()) ? (
              <Link
                to={`/products/${item._id}/${item.firmName}`}
                key={item._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.firmName}
                    style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px" }}
                  />
                  <div style={{ marginTop: "10px", fontWeight: "bold" }}>{item.firmName}</div>
                  <div style={{ fontSize: "12px", color: "#555" }}>{item.region.join(", ")}</div>
                  <div style={{ fontSize: "12px", color: "#777" }}>{item.area}</div>
                </div>
              </Link>
            ) : null
          )
        )}
      </section>
    </div>
  );
};

export default FirmCollections;
