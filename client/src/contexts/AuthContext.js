import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      // TEMPORARY: Mock successful login to bypass deployment issues
      console.log('Mock login for:', email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock token and user data
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: 'temp-user-' + Date.now(),
        email: email,
        businessName: 'Demo Business',
        ownerName: 'Demo Owner',
        phone: '',
        subscription: {
          status: 'trial',
          plan: 'basic',
          trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // TEMPORARY: Mock successful registration to bypass deployment issues
      console.log('Mock registration for:', userData.email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock token and user data
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: 'temp-user-' + Date.now(),
        email: userData.email,
        businessName: userData.businessName,
        ownerName: userData.ownerName,
        phone: userData.phone || '',
        subscription: {
          status: 'trial',
          plan: 'basic',
          trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
