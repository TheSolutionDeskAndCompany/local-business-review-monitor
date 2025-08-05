import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Simulate API call for forgot password
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      setMessage('Password reset instructions have been sent to your email address.');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    }
    
    setLoading(false);
  };

  if (emailSent) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="logo">
              <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
            </Link>
            <div className="success-icon">
              <Mail size={48} />
            </div>
            <h1>Check Your Email</h1>
            <p>We've sent password reset instructions to <strong>{email}</strong></p>
          </div>

          <div className="auth-form">
            <div className="success-message">
              {message}
            </div>
            
            <div className="auth-actions">
              <Link to="/login" className="btn btn-primary btn-full">
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>

          <div className="auth-footer">
            <p>
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => {
                  setEmailSent(false);
                  setMessage('');
                }} 
                className="link-button"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="logo">
            <img src="/Review-Ready-logo.png" alt="ReviewReady" className="logo-image" />
          </Link>
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you instructions to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              autoFocus
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login" className="link">
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">Start your free trial</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
