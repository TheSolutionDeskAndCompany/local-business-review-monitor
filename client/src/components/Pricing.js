import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="pricing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <Link to="/" className="logo">
              <Star className="icon" />
              <span>ReviewMonitor</span>
            </Link>
            <div className="nav-links">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-header">
            <h1>Simple, Transparent Pricing</h1>
            <p>Start with a 7-day free trial. No credit card required.</p>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="card-header">
                <h3>Basic</h3>
                <div className="price">
                  <span className="amount">$19</span>
                  <span className="period">/month</span>
                </div>
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
                <Link to="/register" className="btn btn-primary btn-full">
                  Start Free Trial
                </Link>
              </div>
            </div>

            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <div className="card-header">
                <h3>Pro</h3>
                <div className="price">
                  <span className="amount">$39</span>
                  <span className="period">/month</span>
                </div>
                <p>For businesses that want it all</p>
              </div>
              
              <div className="card-features">
                <ul>
                  <li><CheckCircle className="check" /> Everything in Basic</li>
                  <li><CheckCircle className="check" /> Yelp monitoring</li>
                  <li><CheckCircle className="check" /> Facebook monitoring</li>
                  <li><CheckCircle className="check" /> SMS notifications</li>
                  <li><CheckCircle className="check" /> Priority support</li>
                  <li><CheckCircle className="check" /> Advanced analytics</li>
                </ul>
              </div>
              
              <div className="card-footer">
                <Link to="/register" className="btn btn-primary btn-full">
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>

          <div className="trial-info">
            <p><strong>7-day free trial</strong> • No credit card required • Cancel anytime</p>
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
              <p>We check for new reviews every 15 minutes and send notifications immediately when found.</p>
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
          <p>Join hundreds of local businesses protecting their reputation</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <Link to="/" className="logo">
              <Star className="icon" />
              <span>ReviewMonitor</span>
            </Link>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <a href="mailto:support@reviewmonitor.com">Support</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ReviewMonitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
