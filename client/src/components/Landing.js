import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, CheckCircle, Mail, MessageSquare, CreditCard } from 'lucide-react';
import { PRODUCT_NAME, TRIAL_DAYS, SHOW_SOCIAL_PROOF, ALERT_FREQUENCY_COPY } from '../lib/marketing';

const Landing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="landing-page">
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": PRODUCT_NAME,
          "description": "Instant alerts from Google, Yelp, and Facebook. Reply fast from one dashboard. Setup in 2 minutes.",
          "offers": [
            {
              "@type": "Offer",
              "name": "Basic Plan",
              "price": billingCycle === 'monthly' ? "19" : "182.4",
              "priceCurrency": "USD",
              "billingIncrement": billingCycle === 'monthly' ? "P1M" : "P1Y",
              "description": `${TRIAL_DAYS}-day free trial included`
            },
            {
              "@type": "Offer",
              "name": "Pro Plan",
              "price": billingCycle === 'monthly' ? "39" : "374.4",
              "priceCurrency": "USD",
              "billingIncrement": billingCycle === 'monthly' ? "P1M" : "P1Y",
              "description": `${TRIAL_DAYS}-day free trial included`
            }
          ]
        })}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How fast are alerts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `You receive ${ALERT_FREQUENCY_COPY} via email and SMS when new reviews are posted.`
              }
            },
            {
              "@type": "Question",
              "name": "Which sites do you monitor?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We monitor Google Business Profile, Facebook, and Yelp for comprehensive review coverage."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need a credit card for the trial?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `No credit card required for the ${TRIAL_DAYS}-day free trial.`
              }
            }
          ]
        })}
      </script>
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Never miss a review.</h1>
            <p className="hero-subtitle">
              Get {ALERT_FREQUENCY_COPY} from Google, Yelp, and Facebook, and reply from one dashboard. Setup in 2 minutes.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-large" aria-label={`Start ${TRIAL_DAYS}-day free trial`}>
                Start {TRIAL_DAYS}-Day Free Trial
              </Link>
              <Link to="/pricing" className="btn btn-secondary btn-large" aria-label="View pricing plans">
                View Pricing
              </Link>
            </div>
            <p className="trial-note">No credit card required</p>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <CreditCard size={16} />
                <Link to="/security" aria-label="Learn about Stripe secure payments">Stripe secure payments</Link>
              </div>
              <div className="trust-badge">
                <CheckCircle size={16} />
                <Link to="/login" aria-label="Sign in with Google OAuth">Sign in with Google</Link>
              </div>
              <div className="trust-badge">
                <Shield size={16} />
                <Link to="/privacy" aria-label="Learn about GDPR and PIPEDA compliance">GDPR + PIPEDA compliant</Link>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="/images/hero-dashboard.png" 
              alt="ReviewReady dashboard showing review monitoring interface" 
              className="dashboard-screenshot"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How it works</h2>
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
          <h2>Everything you need to monitor reviews</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="platform-logos">
                <span className="platform-logo google" aria-label="Google Business Profile" role="img">G</span>
                <span className="platform-logo facebook" aria-label="Facebook" role="img">f</span>
                <span className="platform-logo yelp" aria-label="Yelp" role="img">Y</span>
              </div>
              <h3>Monitors</h3>
              <p>Google Business Profile, Facebook, Yelp.</p>
            </div>
            <div className="feature">
              <div className="feature-icons">
                <Mail size={20} />
                <MessageSquare size={20} />
              </div>
              <h3>Alerts</h3>
              <p>Email + SMS, configurable per location.</p>
            </div>
            <div className="feature">
              <Bell className="feature-icon" />
              <h3>Dashboard</h3>
              <p>All feedback in one place, exports, multi-location support.</p>
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

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <div className="container">
          <h2>Simple, Affordable Pricing</h2>
          
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
          <h2>Ready to protect your reputation?</h2>
          <p>Join businesses who never miss a review.</p>
          <Link to="/register" className="btn btn-primary btn-large" aria-label={`Start your ${TRIAL_DAYS}-day free trial`}>
            Start Your {TRIAL_DAYS}-Day Free Trial
          </Link>
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
