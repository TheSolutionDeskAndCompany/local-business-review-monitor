import React, { useEffect, useState } from 'react';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Connectors = () => {
  // Mock user data since authentication is removed
  const user = {
    id: 'temp-user',
    email: 'admin@thesolutiondesk.ca',
    businessName: 'The Solution Desk'
  };
  const [providers, setProviders] = useState([]);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnectors();
    checkConnectionStatus();
  }, []);

  const fetchConnectors = async () => {
    try {
      const response = await axios.get('/api/connectors');
      setProviders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch connectors:', error);
      setError('Failed to load available connectors');
      setLoading(false);
    }
  };

  const checkConnectionStatus = () => {
    // Check URL params for connection status
    const urlParams = new URLSearchParams(window.location.search);
    const connected = urlParams.get('connected');
    const errorParam = urlParams.get('error');

    if (connected) {
      setSuccess(`Successfully connected ${connected}!`);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (errorParam) {
      const errorMessages = {
        oauth_denied: 'OAuth authorization was denied',
        invalid_state: 'Invalid OAuth state - please try again',
        session_expired: 'Session expired - please try again',
        user_not_found: 'User session not found',
        oauth_failed: 'OAuth connection failed - please try again',
        oauth_start_failed: 'Failed to start OAuth flow'
      };
      setError(errorMessages[errorParam] || 'Connection failed');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const connect = (id) => {
    setBusy(id);
    setError('');
    setSuccess('');
    
    const returnTo = encodeURIComponent('/dashboard');
    window.location.href = `/api/oauth/${id}/start?return_to=${returnTo}`;
  };

  const disconnect = async (id) => {
    try {
      setBusy(id);
      await axios.post(`/api/business/disconnect/${id}`);
      setSuccess(`Successfully disconnected ${id}`);
      // Refresh connectors to update connection status
      fetchConnectors();
    } catch (error) {
      setError(`Failed to disconnect ${id}`);
    } finally {
      setBusy(null);
    }
  };

  const isConnected = (providerId) => {
    return user?.connectedPlatforms?.some(platform => platform.platform === providerId);
  };

  const getConnectedAccount = (providerId) => {
    return user?.connectedPlatforms?.find(platform => platform.platform === providerId);
  };

  if (loading) {
    return (
      <div className="connectors-section">
        <h3>Platform Connections</h3>
        <div className="loading">Loading available connectors...</div>
      </div>
    );
  }

  const enabledProviders = providers.filter(p => p.enabled);

  if (enabledProviders.length === 0) {
    return (
      <div className="connectors-section">
        <h3>Platform Connections</h3>
        <div className="empty-state">
          <AlertCircle className="empty-icon" />
          <p>No connectors are currently configured.</p>
          <p className="text-small">Contact support to enable platform integrations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="connectors-section">
      <h3>Platform Connections</h3>
      
      {error && (
        <div className="alert alert-error">
          <AlertCircle className="icon" />
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          <CheckCircle className="icon" />
          {success}
        </div>
      )}

      <div className="connectors-grid">
        {enabledProviders.map(provider => {
          const connected = isConnected(provider.id);
          const account = getConnectedAccount(provider.id);
          const isBusy = busy === provider.id;

          return (
            <div key={provider.id} className="connector-card">
              <div className="connector-info">
                <h4>{provider.name}</h4>
                {connected && account && (
                  <div className="connection-details">
                    <CheckCircle className="icon connected" />
                    <span className="status">Connected</span>
                    {account.profileData?.email && (
                      <div className="account-info">
                        {account.profileData.email}
                      </div>
                    )}
                    {account.profileData?.name && account.profileData.name !== account.profileData.email && (
                      <div className="account-name">
                        {account.profileData.name}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="connector-actions">
                {connected ? (
                  <button
                    disabled={isBusy}
                    onClick={() => disconnect(provider.id)}
                    className="btn btn-outline btn-small"
                  >
                    {isBusy ? 'Disconnecting...' : 'Disconnect'}
                  </button>
                ) : (
                  <button
                    disabled={isBusy}
                    onClick={() => connect(provider.id)}
                    className="btn btn-primary btn-small"
                  >
                    {isBusy ? 'Redirecting...' : 'Connect'}
                    <ExternalLink className="icon" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connectors;
