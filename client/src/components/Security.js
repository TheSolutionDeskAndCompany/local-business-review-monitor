import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CreditCard } from 'lucide-react';

const Security = () => {
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
            <Shield size={48} className="legal-icon" />
            <h1>Security</h1>
            <p>How we protect your data</p>
          </div>

          <div className="legal-body">
            <section>
              <h2><Lock size={24} /> Data Encryption</h2>
              <p>All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your business data and review information are always protected.</p>
            </section>

            <section>
              <h2><CreditCard size={24} /> Secure Payments</h2>
              <p>We use Stripe for all payment processing. We never store your credit card information on our servers.</p>
            </section>

            <section>
              <h2><Shield size={24} /> Infrastructure Security</h2>
              <p>Our infrastructure is hosted on secure cloud platforms with regular security audits and monitoring.</p>
            </section>

            <section>
              <h2>Compliance</h2>
              <p>We maintain compliance with GDPR, PIPEDA, and other relevant data protection regulations.</p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>For security-related questions, contact us at <a href="mailto:security@reviewready.ca">security@reviewready.ca</a></p>
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

export default Security;
