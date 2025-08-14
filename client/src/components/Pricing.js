import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { TRIAL_DAYS } from '../lib/marketing';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [locations, setLocations] = useState(1);

  const MONTHLY_PRICES = { basic: 19, pro: 39 };
  const ANNUAL_DISCOUNT = 0.2; // 20% off

  const calculatePrice = (tier, isAnnual = false) => {
    const basePrice = MONTHLY_PRICES[tier];
    const discountedPrice = isAnnual ? basePrice * (1 - ANNUAL_DISCOUNT) : basePrice;
    return Math.round(discountedPrice * locations);
  };

  const getDisplayPrice = (tier) => {
    const price = calculatePrice(tier, billingCycle === 'annual');
    return billingCycle === 'annual' ? Math.round(price / 12) : price;
  };

  return (
    <div className="pricing-page">
      <title>Simple, Transparent Pricing — ReviewReady</title>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <Link to="/" className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
            </Link>
            <div className="nav-links">
              <Link to="/dashboard" className="btn btn-outline">Login</Link>
              <Link to="/dashboard" className="btn btn-primary">Start {TRIAL_DAYS}-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-header">
            <h1>Stop Juggling Apps. Start Saving Time.</h1>
            <p>Unified review management for Google, Facebook, Yelp & more. Start with a {TRIAL_DAYS}-day free trial. No credit card required.</p>
          </div>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <div className="toggle-container">
              <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
              <button 
                className="toggle-switch"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                aria-label="Toggle between monthly and annual billing"
              >
                <div className={`toggle-slider ${billingCycle === 'annual' ? 'annual' : 'monthly'}`}></div>
              </button>
              <span className={billingCycle === 'annual' ? 'active' : ''}>
                Annual <span className="discount-badge">20% off</span>
              </span>
            </div>
          </div>

          {/* Location Selector */}
          <div className="location-selector">
            <label htmlFor="locations">Number of locations:</label>
            <select 
              id="locations"
              value={locations} 
              onChange={(e) => setLocations(parseInt(e.target.value))}
              className="location-input"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="card-header">
                <h3>Basic</h3>
                <div className="price">
                  <span className="amount">${getDisplayPrice('basic')}</span>
                  <span className="period">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                </div>
                <p className="price-note">Per location. Cancel anytime.</p>
                <p>Perfect for single-location businesses</p>
              </div>
              
              <div className="card-features">
                <ul>
                  <li><CheckCircle className="check" /> Google Business Profile monitoring</li>
                  <li><CheckCircle className="check" /> Email notifications</li>
                  <li><CheckCircle className="check" /> Review dashboard</li>
                  <li><CheckCircle className="check" /> Export reports (CSV/JSON)</li>
                  <li><CheckCircle className="check" /> 7-day free trial</li>
                </ul>
              </div>
              
              <div className="card-footer">
                <Link to="/dashboard" className="btn btn-primary btn-full">
                  Start {TRIAL_DAYS}-Day Free Trial
                </Link>
                <p className="trial-note">No credit card required</p>
              </div>
            </div>

            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <div className="card-header">
                <h3>Pro</h3>
                <div className="price">
                  <span className="amount">${getDisplayPrice('pro')}</span>
                  <span className="period">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                </div>
                <p className="price-note">Per location. Cancel anytime.</p>
                <p>For businesses that want it all</p>
              </div>
              
              <div className="card-features">
                <ul>
                  <li><CheckCircle className="check" /> Everything in Basic</li>
                  <li><CheckCircle className="check" /> SMS notifications</li>
                  <li><CheckCircle className="check" /> Priority support</li>
                  <li><CheckCircle className="check" /> Sentiment trends & volume by source</li>
                </ul>
              </div>
              
              <div className="card-footer">
                <Link to="/dashboard" className="btn btn-primary btn-full">
                  Start {TRIAL_DAYS}-Day Free Trial
                </Link>
                <p className="trial-note">No credit card required</p>
              </div>
            </div>
          </div>

          <div className="trial-info">
            <p><strong>{TRIAL_DAYS}-day free trial</strong> • No credit card required • Cancel anytime</p>
          </div>

          {/* Footnotes */}
          <div className="pricing-footnotes">
            <p>* "Coming soon" features will be enabled automatically on Pro plans when released.</p>
            <p>SMS: standard messaging fees may apply.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How does the free trial work?</h3>
              <p>Start monitoring your reviews immediately with full access to all features for 7 days. No credit card required to start.</p>
            </div>
            <div className="faq-item">
              <h3>Can I change plans later?</h3>
              <p>Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
            </div>
            <div className="faq-item">
              <h3>What platforms do you monitor?</h3>
              <p>Currently Google Business Profile (all plans) with Yelp and Facebook coming to Pro plans soon.</p>
            </div>
            <div className="faq-item">
              <h3>How fast are the notifications?</h3>
              <p>We poll every 15 minutes and notify immediately when found.</p>
            </div>
            <div className="faq-item">
              <h3>How does pricing work?</h3>
              <p>Per business location, per month. Add/remove locations anytime.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>Absolutely. Cancel anytime with no fees or penalties. Your access continues until the end of your billing period.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer support?</h3>
              <p>Yes! Basic plan includes email support, Pro plan includes priority support with faster response times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <h2>Ready to Never Miss a Review Again?</h2>
          <p>Join businesses who never miss a review</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Start {TRIAL_DAYS}-Day Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <Link to="/" className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
            </Link>
            <div className="footer-links">
              <Link to="/pricing">Pricing</Link>
              <Link to="/dashboard">Login</Link>
              <Link to="/contact">Support</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/security">Security</Link>
              <Link to="/contact">Contact</Link>
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

export default Pricing;
