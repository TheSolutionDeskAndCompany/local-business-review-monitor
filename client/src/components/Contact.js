import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
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
            <MessageCircle size={48} className="legal-icon" />
            <h1>Contact Us</h1>
            <p>We're here to help</p>
          </div>

          <div className="legal-body">
            <section>
              <h2><Mail size={24} /> Email Support</h2>
              <p>For general support and questions:</p>
              <p><a href="mailto:support@reviewready.ca">support@reviewready.ca</a></p>
            </section>

            <section>
              <h2><MessageCircle size={24} /> Live Chat</h2>
              <p>Available during business hours (9 AM - 5 PM EST) for Pro subscribers.</p>
            </section>

            <section>
              <h2>Specialized Support</h2>
              <ul>
                <li><strong>Sales:</strong> <a href="mailto:sales@reviewready.ca">sales@reviewready.ca</a></li>
                <li><strong>Technical:</strong> <a href="mailto:tech@reviewready.ca">tech@reviewready.ca</a></li>
                <li><strong>Privacy:</strong> <a href="mailto:privacy@reviewready.ca">privacy@reviewready.ca</a></li>
                <li><strong>Security:</strong> <a href="mailto:security@reviewready.ca">security@reviewready.ca</a></li>
              </ul>
            </section>

            <section>
              <h2>Business Information</h2>
              <p><strong>The Solution Desk Inc.</strong><br />
              Operating ReviewReady<br />
              Canada</p>
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

export default Contact;
