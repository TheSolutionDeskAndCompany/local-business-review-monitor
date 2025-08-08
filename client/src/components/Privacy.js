import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Privacy = () => {
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
            <h1>Privacy Policy</h1>
            <p>Last updated: January 2025</p>
          </div>

          <div className="legal-body">
            <section>
              <h2>Data Collection</h2>
              <p>ReviewReady collects only the data necessary to provide our review monitoring service. This includes your business information, review data from connected platforms, and account details.</p>
            </section>

            <section>
              <h2>GDPR & PIPEDA Compliance</h2>
              <p>We are fully compliant with GDPR and PIPEDA regulations. You have the right to access, modify, or delete your personal data at any time.</p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>All data is encrypted in transit and at rest. We use industry-standard security measures to protect your information.</p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>For privacy-related questions, contact us at <a href="mailto:privacy@reviewready.ca">privacy@reviewready.ca</a></p>
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

export default Privacy;
