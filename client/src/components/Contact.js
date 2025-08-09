import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Shield, CreditCard, Users } from 'lucide-react';
import { CONTACT } from '../lib/contacts';

function mailtoHref(email, subject, body) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${email}?${params.toString()}`;
}

function ContactCard({ title, desc, email, subject, body, icon: Icon }) {
  const [copied, setCopied] = useState(false);
  const href = mailtoHref(email, subject, body);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <Icon className="w-8 h-8 text-green-600 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <div className="flex gap-2 mb-3">
        <a
          href={href}
          className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={`Email ${title}`}
        >
          Email {title}
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-black/5"
          aria-label={`Copy ${title} template`}
        >
          {copied ? "Copied!" : "Copy template"}
        </button>
      </div>
      <p className="text-xs text-gray-500">{email}</p>
    </div>
  );
}

function TemplateCard({ title, body }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <button
          onClick={handleCopy}
          className="text-xs rounded-md border px-2 py-1 hover:bg-black/5"
          aria-label={`Copy ${title}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border">{body}</pre>
    </div>
  );
}

const Contact = () => {
  const TPL = {
    privacyAccess: `Subject: Data access/export request — ReviewReady

Hello ReviewReady Privacy Team,

I am requesting access to and a portable export of my personal data under PIPEDA/GDPR.

Account email: [your account email]
Business name(s): [business name(s)]
Request type: Access + Export

Please confirm receipt and the expected timeline.

Thank you,
[your name]`,

    privacyDelete: `Subject: Delete my account and personal data — ReviewReady

Hello ReviewReady Privacy Team,

Please delete my account and associated personal data.

Account email: [your account email]
Business name(s): [business name(s)]
I understand this action is permanent and may affect billing/exports.

Thank you,
[your name]`,

    optOut: `Subject: Unsubscribe from marketing — ReviewReady

Hello,

Please remove this email from all marketing communications. Transactional emails related to my account may continue.

Account email: [your account email]

Thank you,
[your name]`,

    security: `Subject: Security report — ReviewReady

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
Preferred contact: [email]`
  };

  const CARDS = [
    { title: "Support", desc: "Technical issues, setup help.", email: CONTACT.support, subject: "Support request — ReviewReady", body: "Hello Support,\n\n[describe the issue]\n\nThanks,\n[your name]", icon: Mail },
    { title: "Sales", desc: "Pricing, multi-location, procurement.", email: CONTACT.sales, subject: "Sales inquiry — ReviewReady", body: "Hello Sales,\n\n[what you need]\n\nThanks,\n[your name]", icon: Users },
    { title: "Billing", desc: "Invoices, charges, payment methods.", email: CONTACT.billing, subject: "Billing question — ReviewReady", body: "Hello Billing,\n\n[details]\n\nThanks,\n[your name]", icon: CreditCard },
    { title: "Privacy", desc: "Access/export/deletion (PIPEDA/GDPR).", email: CONTACT.privacy, subject: "Privacy request — ReviewReady", body: TPL.privacyAccess, icon: Shield },
    { title: "Security", desc: "Report a vulnerability (24h ack).", email: CONTACT.security, subject: "Security report — ReviewReady", body: TPL.security, icon: Shield },
    { title: "Abuse", desc: "Spam, impersonation, misuse reports.", email: CONTACT.abuse, subject: "Abuse report — ReviewReady", body: "Hello,\n\n[describe abuse/misuse]\n\nThanks,\n[your name]", icon: MessageCircle }
  ];

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
        <div className="text-center mb-8">
          <MessageCircle size={48} className="mx-auto mb-4 text-green-600" aria-hidden="true" />
          <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>
          <p className="mt-1 text-sm text-gray-600">Hours: Mon–Fri 9–5 PT • Typical reply: 1 business day • Security: 24h acknowledgement</p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map(card => <ContactCard key={card.title} {...card} />)}
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

        {/* Email Templates Accordion */}
        <div className="mt-12">
          <details className="group rounded-xl border p-5">
            <summary className="cursor-pointer list-none text-lg font-semibold">
              Email templates (optional)
              <span className="ml-2 text-sm font-normal text-gray-500">(copy text if your mail app strips formatting)</span>
            </summary>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {[
                {title: "Privacy – Access/Export", body: TPL.privacyAccess},
                {title: "Privacy – Deletion", body: TPL.privacyDelete},
                {title: "CASL/GDPR – Marketing Opt-Out", body: TPL.optOut},
                {title: "Security – Vulnerability Report", body: TPL.security}
              ].map(t => (
                <TemplateCard key={t.title} title={t.title} body={t.body} />
              ))}
            </div>
          </details>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Contact;
