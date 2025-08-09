import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            <img
              src="/Review-Ready-logo.png"
              alt=""
              className="h-6 w-6"
            />
            <span className="text-sm text-gray-600">
              © 2025 ReviewReady. All rights reserved.
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-brand-700">
              Home
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-brand-700">
              Pricing
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-brand-700">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-brand-700">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-brand-700">
              Terms
            </Link>
            <Link to="/security" className="text-gray-600 hover:text-brand-700">
              Security
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
