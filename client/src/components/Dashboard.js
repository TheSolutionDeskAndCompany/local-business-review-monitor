import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Connectors from './Connectors';
import { 
  Bell, 
  Settings, 
  LogOut, 
  Download,
  EyeOff,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reviews');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [reviewsRes, statsRes, platformsRes] = await Promise.all([
        axios.get('/api/reviews?limit=10'),
        axios.get('/api/reviews/stats'),
        axios.get('/api/business/platforms')
      ]);

      setReviews(reviewsRes.data.reviews);
      setStats(statsRes.data.overall);
      setPlatforms(platformsRes.data);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (reviewId) => {
    try {
      await axios.patch(`/api/reviews/${reviewId}/read`);
      setReviews(reviews.map(review => 
        review._id === reviewId ? { ...review, isNew: false } : review
      ));
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  const connectGoogleBusiness = () => {
    // In a real implementation, this would redirect to Google OAuth
    // eslint-disable-next-line no-unused-vars
    const clientId = 'your-google-client-id';
    // eslint-disable-next-line no-unused-vars
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
    // eslint-disable-next-line no-unused-vars
    const scope = encodeURIComponent('https://www.googleapis.com/auth/business.manage');
    
    // For now, show what would happen
    const proceed = window.confirm(
      '🔗 Connect Google Business Profile\n\n' +
      'This will redirect you to Google to authorize ReviewReady to:\n' +
      '• Access your Business Profile information\n' +
      '• Monitor reviews and ratings\n' +
      '• Send notifications for new reviews\n\n' +
      'Click OK to continue to Google OAuth...'
    );
    
    if (proceed) {
      // In production, redirect to:
      // window.location.href = `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
      
      // For demo, simulate successful connection
      alert('✅ Google Business Profile Connected!\n\nIn production, you would be redirected to Google OAuth and then back here with your connection established.');
      setPlatforms([...platforms, { 
        platform: 'google', 
        businessName: user?.businessName || 'Your Business',
        connected: true,
        lastSync: new Date(),
        rating: 4.5,
        reviews: 100
      }]);
    }
  };


  



  




  const exportReviews = async (format = 'csv') => {
    try {
      const response = await axios.get(`/api/reviews/export?format=${format}`, {
        responseType: format === 'csv' ? 'blob' : 'json'
      });
      
      if (format === 'csv') {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reviews.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffInHours = Math.floor((now - reviewDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return reviewDate.toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
          </div>
          <h1>Welcome back, {user?.ownerName}</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-outline" onClick={() => setActiveTab('settings')}>
            <Settings className="icon" />
            Settings
          </button>
          <button className="btn btn-outline" onClick={logout}>
            <LogOut className="icon" />
            Logout
          </button>
        </div>
      </header>

      {/* Subscription Status */}
      {user?.subscription?.status === 'trial' && (
        <div className="trial-banner">
          <AlertCircle className="icon" />
          <span>
            Trial ends in {Math.ceil((new Date(user.subscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24))} days
          </span>
          <button 
            className="btn btn-primary btn-small"
            onClick={() => navigate('/pricing')}
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button 
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`nav-tab ${activeTab === 'platforms' ? 'active' : ''}`}
          onClick={() => setActiveTab('platforms')}
        >
          Platforms
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalReviews || 0}</div>
                <div className="stat-label">Total Reviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.newReviews || 0}</div>
                <div className="stat-label">New Reviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{(stats.averageRating || 0).toFixed(1)}</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat-card positive">
                <div className="stat-value">{stats.positiveReviews || 0}</div>
                <div className="stat-label">Positive Reviews</div>
              </div>
            </div>

            {/* Reviews Header */}
            <div className="section-header">
              <h2>Recent Reviews</h2>
              <div className="header-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => exportReviews('csv')}
                >
                  <Download className="icon" />
                  Export
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
              {reviews.length === 0 ? (
                <div className="empty-state">
                  <Bell className="empty-icon" />
                  <h3>No reviews yet</h3>
                  <p>Connect your business platforms to start monitoring reviews</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className={`review-card ${review.isNew ? 'new' : ''}`}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.reviewerName}</span>
                        <div className="review-rating">
                          <span className="stars">{getStarRating(review.rating)}</span>
                          <span className="rating-number">({review.rating})</span>
                        </div>
                      </div>
                      <div className="review-meta">
                        <span className="platform">{review.platform}</span>
                        <span className="time">{getTimeAgo(review.reviewDate)}</span>
                        {review.isNew && (
                          <button 
                            className="mark-read-btn"
                            onClick={() => markAsRead(review._id)}
                            title="Mark as read"
                          >
                            <EyeOff className="icon" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{review.text || 'No comment provided'}</p>
                    </div>
                    {review.response && (
                      <div className="review-response">
                        <strong>Your Response:</strong>
                        <p>{review.response.text}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'platforms' && (
          <div className="platforms-section">
            <Connectors />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <div className="section-header">
              <h2>Review Analytics</h2>
            </div>
            <div className="analytics-placeholder">
              <TrendingUp className="empty-icon" />
              <h3>Review Analytics</h3>
              <p>Connect your business platforms to start seeing detailed analytics and insights for your reviews</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <div className="section-header">
              <h2>Account Settings</h2>
            </div>
            
            {/* Profile Settings */}
            <div className="settings-card">
              <h3>Profile Information</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Business Name</label>
                  <input 
                    type="text" 
                    value={user?.businessName || ''} 
                    readOnly 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Owner Name</label>
                  <input 
                    type="text" 
                    value={user?.ownerName || ''} 
                    readOnly 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    readOnly 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={user?.phone || 'Not provided'} 
                    readOnly 
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Settings */}
            <div className="settings-card">
              <h3>Subscription</h3>
              <div className="subscription-info">
                <div className="subscription-status">
                  <div className="status-badge trial">Free Trial</div>
                  <p>Trial ends in 7 days</p>
                </div>
                <button className="btn btn-primary">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="settings-card">
              <h3>Notifications</h3>
              <div className="settings-form">
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Email notifications for new reviews
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Weekly review summary
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    SMS notifications (Pro feature)
                  </label>
                </div>
              </div>
            </div>

            {/* API Settings */}
            <div className="settings-card">
              <h3>Connected Platforms</h3>
              <div className="platform-connections">
                <div className="connection-item">
                  <div className="connection-info">
                    <strong>Google Business Profile</strong>
                    <span className="connection-status disconnected">Not Connected</span>
                  </div>
                  <button className="btn btn-outline">Connect</button>
                </div>
                <div className="connection-item">
                  <div className="connection-info">
                    <strong>Yelp</strong>
                    <span className="connection-status coming-soon">Coming Soon</span>
                  </div>
                  <button className="btn btn-outline" disabled>Connect</button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="settings-card danger-zone">
              <h3>Danger Zone</h3>
              <div className="danger-actions">
                <div className="danger-item">
                  <div>
                    <strong>Delete Account</strong>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button className="btn btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
