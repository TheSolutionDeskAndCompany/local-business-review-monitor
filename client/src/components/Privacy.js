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
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600">How we handle your data in ReviewReady</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p><strong>Last updated:</strong> August 2025</p>
          
          <p>ReviewReady is a service provided by <strong>The Solution Desk Inc.</strong> ("we", "us").<br />
          Contact: <strong><a href="mailto:support@thesolutiondesk.ca">support@thesolutiondesk.ca</a></strong></p>

          <h2>Data We Collect</h2>
          <p>We collect the minimum data needed to provide our service:</p>
          <ul>
            <li><strong>Account Information:</strong> Email address and password (hashed).</li>
            <li><strong>Business Information:</strong> Business names and platform connections you provide.</li>
            <li><strong>Usage Data:</strong> Basic app interactions and error logs to improve our service.</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and maintain our service</li>
            <li>Send you important service notifications</li>
            <li>Improve and troubleshoot our application</li>
          </ul>

          <h2>Data Storage</h2>
          <p>Your data is stored securely on our servers. We implement industry-standard security measures to protect your information.</p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt-out of communications</li>
          </ul>
          <p>To exercise these rights, please contact us at <a href="mailto:support@thesolutiondesk.ca">support@thesolutiondesk.ca</a>.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this policy from time to time. We'll notify you of any changes by posting the new policy on this page.</p>

          <h2>Contact Us</h2>
          <p>The service isn't for individuals under 16.</p>

          <h2>Changes</h2>
          <p>We'll post updates here and revise the effective date.</p>

          <p><em>This policy is provided for transparency and isn't legal advice.</em></p>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
