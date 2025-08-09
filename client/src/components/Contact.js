import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Shield, CreditCard, Users } from 'lucide-react';
import { CONTACT } from '../lib/contacts';

function CopyButton({ text }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="text-sm rounded-md border px-3 py-1 hover:bg-black/5"
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
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Start 7-Day Free Trial</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-4xl font-bold mb-2">Contact us</h1>
          <p className="text-gray-600">We typically respond within 1 business day.</p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Support */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-y-2">
              <Mail className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Support</h2>
                <p className="text-gray-600 mb-3">Technical help and account questions</p>
                <a 
                  href={`mailto:${CONTACT.support}`}
                  className="text-green-600 font-medium hover:text-green-700"
                  aria-label={`Email Support (${CONTACT.support})`}
                  rel="noopener"
                >
                  {CONTACT.support}
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri 9 AM - 5 PM PST</p>
              </div>
            </div>
          </div>

          {/* Sales */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-y-2">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Sales</h2>
                <p className="text-gray-600 mb-3">Questions about plans and pricing</p>
                <a 
                  href={`mailto:${CONTACT.sales}`}
                  className="text-green-600 font-medium hover:text-green-700"
                  aria-label={`Email Sales (${CONTACT.sales})`}
                  rel="noopener"
                >
                  {CONTACT.sales}
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri 8 AM - 6 PM PST</p>
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-y-2">
              <CreditCard className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Billing</h2>
                <p className="text-gray-600 mb-3">Invoices, payments, and subscription questions</p>
                <a 
                  href={`mailto:${CONTACT.billing}`}
                  className="text-green-600 font-medium hover:text-green-700"
                  aria-label={`Email Billing (${CONTACT.billing})`}
                  rel="noopener"
                >
                  {CONTACT.billing}
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri 9 AM - 5 PM PST</p>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-y-2">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Privacy (PIPEDA/GDPR)</h2>
                <p className="text-gray-600 mb-3">Data access, export, and deletion requests</p>
                <a 
                  href={`mailto:${CONTACT.privacy}`}
                  className="text-green-600 font-medium hover:text-green-700"
                  aria-label={`Email Privacy (${CONTACT.privacy})`}
                  rel="noopener"
                >
                  {CONTACT.privacy}
                </a>
                <p className="text-sm text-gray-500 mt-2">Response within 30 days</p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-y-2">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Security</h2>
                <p className="text-gray-600 mb-3">Vulnerability reports and security concerns</p>
                <a 
                  href={`mailto:${CONTACT.security}`}
                  className="text-green-600 font-medium hover:text-green-700"
                  aria-label={`Email Security (${CONTACT.security})`}
                  rel="noopener"
                >
                  {CONTACT.security}
                </a>
                <Link 
                  to="/security" 
                  className="block text-sm text-brand-600 hover:text-brand-700 mt-2"
                  target="_blank" 
                  rel="noopener"
                >
                  View Security Policy →
                </Link>
              </div>
            </div>
          </div>

          {/* Media/Press */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-y-2">
              <Mail className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Media/Press</h2>
                <p className="text-gray-600 mb-3">Press inquiries and general contact</p>
                <a 
                  href={`mailto:${CONTACT.contact}`}
                  className="text-green-600 font-medium hover:text-green-700"
                  aria-label={`Email General Contact (${CONTACT.contact})`}
                  rel="noopener"
                >
                  {CONTACT.contact}
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri 9 AM - 5 PM PST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Methods */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Additional Contact Methods</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Abuse reports:</strong> <a href={`mailto:${CONTACT.abuse}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email Abuse Reports (${CONTACT.abuse})`} rel="noopener">{CONTACT.abuse}</a></p>
            <p><strong>DMARC reports:</strong> <a href={`mailto:${CONTACT.dmarc}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email DMARC Reports (${CONTACT.dmarc})`} rel="noopener">{CONTACT.dmarc}</a> (automated reports only)</p>
          </div>
        </div>

        {/* Privacy & Data Requests */}
        <div className="bg-brand-50 p-6 rounded-lg border border-brand-200">
          <h2 className="text-xl font-semibold mb-3">Privacy & data requests</h2>
          <p className="text-gray-700 mb-4">
            For access/export/deletion or other privacy requests (PIPEDA/GDPR), email{' '}
            <strong><a href={`mailto:${CONTACT.privacy}`} className="text-brand-600 hover:text-brand-700" aria-label={`Email Privacy (${CONTACT.privacy})`} rel="noopener">{CONTACT.privacy}</a></strong>{' '}
            from your account email. We may verify identity before acting. Normal response time: 30 days.
          </p>
          <Link to="/privacy" className="text-brand-600 hover:text-brand-700 font-medium">
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
