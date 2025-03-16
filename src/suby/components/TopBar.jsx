import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <section style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      backgroundColor: '#333', 
      color: '#fff', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          FESTO
        </Link>
      </div>
      <div>
        <input 
          type="text" 
          placeholder='Search...' 
          style={{ 
            padding: '8px', 
            borderRadius: '5px', 
            border: 'none', 
            outline: 'none', 
            width: '200px' 
          }} 
        />
      </div>
      <div style={{ cursor: 'pointer', fontSize: '16px' }}>
        Login / SignUp
      </div>
    </section>
  );
};

export default TopBar;