import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="legal-page">
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

      <main className="legal-content">
        <div className="container">
          <div className="legal-header">
            <FileText size={48} className="legal-icon" />
            <h1>Terms of Service</h1>
            <p>Last updated: January 2025</p>
          </div>

          <div className="legal-body">
            <section>
              <h2>Service Description</h2>
              <p>ReviewReady provides review monitoring and alert services for local businesses across Google Business Profile, Facebook, and Yelp platforms.</p>
            </section>

            <section>
              <h2>Free Trial</h2>
              <p>We offer a 7-day free trial with no credit card required. You can cancel anytime during the trial period.</p>
            </section>

            <section>
              <h2>Subscription Terms</h2>
              <p>Subscriptions are billed monthly or annually. You can upgrade, downgrade, or cancel your subscription at any time.</p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>For questions about these terms, contact us at <a href="mailto:legal@reviewready.ca">legal@reviewready.ca</a></p>
            </section>
          </div>

          <div className="legal-footer">
            <Link to="/" className="btn btn-outline">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
