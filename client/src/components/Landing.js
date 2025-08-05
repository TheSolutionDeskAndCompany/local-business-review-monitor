import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Bell, Shield, Clock, CheckCircle, Award } from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
            </div>
            <div className="nav-links">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Award size={16} />
              <span>Trusted by 500+ Local Businesses</span>
            </div>
            <h1>Never Miss Another Review Again</h1>
            <p className="hero-subtitle">
              Stay one step ahead—catch, respond, and turn every review into an opportunity.
              Get instant email alerts, see all feedback in one dashboard, and impress every customer.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-large">
                Start 7-Day Free Trial
              </Link>
              <Link to="/pricing" className="btn btn-secondary btn-large">
                View Pricing
              </Link>
            </div>
            <p className="trial-note">No credit card required • Setup in 2 minutes</p>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="trust-stars">★★★★★</div>
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="trust-badge">
                <CheckCircle size={16} />
                <span>GDPR Compliant</span>
              </div>
              <div className="trust-badge">
                <Shield size={16} />
                <span>Bank-Level Security</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="dashboard-preview">
              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer">Sarah M.</span>
                  <div className="stars">★★★★★</div>
                </div>
                <p>"Amazing service! Will definitely come back."</p>
                <span className="platform">Google • 2 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Everything You Need to Monitor Reviews</h2>
          <div className="features-grid">
            <div className="feature">
              <Bell className="feature-icon" />
              <h3>Instant Notifications</h3>
              <p>Get email or SMS alerts the moment a new review is posted</p>
            </div>
            <div className="feature">
              <Shield className="feature-icon" />
              <h3>Reputation Protection</h3>
              <p>Respond quickly to negative reviews before they hurt your business</p>
            </div>
            <div className="feature">
              <Clock className="feature-icon" />
              <h3>Save Time</h3>
              <p>No more manually checking multiple review sites every day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <h2>Join 500+ Local Businesses</h2>
          <div className="testimonials">
            <div className="testimonial">
              <p>"ReviewReady helped us catch a bad review within minutes. We responded quickly and turned an angry customer into a happy one!"</p>
              <div className="author">
                <strong>Mike Chen</strong>
                <span>Chen's Restaurant</span>
              </div>
            </div>
            <div className="testimonial">
              <p>"I used to check Google and Yelp manually every morning. Now I just get alerts and can focus on running my business."</p>
              <div className="author">
                <strong>Lisa Rodriguez</strong>
                <span>Rodriguez Auto Repair</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <div className="container">
          <h2>Simple, Affordable Pricing</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">$19<span>/month</span></div>
              <ul>
                <li><CheckCircle className="check" /> Google Business Profile monitoring</li>
                <li><CheckCircle className="check" /> Email notifications</li>
                <li><CheckCircle className="check" /> Review dashboard</li>
                <li><CheckCircle className="check" /> Export reports</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Start Free Trial</Link>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <div className="price">$39<span>/month</span></div>
              <ul>
                <li><CheckCircle className="check" /> Everything in Basic</li>
                <li><CheckCircle className="check" /> Yelp & Facebook monitoring</li>
                <li><CheckCircle className="check" /> SMS notifications</li>
                <li><CheckCircle className="check" /> Priority support</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to Protect Your Reputation?</h2>
          <p>Join hundreds of local businesses who never miss a review</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <Star className="icon" />
              <span>ReviewReady</span>
            </div>
            <div className="footer-links">
              <Link to="/pricing">Pricing</Link>
              <Link to="/login">Login</Link>
              <a href="mailto:support@reviewmonitor.com">Support</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ReviewReady / The Solution Desk Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
