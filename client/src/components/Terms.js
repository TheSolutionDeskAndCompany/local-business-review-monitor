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
              <Link to="/register" className="btn btn-primary">Start 7-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center">
          <FileText size={48} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-600">Terms that govern your use of ReviewReady.</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p><strong>Effective date:</strong> January 8, 2025</p>

          <h2>1) Agreement</h2>
          <p>By using ReviewReady you agree to these Terms and our Privacy Policy. If you're accepting on behalf of a company, you confirm you're authorized.</p>

          <h2>2) Service</h2>
          <p>ReviewReady monitors review platforms you connect (e.g., Google Business Profile, Facebook, Yelp) and sends alerts. We're not affiliated with those platforms and can't guarantee their availability or data accuracy.</p>

          <h2>3) Accounts</h2>
          <p>Keep credentials confidential and accurate. You're responsible for activity under your account.</p>

          <h2>4) Plans, trials, billing</h2>
          <ul>
            <li><strong>7-day free trial.</strong> After the trial, paid plans auto-renew monthly unless canceled.</li>
            <li>Billing is via <strong>Stripe</strong>. Taxes may apply.</li>
            <li><strong>Cancellations</strong> take effect at the end of the current period. <strong>No refunds</strong> for partial periods.</li>
          </ul>

          <h2>5) Acceptable use</h2>
          <p>Only monitor locations you own or are authorized to manage. Don't misuse the service (no scraping, probing, or circumventing rate limits/security).</p>

          <h2>6) Data & IP</h2>
          <p>You retain rights to your content. You grant us a limited license to process it to operate the service. Our software, trademarks, and site content are our IP.</p>

          <h2>7) Availability & changes</h2>
          <p>The service is provided <strong>"as is"</strong> and may change over time. We may suspend access for maintenance, security, or legal reasons.</p>

          <h2>8) Warranties & liability</h2>
          <p>We disclaim all implied warranties to the extent permitted by law. Our total liability for any claim is limited to the fees you paid in the <strong>12 months</strong> before the event giving rise to the claim. We're not liable for indirect or consequential damages.</p>

          <h2>9) Termination</h2>
          <p>You may stop using the service at any time. We may terminate or suspend accounts for breach or misuse.</p>

          <h2>10) Governing law</h2>
          <p>These Terms are governed by the laws of <strong>British Columbia, Canada</strong>, and applicable Canadian law. Venue: <strong>British Columbia</strong> courts.</p>

          <h2>11) Contact</h2>
          <p><strong><a href="mailto:legal@reviewready.ca">legal@reviewready.ca</a></strong> for legal questions.</p>

          <p><em>These Terms are a template and not legal advice.</em></p>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Terms;
