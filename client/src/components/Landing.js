import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, CheckCircle, Mail, MessageSquare } from 'lucide-react';
import { TRIAL_DAYS, SHOW_SOCIAL_PROOF } from '../lib/marketing';
import { CONTACT } from '../lib/contacts';
import MarketingDashboardMock from './MarketingDashboardMock';

const Landing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="ReviewReady home">
            <img
              src="/Review-Ready-logo.png"
              alt=""
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
              ReviewReady
            </span>
          </Link>
          
          <div className="flex items-center">
            <Link
              to="/pricing"
              className="hidden md:inline-block text-sm font-medium hover:text-brand-700"
            >
              Pricing
            </Link>
            <Link
              to="/register"
              className="ml-3 inline-flex items-center rounded-md bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Start 7-Day Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-14 sm:py-18">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="mx-auto mt-4 w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                Trusted by local businesses • No credit card required
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Never miss a review.</h1>
              <p className="hero-subtitle">Get near-real-time alerts from Google, Yelp, and Facebook, and reply from one dashboard. Setup in 2 minutes.</p>
              <div className="hero-cta">
                <Link to="/register" className="btn btn-primary btn-large">Start {TRIAL_DAYS}-Day Free Trial</Link>
                <Link to="/pricing" className="btn btn-outline btn-large">View Pricing</Link>
              </div>
              <div className="hero-trust">
                <div className="trust-badges">
                  <div className="trust-badge">
                    <Shield className="trust-icon" />
                    <span>Stripe secure payments</span>
                  </div>
                  <div className="trust-badge">
                    <CheckCircle className="trust-icon" />
                    <span>Sign in with Google</span>
                  </div>
                  <div className="trust-badge">
                    <CheckCircle className="trust-icon" />
                    <span>GDPR + PIPEDA compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-image mt-6">
            <MarketingDashboardMock />
          </div>
        </div>
      </section>

      {/* Platform Chips Row */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-gray-500">Integrates with the platforms you use</span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-gray-200">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#1a73e8] text-white font-semibold">G</span>
              Google Business
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-gray-200">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#1877f2] text-white font-semibold">F</span>
              Facebook <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 ring-1 ring-gray-200">Coming soon</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-gray-200">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#d32323] text-white font-semibold">Y</span>
              Yelp <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 ring-1 ring-gray-200">Coming soon</span>
            </span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>

          {/* desktop */}
          <div className="relative mt-8 hidden md:grid md:grid-cols-3 md:gap-8">
            {/* dashed connector */}
            <div className="pointer-events-none absolute inset-x-16 top-7">
              <div className="h-0.5 w-full border-t-2 border-dashed border-gray-200"></div>
            </div>

            {[
              { n: 1, title: "Connect your locations", desc: "Sign in with Google. Import from Google, CSV, or add manually." },
              { n: 2, title: "Get near-real-time alerts", desc: "Email and SMS alerts for new reviews." },
              { n: 3, title: "Reply fast", desc: "Jump straight to the review from your inbox or dashboard." }
            ].map(s => (
              <div key={s.n} className="relative z-10 flex h-full flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm">
                <div className="mx-auto -mt-8 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-semibold shadow ring-1 ring-black/5">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-gray-600">{s.desc}</p>
                <div className="mt-auto h-2" />
              </div>
            ))}
          </div>

          {/* mobile vertical stepper */}
          <ol className="mt-8 space-y-6 md:hidden">
            {[
              { n: 1, title: "Connect your locations", desc: "Sign in with Google. Import from Google, CSV, or add manually." },
              { n: 2, title: "Get near-real-time alerts", desc: "Email and SMS alerts for new reviews." },
              { n: 3, title: "Reply fast", desc: "Jump straight to the review from your inbox or dashboard." }
            ].map(s => (
              <li key={s.n} className="relative border-l-2 border-gray-200 pl-6">
                <span className="absolute -left-2 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 ring-2 ring-white"></span>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Everything you need to stay on top of reviews</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="platform-logos">
                <span className="platform-logo google" aria-label="Google Business Profile" role="img">G</span>
                <span className="platform-logo facebook" aria-label="Facebook" role="img">f</span>
                <span className="platform-logo yelp" aria-label="Yelp" role="img">Y</span>
              </div>
              <h3>Monitors</h3>
              <p>Google Business Profile, Facebook, Yelp.</p>
            </div>
            <div className="feature">
              <div className="feature-icons">
                <Mail size={20} />
                <MessageSquare size={20} />
              </div>
              <h3>Alerts</h3>
              <p>Email + SMS, configurable per location.</p>
            </div>
            <div className="feature">
              <Bell className="feature-icon" />
              <h3>Dashboard</h3>
              <p>All feedback in one place, exports, multi-location support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      {SHOW_SOCIAL_PROOF && (
        <section className="social-proof">
          <div className="container">
            <h2>Trusted by 500+ Local Businesses</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>"ReviewReady helped us catch a bad review within minutes. We responded quickly and turned an angry customer into a happy one!"</p>
                <div className="author">
                  <img src="/images/testimonial-mike.jpg" alt="Mike Chen" className="author-photo" />
                  <div>
                    <strong>Mike Chen</strong>
                    <span>Chen's Restaurant, Toronto</span>
                  </div>
                </div>
              </div>
              <div className="testimonial">
                <p>"I used to check Google and Yelp manually every morning. Now I just get alerts and can focus on running my business."</p>
                <div className="author">
                  <img src="/images/testimonial-lisa.jpg" alt="Lisa Rodriguez" className="author-photo" />
                  <div>
                    <strong>Lisa Rodriguez</strong>
                    <span>Rodriguez Auto Repair, Vancouver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <div className="container">
          <h2 className="section-title">Simple, Affordable Pricing</h2>
          
          {/* Billing Toggle */}
          <div className="billing-toggle">
            <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
            <button 
              className="toggle-switch" 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              aria-label="Toggle between monthly and annual billing"
            >
              <div className={`toggle-slider ${billingCycle === 'annual' ? 'annual' : 'monthly'}`}></div>
            </button>
            <span className={billingCycle === 'annual' ? 'active' : ''}>
              Annual <span className="savings">(Save 20%)</span>
            </span>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">
                ${billingCycle === 'monthly' ? '19' : '15.20'}
                <span>/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                {billingCycle === 'annual' && <div className="billed-annually">Billed annually</div>}
              </div>
              <ul>
                <li><CheckCircle className="check" /> Google Business Profile monitoring</li>
                <li><CheckCircle className="check" /> Email alerts</li>
                <li><CheckCircle className="check" /> Dashboard</li>
                <li><CheckCircle className="check" /> Exports</li>
              </ul>
              <Link to="/register" className="btn btn-primary" aria-label={`Start ${TRIAL_DAYS}-day free trial for Basic plan`}>
                Start {TRIAL_DAYS}-Day Free Trial
              </Link>
              <p className="trial-note">No credit card required</p>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <div className="price">
                ${billingCycle === 'monthly' ? '39' : '31.20'}
                <span>/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                {billingCycle === 'annual' && <div className="billed-annually">Billed annually</div>}
              </div>
              <ul>
                <li><CheckCircle className="check" /> Everything in Basic</li>
                <li><CheckCircle className="check" /> Facebook + Yelp monitoring</li>
                <li><CheckCircle className="check" /> SMS alerts</li>
                <li><CheckCircle className="check" /> Priority support</li>
              </ul>
              <Link to="/register" className="btn btn-primary" aria-label={`Start ${TRIAL_DAYS}-day free trial for Pro plan`}>
                Start {TRIAL_DAYS}-Day Free Trial
              </Link>
              <p className="trial-note">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to protect your reputation?</h2>
          <p>Join businesses who never miss a review.</p>
          <Link to="/register" className="btn btn-primary btn-large" aria-label={`Start your ${TRIAL_DAYS}-day free trial`}>
            Start Your {TRIAL_DAYS}-Day Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="footer-logo" />
            </div>
            <div className="footer-links">
              <Link to="/pricing">Pricing</Link>
              <Link to="/login">Login</Link>
              <Link to="/contact">Contact</Link>
              <a href={`mailto:${CONTACT.support}`} aria-label={`Email Support (${CONTACT.support})`} rel="noopener">Support</a>
              <a href={`mailto:${CONTACT.sales}`} aria-label={`Email Sales (${CONTACT.sales})`} rel="noopener">Sales</a>
              <a href={`mailto:${CONTACT.billing}`} aria-label={`Email Billing (${CONTACT.billing})`} rel="noopener">Billing</a>
              <Link to="/privacy" id="privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/security" id="security">Security</Link>
              <a href={`mailto:${CONTACT.abuse}`} aria-label={`Email Abuse Reports (${CONTACT.abuse})`} rel="noopener">Report abuse</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ReviewReady / The Solution Desk Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
