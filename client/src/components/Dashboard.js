import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>ReviewReady Dashboard</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => navigate('/upgrade')}
            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none' }}
          >
            Upgrade
          </button>
          <button 
            onClick={logout}
            style={{ color: '#6b7280', padding: '8px', border: 'none', backgroundColor: 'transparent' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total Reviews</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>12</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Average Rating</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>4.2</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Response Rate</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>85%</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>New Reviews</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>3</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Reviews */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Reviews</h2>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
              <div style={{ fontWeight: '500' }}>Sarah Johnson</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>5★</div>
            </div>
            <p style={{ color: '#374151', fontSize: '14px' }}>Excellent service! The team was professional and delivered exactly what we needed.</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
              <div style={{ fontWeight: '500' }}>Mike Chen</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>4★</div>
            </div>
            <p style={{ color: '#374151', fontSize: '14px' }}>Great experience overall. Quick response time and quality work.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Connect Platform</h3>
            <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', width: '100%' }}>
              Connect Google Business Profile
            </button>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Alerts</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>No recent alerts</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Plan</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Free Trial - 5 days remaining</p>
            <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', width: '100%' }}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
