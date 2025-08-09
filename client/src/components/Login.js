import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Auth Header with Home Button */}
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
          <Link
            to="/"
            className="text-sm font-medium hover:text-brand-700"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="pt-24">
        <div className="auth-container">
          <div className="auth-header">
            <img src="/Review-Ready-logo.png" alt="ReviewReady" className="h-12 w-12 mx-auto mb-4" />
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue monitoring reviews</p>
          </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

          <div className="auth-footer">
            <p>
              Don't have an account? {' '}
              <Link to="/register" className="link">Start your free trial</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
