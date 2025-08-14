// client/src/lib/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = { hasError: false, error: null }; 
  }
  
  static getDerivedStateFromError(error) { 
    return { hasError: true, error }; 
  }
  
  componentDidCatch(error, info) { 
    console.error('ErrorBoundary caught an error:', error, info);
    if (window.Sentry?.captureException) {
      window.Sentry.captureException(error, { extra: info });
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          className="p-4 max-w-2xl mx-auto my-8 bg-red-50 border border-red-200 rounded-lg text-center"
        >
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
