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
              <Link to="/register" className="btn btn-primary">Start 7-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600">How ReviewReady protects your data while unifying reviews from Google, Facebook, Yelp & more. GDPR + PIPEDA aligned.</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p><strong>Effective date:</strong> January 8, 2025</p>
          
          <p><strong>Who we are.</strong> ReviewReady is a service provided by <strong>The Solution Desk Inc.</strong> ("we", "us").<br />
          Contact: <strong><a href="mailto:support@reviewready.ca">support@reviewready.ca</a></strong> • <strong>Canada</strong></p>

          <h2>Data we collect</h2>
          <ul>
            <li><strong>Account:</strong> name, email, password hash.</li>
            <li><strong>Business & locations:</strong> business names, addresses, platform IDs/URLs (Google Business Profile, Facebook Page, Yelp).</li>
            <li><strong>Usage & device:</strong> app interactions, IP, timestamps, diagnostics/logs.</li>
            <li><strong>Billing:</strong> handled by <strong>Stripe</strong>; we don't store full card numbers.</li>
            <li><strong>Communications:</strong> emails you send us, support tickets, and alert preferences.</li>
          </ul>

          <h2>How we collect it</h2>
          <ul>
            <li>Directly from you (sign-up, forms, settings).</li>
            <li>Via connected services you authorize (e.g., Google OAuth, pasted Yelp/Facebook URLs).</li>
            <li>Automatically via cookies/analytics for performance and security.</li>
          </ul>

          <h2>Why we use it (legal basis)</h2>
          <ul>
            <li><strong>Provide the service</strong> and send review alerts (<strong>contract</strong>).</li>
            <li><strong>Improve, troubleshoot, prevent abuse</strong> (<strong>legitimate interests</strong>).</li>
            <li><strong>Billing & accounting</strong> (<strong>legal obligation/contract</strong>).</li>
            <li><strong>Marketing emails/SMS</strong> only with consent (<strong>consent/CASL</strong>). You can opt out anytime.</li>
          </ul>

          <h2>Sharing & processors</h2>
          <p>We use vetted vendors to run the service: <strong>Stripe (payments)</strong>, <strong>Vercel (hosting)</strong>, <strong>Email provider (transactional email)</strong>, <strong>SMS provider (SMS alerts)</strong>, and analytics/security tooling. They act as processors and may store data in the US or other regions. We don't sell personal data.</p>

          <h2>International transfers</h2>
          <p>Data may be processed outside Canada. When required, we use Standard Contractual Clauses or equivalent safeguards.</p>

          <h2>Retention</h2>
          <p>Account data is kept while your account is active. On deletion, we delete or anonymize within <strong>90 days</strong>; logs within <strong>30 days</strong> unless required for security/legal reasons.</p>

          <h2>Your rights</h2>
          <ul>
            <li><strong>Canada (PIPEDA):</strong> access, correction, and complaint rights.</li>
            <li><strong>EU/UK (GDPR):</strong> access, rectification, erasure, restriction, portability, objection, and withdrawal of consent.</li>
          </ul>
          <p>Request by emailing <strong><a href="mailto:privacy@reviewready.ca">privacy@reviewready.ca</a></strong>.</p>

          <h2>Cookies</h2>
          <p>We use essential cookies for auth and preferences, plus analytics/performance cookies. You can control cookies in your browser settings.</p>

          <h2>Communications (CASL)</h2>
          <p>We only send commercial messages with consent. Unsubscribe links are included in every message.</p>

          <h2>Children</h2>
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
