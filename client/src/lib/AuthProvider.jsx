import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from './http';

// Create the auth context
export const AuthContext = createContext(null);

/**
 * Custom hook to access the auth context
 * @returns {Object} The auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * AuthProvider component that manages authentication state
 * and provides auth-related methods to child components
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if the user is authenticated by calling the /me endpoint
   */
  const checkAuth = async () => {
    try {
      setLoading(true);
      const { user } = await api('/auth/me');
      setUser(user);
      setError(null);
    } catch (err) {
      // Not logged in or session expired
      setUser(null);
      // Don't show error for 401 (expected when not logged in)
      if (err.status !== 401) {
        setError(err.message || 'Failed to check authentication status');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log in a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { user } = await api('/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  const register = async (email, password) => {
    try {
      setLoading(true);
      const { user } = await api('/auth/register', {
        method: 'POST',
        body: { email, password },
      });
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    try {
      setLoading(true);
      await api('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  /**
   * Request a password reset email
   * @param {string} email - User's email
   */
  const requestPasswordReset = async (email) => {
    try {
      setLoading(true);
      const baseUrl = window.location.origin;
      return await api('/auth/request-reset', {
        method: 'POST',
        body: { email, baseUrl },
      });
    } catch (err) {
      setError(err.message || 'Failed to request password reset');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset password with a reset token
   * @param {string} token - Password reset token
   * @param {string} password - New password
   */
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      return await api('/auth/reset-password', {
        method: 'POST',
        body: { token, password },
      });
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // The context value that will be available to child components
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
    requestPasswordReset,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}
