import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

/**
 * A protected route that requires authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} [props.redirectTo] - Path to redirect to if not authenticated (default: '/login')
 * @param {boolean} [props.requireAdmin=false] - Whether admin privileges are required
 * @returns {JSX.Element} The protected route component
 */
const ProtectedRoute = ({ 
  children, 
  redirectTo = '/login',
  requireAdmin = false,
  ...rest 
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check for admin privileges if required
  if (requireAdmin && !user?.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-center p-8">
                <p className="text-red-600">You don&apos;t have permission to access this page.</p>
                <button
                  onClick={() => navigate(-1)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated (and admin if required), render children
  return children;
};

export default ProtectedRoute;
