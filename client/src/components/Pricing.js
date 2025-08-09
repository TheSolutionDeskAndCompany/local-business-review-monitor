import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { TRIAL_DAYS } from '../lib/marketing';
import { CONTACT } from '../lib/contacts';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [locations, setLocations] = useState(1);

  // Simplified 2-tier pricing for better conversion
  const PRICING_TIERS = {
    starter: {
      name: 'Starter',
      price: 29,
      features: [
        '1 location',
        'Google Reviews monitoring',
        'Basic email alerts',
        '20 AI replies/month',
        'Email support'
      ]
    },
    pro: {
      name: 'Pro',
      price: 79,
      features: [
        'Up to 10 locations',
        'Multi-platform (Google, Facebook, Yelp)',
        'Real-time alerts (email + SMS)',
        'Unlimited AI replies',
        'Policy violation detection',
        'Priority support',
        'Custom integrations'
      ]
    }
  };

  const getDisplayPrice = (tier) => {
    const price = PRICING_TIERS[tier].price;
    return billingCycle === 'annual' ? Math.round(price * 0.8) : price; // 20% annual discount
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
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Start {TRIAL_DAYS}-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-header">
            <h1>Simple, Transparent Pricing</h1>
            <p>Start with a {TRIAL_DAYS}-day free trial. No credit card required.</p>
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
                  <li><Check className="check" /> Google Business Profile monitoring</li>
                  <li><Check className="check" /> Email notifications</li>
                  <li><Check className="check" /> Review dashboard</li>
                  <li><Check className="check" /> Export reports (CSV/JSON)</li>
                  <li><Check className="check" /> 7-day free trial</li>
                </ul>
              </div>
              
              <div className="card-footer">
                <Link to="/register" className="btn btn-primary btn-full">
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
                  <li><Check className="check" /> Everything in Basic</li>
                  <li><Check className="check" /> Yelp monitoring <span className="coming-soon">Coming soon*</span></li>
                  <li><Check className="check" /> Facebook monitoring <span className="coming-soon">Coming soon*</span></li>
                  <li><Check className="check" /> SMS notifications</li>
                  <li><Check className="check" /> Priority support</li>
                  <li><Check className="check" /> Sentiment trends & volume by source</li>
                </ul>
              </div>
              
              <div className="card-footer">
                <Link to="/register" className="btn btn-primary btn-full">
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
              <p>Yes! Basic plan includes email support, Pro plan includes priority support with faster response times. Contact <a href={`mailto:${CONTACT.support}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email Support (${CONTACT.support})`} rel="noopener">{CONTACT.support}</a> for assistance.</p>
            </div>
            <div className="faq-item">
              <h3>Do you support multiple locations?</h3>
              <p>Yes. Pricing is per location. Add or remove locations anytime from your dashboard.</p>
            </div>
            <div className="faq-item">
              <h3>Do I need a credit card for the trial?</h3>
              <p>No. Start a 7-day free trial without a credit card. Cancel anytime.</p>
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
              <Link to="/login">Login</Link>
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
