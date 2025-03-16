import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const { firmId, firmName } = useParams();

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.error("product failed to fetch", error);
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  return (
    <>
      <TopBar />
      <section style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <h3 style={{ textAlign: 'center', color: '#333' }}>{firmName}</h3>
        {products.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '15px', 
              margin: '10px 0', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
              backgroundColor: '#fff' 
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.productName}</div>
              <div style={{ color: '#28a745', fontSize: '16px' }}>₹{item.price}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{item.description}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={`${API_URL}/uploads/${item.image}`} 
                alt={item.productName} 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <div 
                style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  padding: '8px 12px', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '14px'
                }}
              >
                ADD
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductMenu;
