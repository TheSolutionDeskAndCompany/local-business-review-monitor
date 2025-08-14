import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsMenuOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Don't show navbar on auth pages
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(
    location.pathname
  );

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-logo">
            <Link to="/" onClick={closeAllMenus}>
              <img
                src="/Review-Ready-logo.png"
                alt="ReviewReady"
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="mobile-menu-icon"></span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                onClick={closeAllMenus}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/pricing"
              className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Pricing
            </Link>
          </div>
          
          <div className="nav-actions">
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="user-menu-button"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="user-avatar">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
                
                <div 
                  className={`user-dropdown ${isMenuOpen ? 'show' : ''}`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/profile"
                    className="user-dropdown-item"
                    onClick={closeAllMenus}
                  >
                    Profile
                  </Link>
                  <div className="user-dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="user-dropdown-item"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="btn btn-link"
                  onClick={closeAllMenus}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  onClick={closeAllMenus}
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Heroicon name: outline/menu */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              location.pathname === '/'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`${
                location.pathname === '/dashboard'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/pricing"
            className={`${
              location.pathname === '/pricing'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Pricing
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.email || 'User'}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link
          to="/"
          className="mobile-nav-link"
          onClick={closeAllMenus}
        >
          Home
        </Link>
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="mobile-nav-link"
            onClick={closeAllMenus}
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/pricing"
          className="mobile-nav-link"
          onClick={closeAllMenus}
        >
          Pricing
        </Link>
        
        {!isAuthenticated ? (
          <>
            <div className="mobile-nav-divider"></div>
            <Link
              to="/login"
              className="mobile-nav-link"
              onClick={closeAllMenus}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="mobile-nav-link btn btn-primary"
              onClick={closeAllMenus}
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <div className="mobile-nav-divider"></div>
            <Link
              to="/profile"
              className="mobile-nav-link"
              onClick={closeAllMenus}
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="mobile-nav-link text-left"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
