import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone, Shield } from 'lucide-react';

function CopyButton({ text }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="btn btn-outline btn-small"
      aria-label="Copy template"
    >
      Copy
    </button>
  );
}

const Contact = () => {
  const accessExportTemplate = `Subject: Data access/export request — ReviewReady

Hello ReviewReady Privacy Team,

I am requesting access to and a portable export of my personal data under PIPEDA/GDPR.

Account email: [your account email]
Business name(s): [business name(s)]
Request type: Access + Export

Please confirm receipt and the expected timeline.

Thank you,
[your name]`;

  const deletionTemplate = `Subject: Delete my account and personal data — ReviewReady

Hello ReviewReady Privacy Team,

Please delete my account and associated personal data.

Account email: [your account email]
Business name(s): [business name(s)]
I understand this action is permanent and may affect billing/exports.

Thank you,
[your name]`;

  const marketingOptOutTemplate = `Subject: Unsubscribe from marketing — ReviewReady

Hello,

Please remove this email from all marketing communications. Transactional emails related to my account may continue.

Account email: [your account email]

Thank you,
[your name]`;

  const securityReportTemplate = `Subject: Security report — ReviewReady

Hello Security Team,

Summary: [short description]
Affected area: [url/page/api]
Steps to reproduce:
1) [...]
2) [...]
Impact: [data exposure, account takeover, etc.]
Attachments/POC: [links or files]

I confirm I will not access other users' data and will allow a reasonable time to remediate.

Thank you,
[your name or handle]
Preferred contact: [email]`;

  return (
    <div className="legal-page">
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
            </div>
            <div className="nav-links">
              <Link to="/dashboard" className="btn btn-outline">Login</Link>
              <Link to="/dashboard" className="btn btn-primary">Start 7-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto mb-4" />
          <h1 className="page-title">Need Help with Your Unified Review Dashboard?</h1>
          <p className="">Get support for managing all your reviews in one place. We typically respond within 1 business day.</p>
        </div>

        {/* Contact Cards */}
        <div className="grid-3">
          <div className="card">
            <Mail className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="">Technical issues, billing questions, or help getting set up.</p>
            <a 
              href="mailto:support@reviewready.ca?subject=Support%20request%20—%20ReviewReady"
              className="text-green-600 hover:text-green-700 font-medium"
              aria-label="Email support team"
            >
              support@reviewready.ca
            </a>
            <p className="">Hours: Mon–Fri, 9–5 PT</p>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <Phone className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sales</h3>
            <p className="text-gray-600 mb-4">Pricing, multi-location, and procurement.</p>
            <a 
              href="mailto:sales@reviewready.ca?subject=Sales%20inquiry%20—%20ReviewReady"
              className="text-green-600 hover:text-green-700 font-medium"
              aria-label="Email sales team"
            >
              sales@reviewready.ca
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <Shield className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Security</h3>
            <p className="text-gray-600 mb-4">Report a vulnerability (see our disclosure policy).</p>
            <div className="space-y-2">
              <a 
                href="mailto:security@reviewready.ca?subject=Security%20report%20—%20ReviewReady"
                className="block text-green-600 hover:text-green-700 font-medium"
                aria-label="Email security team"
              >
                security@reviewready.ca
              </a>
              <Link 
                to="/security" 
                className="block text-sm text-blue-600 hover:text-blue-700"
                target="_blank" 
                rel="noopener"
              >
                View disclosure policy →
              </Link>
            </div>
          </div>
        </div>

        {/* Privacy & Data Requests */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-3">Privacy & data requests</h2>
          <p className="text-gray-700 mb-4">
            For access/export/deletion or other privacy requests (PIPEDA/GDPR), email{' '}
            <strong><a href="mailto:privacy@reviewready.ca" className="text-blue-600 hover:text-blue-700">privacy@reviewready.ca</a></strong>{' '}
            from your account email. We may verify identity before acting. Normal response time: 30 days.
          </p>
          <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
            View Privacy Policy →
          </Link>
        </div>

        {/* Email Templates */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Email Templates</h2>
          <p className="text-gray-600">Copy and customize these templates for common requests:</p>

          {/* Template 1: Access/Export */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Privacy – Access/Export Request</h3>
              <CopyButton text={accessExportTemplate} />
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border overflow-x-auto">
              {accessExportTemplate}
            </pre>
          </div>

          {/* Template 2: Deletion */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Privacy – Deletion Request</h3>
              <CopyButton text={deletionTemplate} />
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border overflow-x-auto">
              {deletionTemplate}
            </pre>
          </div>

          {/* Template 3: Marketing Opt-Out */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">CASL/GDPR – Marketing Opt-Out</h3>
              <CopyButton text={marketingOptOutTemplate} />
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border overflow-x-auto">
              {marketingOptOutTemplate}
            </pre>
          </div>

          {/* Template 4: Security Report */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Security – Vulnerability Report</h3>
              <CopyButton text={securityReportTemplate} />
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border overflow-x-auto">
              {securityReportTemplate}
            </pre>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Contact;
