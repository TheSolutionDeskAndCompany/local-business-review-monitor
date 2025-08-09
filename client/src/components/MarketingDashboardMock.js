import React from 'react';
import { Star, Bell, TrendingUp, MapPin } from 'lucide-react';

const MarketingDashboardMock = () => {
  return (
    <div 
      className="marketing-dashboard-mock rounded-2xl shadow-xl ring-1 ring-black/5 bg-white overflow-hidden"
      role="img"
      aria-label="ReviewReady dashboard preview"
    >
      {/* Top Bar */}
      <div className="dashboard-header">
        <div className="dashboard-nav">
          <div className="dashboard-logo">
            <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-mini" />
            <span>ReviewReady</span>
          </div>
          <div className="dashboard-search">
            <input type="text" placeholder="Search reviews..." disabled />
          </div>
          <div className="dashboard-user">
            <div className="user-avatar">JD</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Sidebar */}
        <div className="dashboard-sidebar">
          <h3>Sources</h3>
          <div className="source-list">
            <div className="source-item active">
              <span className="source-icon google">G</span>
              <span className="source-name">Google Business</span>
              <span className="source-count">12</span>
            </div>
            <div className="source-item">
              <span className="source-icon facebook">f</span>
              <span className="source-name">Facebook</span>
              <span className="source-count coming-soon">Soon</span>
            </div>
            <div className="source-item">
              <span className="source-icon yelp">Y</span>
              <span className="source-name">Yelp</span>
              <span className="source-count coming-soon">Soon</span>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="dashboard-main">
          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-value">4.8</div>
                <div className="stat-label">Avg Rating</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Bell size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-value">3</div>
                <div className="stat-label">This Week</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <MapPin size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-value">2</div>
                <div className="stat-label">Locations</div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="reviews-section">
            <h4>Recent Reviews</h4>
            <div className="review-list">
              <div className="review-item">
                <div className="review-header">
                  <div className="review-stars">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className="star filled" />
                    ))}
                  </div>
                  <span className="review-source google">Google</span>
                  <span className="review-time">2 hours ago</span>
                </div>
                <p className="review-text">"Excellent service! The team was professional and..."</p>
                <div className="review-actions">
                  <button className="reply-btn">Reply</button>
                </div>
              </div>
              
              <div className="review-item">
                <div className="review-header">
                  <div className="review-stars">
                    {[1,2,3,4].map(i => (
                      <Star key={i} size={14} className="star filled" />
                    ))}
                    <Star size={14} className="star empty" />
                  </div>
                  <span className="review-source google">Google</span>
                  <span className="review-time">1 day ago</span>
                </div>
                <p className="review-text">"Good experience overall, quick response time..."</p>
                <div className="review-actions">
                  <button className="reply-btn">Reply</button>
                </div>
              </div>

              <div className="review-item">
                <div className="review-header">
                  <div className="review-stars">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className="star filled" />
                    ))}
                  </div>
                  <span className="review-source google">Google</span>
                  <span className="review-time">3 days ago</span>
                </div>
                <p className="review-text">"Outstanding customer service! Highly recommend..."</p>
                <div className="review-actions">
                  <button className="reply-btn replied">Replied</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboardMock;
