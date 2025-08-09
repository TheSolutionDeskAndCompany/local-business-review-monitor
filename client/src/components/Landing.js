import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, CheckCircle, Mail, MessageSquare, CreditCard } from 'lucide-react';
import { TRIAL_DAYS, SHOW_SOCIAL_PROOF, ALERT_FREQUENCY_COPY } from '../lib/marketing';
import { CONTACT } from '../lib/contacts';
import MarketingDashboardMock from './MarketingDashboardMock';

const Landing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="landing-page">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Never miss a review.</h1>
            <p className="hero-subtitle">
              Get {ALERT_FREQUENCY_COPY} from Google, Yelp, and Facebook, and reply from one dashboard. Setup in 2 minutes.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-large" aria-label={`Start ${TRIAL_DAYS}-day free trial`}>
                Start {TRIAL_DAYS}-Day Free Trial
              </Link>
              <Link to="/pricing" className="btn btn-secondary btn-large" aria-label="View pricing plans">
                View Pricing
              </Link>
            </div>
            <p className="trial-note">No credit card required</p>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <CreditCard size={24} aria-hidden="true" />
                <a href="/security" target="_blank" rel="noopener" aria-label="Learn about Stripe secure payments" title={`Billing questions? Email ${CONTACT.billing}`}>Stripe secure payments</a>
              </div>
              <div className="trust-badge">
                <CheckCircle size={24} aria-hidden="true" />
                <a href="/login" target="_blank" rel="noopener" aria-label="Sign in with Google OAuth">Sign in with Google</a>
              </div>
              <div className="trust-badge">
                <Shield size={24} aria-hidden="true" />
                <a href="/privacy" target="_blank" rel="noopener" aria-label="Learn about GDPR and PIPEDA compliance">GDPR + PIPEDA compliant</a>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <MarketingDashboardMock />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>

          {/* desktop row with connectors */}
          <div className="relative mt-10 hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {/* dashed connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-8 mx-8">
              <div className="h-0.5 w-full border-t-2 border-dashed border-gray-200"></div>
            </div>

            <div className="relative z-10 h-full rounded-2xl border bg-white/70 p-6 text-center shadow-sm">
              <div className="mx-auto -mt-6 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white text-base font-semibold shadow ring-1 ring-black/5">
                1
              </div>
              <h3 className="text-lg font-semibold">Connect your locations</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-600">Sign in with Google. Import from Google, CSV, or add manually.</p>
            </div>

            <div className="relative z-10 h-full rounded-2xl border bg-white/70 p-6 text-center shadow-sm">
              <div className="mx-auto -mt-6 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white text-base font-semibold shadow ring-1 ring-black/5">
                2
              </div>
              <h3 className="text-lg font-semibold">Get near-real-time alerts</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-600">Email and SMS alerts for new reviews.</p>
            </div>

            <div className="relative z-10 h-full rounded-2xl border bg-white/70 p-6 text-center shadow-sm">
              <div className="mx-auto -mt-6 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white text-base font-semibold shadow ring-1 ring-black/5">
                3
              </div>
              <h3 className="text-lg font-semibold">Reply fast</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-600">Jump straight to the review from your inbox or dashboard.</p>
            </div>
          </div>

          {/* mobile vertical stepper - only show on small screens */}
          <ol className="mt-8 space-y-6 lg:hidden">
            <li className="relative border-l-2 border-gray-200 pl-6">
              <span className="absolute -left-2 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 ring-2 ring-white"></span>
              <h3 className="text-base font-semibold">Connect your locations</h3>
              <p className="mt-1 text-sm text-gray-600">Sign in with Google. Import from Google, CSV, or add manually.</p>
            </li>
            <li className="relative border-l-2 border-gray-200 pl-6">
              <span className="absolute -left-2 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 ring-2 ring-white"></span>
              <h3 className="text-base font-semibold">Get near-real-time alerts</h3>
              <p className="mt-1 text-sm text-gray-600">Email and SMS alerts for new reviews.</p>
            </li>
            <li className="relative border-l-2 border-gray-200 pl-6">
              <span className="absolute -left-2 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 ring-2 ring-white"></span>
              <h3 className="text-base font-semibold">Reply fast</h3>
              <p className="mt-1 text-sm text-gray-600">Jump straight to the review from your inbox or dashboard.</p>
            </li>
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
