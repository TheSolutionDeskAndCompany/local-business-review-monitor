import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, CheckCircle, Mail, MessageSquare, CreditCard } from 'lucide-react';
import { TRIAL_DAYS, SHOW_SOCIAL_PROOF, ALERT_FREQUENCY_COPY } from '../lib/marketing';


const Landing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

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
              <Link to="/register" className="btn btn-primary">Start 7-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Logo */}
      <div className="banner-logo-section">
        <div className="container">
          <img src="/Review-Ready-logo.png?v=3" alt="ReviewReady" className="banner-logo" />
          <p className="hero-subtitle">
            Get {ALERT_FREQUENCY_COPY} from Google, Facebook, Yelp & more—all in one unified dashboard. Never miss a review across any platform. Setup in 2 minutes.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-large" aria-label="Get instant review alerts">
                Get Instant Review Alerts
              </Link>
            </div>
            <p className="trial-note">No credit card required</p>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <CreditCard size={16} />
                <a href="/security" target="_blank" rel="noopener" aria-label="Learn about Stripe secure payments">Stripe secure payments</a>
              </div>
              <div className="trust-badge">
                <CheckCircle size={16} />
                <a href="/login" target="_blank" rel="noopener" aria-label="Sign in with Google OAuth">Sign in with Google</a>
              </div>
              <div className="trust-badge">
                <Shield size={16} />
                <a href="/privacy" target="_blank" rel="noopener" aria-label="Learn about GDPR and PIPEDA compliance">GDPR + PIPEDA compliant</a>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="dashboard-preview rounded-2xl shadow-xl ring-1 ring-black/5 bg-white overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">ReviewReady Dashboard</h3>
                <p className="text-gray-600 mt-1">Monitor and respond to reviews from all platforms</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.8</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-sm text-gray-600">New Reviews</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                </div>
                <div className="text-center py-8">
                  <div className="text-gray-500">Real-time review monitoring across Google, Facebook, Yelp and more</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Connect your locations</h3>
              <p>Sign in with Google. Import from Google, CSV, or add manually.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get {ALERT_FREQUENCY_COPY}</h3>
              <p>Email and SMS alerts for new reviews.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Reply fast</h3>
              <p>Jump straight to the review from your inbox or dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">One Dashboard. All Your Reviews. Zero Missed Opportunities.</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="platform-logos">
                <span className="platform-logo google" aria-label="Google Business Profile" role="img">G</span>
                <span className="platform-logo facebook" aria-label="Facebook" role="img">f</span>
                <span className="platform-logo yelp" aria-label="Yelp" role="img">Y</span>
              </div>
              <h3>Unified Monitoring</h3>
              <p>Stop checking 5 different apps. Google, Facebook, Yelp & more in one place.</p>
            </div>
            <div className="feature">
              <div className="feature-icons">
                <Mail size={20} />
                <MessageSquare size={20} />
              </div>
              <h3>Instant Alerts</h3>
              <p>Get notified the moment any review appears on any platform. Never miss one again.</p>
            </div>
            <div className="feature">
              <Bell className="feature-icon" />
              <h3>Respond Faster</h3>
              <p>Jump straight to any review from one dashboard. Save hours every week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      {SHOW_SOCIAL_PROOF && (
        <section className="social-proof">
          <div className="container">
            <h2>Trusted by 500+ Local Businesses</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>"ReviewReady helped us catch a bad review within minutes. We responded quickly and turned an angry customer into a happy one!"</p>
                <div className="author">
                  <img src="/images/testimonial-mike.jpg" alt="Mike Chen" className="author-photo" />
                  <div>
                    <strong>Mike Chen</strong>
                    <span>Chen's Restaurant, Toronto</span>
                  </div>
                </div>
              </div>
              <div className="testimonial">
                <p>"I used to check Google and Yelp manually every morning. Now I just get alerts and can focus on running my business."</p>
                <div className="author">
                  <img src="/images/testimonial-lisa.jpg" alt="Lisa Rodriguez" className="author-photo" />
                  <div>
                    <strong>Lisa Rodriguez</strong>
                    <span>Rodriguez Auto Repair, Vancouver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose ReviewReady */}
      <section className="comparison">
        <div className="container">
          <h2 className="section-title">Why Choose ReviewReady Over Free Alternatives?</h2>
          <div className="comparison-grid">
            <div className="comparison-item">
              <h3>❌ Without ReviewReady</h3>
              <ul>
                <li>Check Google Business Profile manually</li>
                <li>Log into Facebook Pages separately</li>
                <li>Monitor Yelp business account daily</li>
                <li>Miss reviews when you're busy</li>
                <li>Slow response times hurt your reputation</li>
              </ul>
            </div>
            <div className="comparison-item highlight">
              <h3>✅ With ReviewReady</h3>
              <ul>
                <li>All platforms monitored automatically</li>
                <li>Instant alerts across all channels</li>
                <li>One dashboard for everything</li>
                <li>Never miss a review again</li>
                <li>Respond faster, look more professional</li>
              </ul>
            </div>
          </div>
          <div className="time-savings">
            <p><strong>Save 2+ hours per week</strong> by eliminating manual checking across multiple platforms</p>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="credibility">
        <div className="container">
          <h2 className="section-title">Trusted by Local Businesses Across Canada</h2>
          <div className="credibility-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Businesses</div>
            </div>
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Reviews Monitored</div>
            </div>
            <div className="stat">
              <div className="stat-number">2 min</div>
              <div className="stat-label">Average Response Time</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
          </div>
          <div className="testimonial-preview">
            <blockquote>
              "I used to spend 30 minutes every morning checking Google, Facebook, and Yelp for new reviews. Now ReviewReady does it all automatically and I get alerts instantly. It's saved me hours every week!"
            </blockquote>
            <cite>— Sarah Mitchell, Owner of Mitchell's Bakery, Vancouver</cite>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <div className="container">
          <h2 className="section-title">Simple, Affordable Pricing</h2>
          
          {/* Billing Toggle */}
          <div className="billing-toggle">
            <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
            <button 
              className="toggle-switch" 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              aria-label="Toggle between monthly and annual billing"
            >
              <div className={`toggle-slider ${billingCycle === 'annual' ? 'annual' : 'monthly'}`}></div>
            </button>
            <span className={billingCycle === 'annual' ? 'active' : ''}>
              Annual <span className="savings">(Save 20%)</span>
            </span>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">
                ${billingCycle === 'monthly' ? '19' : '15.20'}
                <span>/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                {billingCycle === 'annual' && <div className="billed-annually">Billed annually</div>}
              </div>
              <ul>
                <li><CheckCircle className="check" /> Google Business Profile monitoring</li>
                <li><CheckCircle className="check" /> Email alerts</li>
                <li><CheckCircle className="check" /> Dashboard</li>
                <li><CheckCircle className="check" /> Exports</li>
              </ul>
              <Link to="/register" className="btn btn-primary" aria-label={`Start ${TRIAL_DAYS}-day free trial for Basic plan`}>
                Start {TRIAL_DAYS}-Day Free Trial
              </Link>
              <p className="trial-note">No credit card required</p>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <div className="price">
                ${billingCycle === 'monthly' ? '39' : '31.20'}
                <span>/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                {billingCycle === 'annual' && <div className="billed-annually">Billed annually</div>}
              </div>
              <ul>
                <li><CheckCircle className="check" /> Everything in Basic</li>
                <li><CheckCircle className="check" /> Facebook + Yelp monitoring</li>
                <li><CheckCircle className="check" /> SMS alerts</li>
                <li><CheckCircle className="check" /> Priority support</li>
              </ul>
              <Link to="/register" className="btn btn-primary" aria-label={`Start ${TRIAL_DAYS}-day free trial for Pro plan`}>
                Start {TRIAL_DAYS}-Day Free Trial
              </Link>
              <p className="trial-note">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to Stop Juggling Multiple Apps?</h2>
          <p>Join 500+ businesses who unified their review management and never miss an opportunity to respond.</p>
          <Link to="/register" className="btn btn-primary btn-large" aria-label={`Start your ${TRIAL_DAYS}-day free trial`}>
            Start Your {TRIAL_DAYS}-Day Free Trial
          </Link>
          <p className="trial-note">✓ All platforms in one dashboard ✓ No credit card required ✓ Setup in 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="footer-logo" />
            </div>
            <div className="footer-links">
              <Link to="/pricing">Pricing</Link>
              <Link to="/login">Login</Link>
              <a href="mailto:support@reviewready.ca">Support</a>
              <Link to="/privacy" id="privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/security" id="security">Security</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ReviewReady / The Solution Desk Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
