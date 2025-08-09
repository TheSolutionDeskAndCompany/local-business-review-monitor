import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../lib/contacts';
import { Shield } from 'lucide-react';

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
              <Link to="/register" className="btn btn-primary">Start 7-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-4xl font-bold mb-2">Security</h1>
          <p className="text-gray-600">How ReviewReady protects your data.</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Our approach</h2>
          <p>We follow industry-standard practices to keep customer data safe.</p>

          <h2>Application security</h2>
          <ul>
            <li>Enforced HTTPS; HSTS enabled.</li>
            <li>Authentication with secure password hashing; optional OAuth (Google).</li>
            <li>Role-based access for team features (if enabled).</li>
          </ul>

          <h2>Data protection</h2>
          <p>We typically respond to security reports within <strong>24 hours</strong> and provide updates every <strong>72 hours</strong> until resolution.</p>
          <ul>
            <li>Encryption <strong>in transit</strong> (TLS) and <strong>at rest</strong> (cloud-provider encryption).</li>
            <li>Secrets stored in managed secrets/ENV, rotated when necessary.</li>
            <li>Backups for critical data with periodic restore tests.</li>
          </ul>

          <h2>Infrastructure</h2>
          <ul>
            <li>Hosted on <strong>Vercel</strong> with regional CDN and DDoS protections.</li>
            <li>Separate production/staging environments.</li>
          </ul>

          <h2>Operational security</h2>
          <ul>
            <li>Principle of least privilege for staff access.</li>
            <li>Audit logging for security-sensitive actions.</li>
            <li>Vendor risk review for subprocessors.</li>
          </ul>

          <h2>Responsible disclosure</h2>
          <p>If you believe you've found a vulnerability, email <strong><a href={`mailto:${CONTACT.security}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email Security (${CONTACT.security})`} rel="noopener">{CONTACT.security}</a></strong> with:</p>
          <p>Found a security issue? Email <strong><a href={`mailto:${CONTACT.security}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email Security (${CONTACT.security})`} rel="noopener">{CONTACT.security}</a></strong>. We'll acknowledge receipt and work to resolve promptly. Please avoid accessing other users' data and allow us time to fix the issue.</p>

          <p><strong>Report abuse (spam/impersonation):</strong> <a href={`mailto:${CONTACT.abuse}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email Abuse Reports (${CONTACT.abuse})`} rel="noopener">{CONTACT.abuse}</a></p>

          <h2>Subprocessors</h2>
          <p>Payments: <strong>Stripe</strong><br />
          Hosting: <strong>Vercel</strong><br />
          Email: <strong>Email provider</strong><br />
          SMS: <strong>SMS provider</strong></p>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Security;
