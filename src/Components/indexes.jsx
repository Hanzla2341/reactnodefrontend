import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';


export default function Index() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
      <div>
        <img src={logo} alt="Logo" style={{ width: 300, height: 300 }} />
        <div style={{ width: '75%', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/Signup')}
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              margin: '10px 0',
              backgroundColor: 'yellow',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'black',
              cursor: 'pointer'
            }}
          >
            Signup
          </button>
          <button
            onClick={() => navigate('/home')}
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              margin: '10px 0',
              backgroundColor: '#2b2b2b',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Guest User
          </button>
        </div>

        <div style={{ margin: '20px 0', color: 'white', fontSize: '16px', fontWeight: '600' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '96px', borderBottom: '2px solid yellow', margin: '0 10px' }}></div>
            <span>or</span>
            <div style={{ width: '96px', borderBottom: '2px solid yellow', margin: '0 10px' }}></div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <span>Already a User? </span>
            <span
              onClick={() => navigate('/signin')}
              style={{
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: 'underline',
                color: 'yellow',
                cursor: 'pointer'
              }}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
