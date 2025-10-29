import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import banner from '../assets/images/homeBanner.png';
import perfume from '../assets/images/perfume1.png';
import skincare from '../assets/images/skincare1.png';
import watches from '../assets/images/watch1.png';

const products = [
  { id: 1, name: 'Perfume', image: perfume },
  { id: 2, name: 'Skincare', image: skincare },
  { id: 3, name: 'Watches', image: watches },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product');
  };

  return (
    <div style={{ backgroundColor: '#2b2b2b', minHeight: '100vh', color: 'white' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
        <div
          style={{
            backgroundColor: '#5f5f5f',
            width: '92%',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3
              style={{
                fontSize: '18px',
                color: '#fb9b33',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              Welcome to
            </h3>
            <img src={logo} alt="Logo" style={{ width: 120, height: 50 }} />
          </div>
          <span style={{ fontSize: '28px', color: '#fb9b33' }}>✨</span>
        </div>
      </header>

      {/* Banner */}
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
            Dine with your loved ones
          </h2>
        </div>
      </div>

      {/* Product Sections */}
      <div style={{ padding: '20px' }}>
        <ProductSection title="Our Products" onClick={handleClick} />
        <ProductSection title="Trending Products" onClick={handleClick} />
        <ProductSection title="Discount Offers" onClick={handleClick} />
      </div>
    </div>
  );
};

// Reusable component
function ProductSection({ title, onClick }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3
        style={{
          fontSize: '24px',
          color: '#fb9b33',
          fontWeight: '600',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '10px',
        }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            onClick={onClick}
            style={{
              backgroundColor: '#3b3b3b',
              borderRadius: '8px',
              padding: '12px',
              width: '160px',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <p style={{ color: '#fff', marginTop: '8px', fontWeight: '600' }}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
