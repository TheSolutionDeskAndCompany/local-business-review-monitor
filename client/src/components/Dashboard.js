import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [hasConnections, setHasConnections] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    newReviews: 0
  });
  const [reviews, setReviews] = useState([]);
  const [connectors, setConnectors] = useState([]);

  useEffect(() => {
    checkConnections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkConnections = async () => {
    try {
      const response = await axios.get('/api/connectors').catch(() => ({ data: [] }));
      const activeConnections = response.data?.filter(c => c.enabled && c.connected) || [];
      setConnectors(response.data || []);
      setHasConnections(activeConnections.length > 0);
      
      if (activeConnections.length > 0) {
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error checking connections:', error);
      setHasConnections(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const reviewsRes = await axios.get('/api/reviews?limit=50').catch(() => ({ data: { reviews: [] } }));
      const reviewsData = reviewsRes.data.reviews || [];
      
      setReviews(reviewsData);
      setMetrics({
        totalReviews: reviewsData.length,
        averageRating: reviewsData.length > 0 ? (reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length).toFixed(1) : 0,
        responseRate: reviewsData.length > 0 ? Math.round((reviewsData.filter(r => r.responded).length / reviewsData.length) * 100) : 0,
        newReviews: reviewsData.filter(r => new Date(r.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const connectGoogleBusiness = async () => {
    const businessId = prompt('Enter your Google Business Profile ID:');
    const apiKey = prompt('Enter your Google Business Profile API Key:');
    
    if (!businessId || !apiKey) return;

    try {
      const response = await axios.post('/api/business/connect/google', {
        businessId,
        apiKey
      });
      
      if (response.data.success) {
        alert('Successfully connected Google Business Profile!');
        checkConnections(); // Refresh connections
      } else {
        alert('Failed to connect. Please check your credentials.');
      }
    } catch (error) {
      alert('Error connecting to Google Business Profile. Please try again.');
      console.error('Connection error:', error);
    }
  };

  const connectYelp = async () => {
    const businessId = prompt('Enter your Yelp Business ID:');
    const apiKey = prompt('Enter your Yelp API Key:');
    
    if (!businessId || !apiKey) return;

    try {
      const response = await axios.post('/api/business/connect/yelp', {
        businessId,
        apiKey
      });
      
      if (response.data.success) {
        alert('Successfully connected Yelp!');
        checkConnections(); // Refresh connections
      } else {
        alert('Failed to connect. Please check your credentials.');
      }
    } catch (error) {
      alert('Error connecting to Yelp. Please try again.');
      console.error('Connection error:', error);
    }
  };

  const connectFacebook = async () => {
    const pageId = prompt('Enter your Facebook Page ID:');
    const accessToken = prompt('Enter your Facebook Access Token:');
    
    if (!pageId || !accessToken) return;

    try {
      const response = await axios.post('/api/business/connect/facebook', {
        pageId,
        accessToken
      });
      
      if (response.data.success) {
        alert('Successfully connected Facebook!');
        checkConnections(); // Refresh connections
      } else {
        alert('Failed to connect. Please check your credentials.');
      }
    } catch (error) {
      alert('Error connecting to Facebook. Please try again.');
      console.error('Connection error:', error);
    }
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const logout = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading dashboard...</div>
      </div>
    );
  }

  // Empty state for new users
  if (!hasConnections) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>ReviewReady Dashboard</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleUpgrade}
              style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Upgrade
            </button>
            <button 
              onClick={logout}
              style={{ color: '#6b7280', padding: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome State */}
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>Welcome to ReviewReady!</h2>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Connect your business accounts to start monitoring and managing your reviews in one place.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px', margin: '0 auto' }}>
            <button 
              onClick={connectGoogleBusiness}
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '16px', 
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              🏢 Connect Google Business Profile
            </button>
            
            <button 
              onClick={connectYelp}
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '16px', 
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              🌟 Connect Yelp
            </button>
            
            <button 
              onClick={connectFacebook}
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '16px', 
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              📘 Connect Facebook
            </button>
          </div>
        </div>

        {/* Plan Info */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>Free Trial</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>5 days remaining • Up to 100 reviews</p>
            </div>
            <button 
              onClick={handleUpgrade}
              style={{ 
                backgroundColor: '#10b981', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                border: 'none', 
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard with data (when connected)
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>ReviewReady Dashboard</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleUpgrade}
            style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          >
            Upgrade
          </button>
          <button 
            onClick={logout}
            style={{ color: '#6b7280', padding: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total Reviews</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{metrics.totalReviews}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Average Rating</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{metrics.averageRating || '—'}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Response Rate</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{metrics.responseRate}%</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>New Reviews</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{metrics.newReviews}</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Reviews */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.slice(0, 5).map((review, index) => (
              <div key={review.id || index} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: index < reviews.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div style={{ fontWeight: '500' }}>{review.author}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{'★'.repeat(review.rating)}</div>
                </div>
                <p style={{ color: '#374151', fontSize: '14px' }}>{review.text}</p>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                  {review.platform} • {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>No reviews yet. Reviews will appear here once your accounts are connected and synced.</p>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Connected Platforms</h3>
            {connectors.filter(c => c.enabled && c.connected).map(connector => (
              <div key={connector.platform} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', marginRight: '8px' }}>✓</span>
                <span style={{ fontSize: '14px' }}>{connector.platform}</span>
              </div>
            ))}
            <button 
              onClick={connectGoogleBusiness}
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', width: '100%', cursor: 'pointer', marginTop: '8px' }}
            >
              Add Another Platform
            </button>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Alerts</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>No recent alerts</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Plan</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Free Trial - 5 days remaining</p>
            <button 
              onClick={handleUpgrade}
              style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', width: '100%', cursor: 'pointer' }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
