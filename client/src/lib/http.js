// client/src/lib/http.js
/**
 * Wrapper around fetch that handles:
 * - Adding /api prefix to paths
 * - JSON request/response handling
 * - Cookie authentication
 * - Error handling
 */
export async function api(path, opts = {}) {
  // Default options
  const options = {
    // Include credentials (cookies) with all requests
    credentials: 'include',
    // Default to JSON content type if not specified
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {})
    },
    // Spread any other options
    ...opts,
    // Stringify body if it exists and is an object/array
    body: opts.body && typeof opts.body === 'object' 
      ? JSON.stringify(opts.body) 
      : opts.body,
  };

  try {
    const response = await fetch(`/api${path}`, options);
    
    // Handle empty responses (like 204 No Content)
    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json()
      : {};
    
    // Handle non-2xx responses
    if (!response.ok) {
      const message = data?.message || `Request failed (${response.status})`;
      const error = new Error(message);
      error.status = response.status;
      error.data = data;
      
      // Handle 401 Unauthorized (token expired, etc.)
      if (response.status === 401) {
        // You could trigger a logout or token refresh here if needed
        console.warn('Authentication error:', message);
      }
      
      throw error;
    }
    
    return data;
  } catch (error) {
    // Enhance network errors with more context
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      error.message = 'Network error: Unable to connect to the server';
      error.status = 0;
    }
    throw error;
  }
}
