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

        {/* Welcome State - Modern Design */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '0',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '48px',
            textAlign: 'center'
          }}>
            {/* ReviewReady Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <img 
                src="/Review-Ready-logo.png" 
                alt="ReviewReady Logo" 
                style={{
                  height: '80px',
                  width: 'auto',
                  filter: 'drop-shadow(0 10px 25px rgba(16, 185, 129, 0.3))'
                }}
              />
            </div>
            
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: '#1e293b',
              marginBottom: '16px'
            }}>Welcome to ReviewReady!</h2>
            
            <p style={{ 
              fontSize: '18px', 
              color: '#6b7280', 
              marginBottom: '40px', 
              maxWidth: '600px', 
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Connect your business accounts to start monitoring and managing your reviews in one unified dashboard. 
              Get instant alerts and never miss another review again.
            </p>
            
            {/* Connection Cards Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '20px', 
              maxWidth: '900px', 
              margin: '0 auto 32px'
            }}>
              {/* Google Business Profile Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '2px solid #e5e7eb',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onClick={connectGoogleBusiness}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#4285f4',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Google Business Profile</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Connect your Google Business Profile to monitor Google reviews</p>
                <div style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'inline-block'
                }}>Connect Now</div>
              </div>
              
              {/* Yelp Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '2px solid #e5e7eb',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onClick={connectYelp}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#d32323',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Yelp Business</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Monitor and respond to your Yelp reviews instantly</p>
                <div style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'inline-block'
                }}>Connect Now</div>
              </div>
              
              {/* Facebook Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '2px solid #e5e7eb',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onClick={connectFacebook}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1877f2',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Facebook Business</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Track Facebook page reviews and recommendations</p>
                <div style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'inline-block'
                }}>Connect Now</div>
              </div>
            </div>
            
            {/* Help Text */}
            <div style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                💡 <strong>Need help?</strong> Click any platform above to get started. You'll need your API credentials ready - 
                we'll guide you through the setup process step by step.
              </p>
            </div>
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
