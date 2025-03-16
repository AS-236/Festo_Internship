import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [loading, setLoading] = useState(true);

    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
            const newData = await response.json();
            setVendorData(newData);
            setLoading(false);
        } catch (error) {
            alert("Failed to fetch data");
            console.error("Failed to fetch data", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        vendorFirmHandler();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div>
                {loading && (
                    <div style={{ margin: '20px 0', color: '#555', fontSize: '18px' }}>
                        Your 🥣 is Loading...
                        <MagnifyingGlass visible={true} height="80" width="80" glassColor="#c0efff" color="#e15b64" />
                    </div>
                )}
            </div>
            <h3 style={{ marginBottom: '20px', fontSize: '22px', color: '#333' }}>Top Restaurant Chains</h3>
            <section id="chainGallery" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '10px', scrollBehavior: 'smooth' }}>
                {vendorData.vendors && vendorData.vendors.map((vendor) => (
                    <div key={vendor._id} style={{ display: 'flex', gap: '15px' }}>
                        {vendor.firm.map((item) => (
                            <Link to={`/products/${item._id}/${item.firmName}`} key={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ width: '150px', textAlign: 'center', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px' }}>
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Chains;
