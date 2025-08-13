import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  AlertTriangle,
  Building,
  Globe,
  Mail,
  Download,
  Plus,
  X,
  ExternalLink,
  Settings as SettingsIcon,
  Smartphone,
  Monitor
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReport: true,
    frequency: 'immediate'
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    google: { connected: true, businessName: 'Sample Restaurant', lastSync: '2 hours ago' },
    facebook: { connected: false },
    yelp: { connected: false }
  });

  const sidebarSections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'business', label: 'Business Connections', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const platforms = [
    { 
      id: 'google', 
      name: 'Google Business Profile', 
      description: 'Monitor Google Reviews and ratings',
      status: 'mvp',
      icon: '🏢'
    }
  ];

  const handleSave = (section) => {
    // Simulate save action
    console.log(`Saving ${section} settings...`);
    // Show success feedback
  };

  const handlePlatformConnect = (platformId) => {
    if (platformId === 'google') {
      // Simulate Google OAuth flow
      setConnectedPlatforms(prev => ({
        ...prev,
        google: { 
          connected: true, 
          businessName: 'Your Business Name', 
          lastSync: 'Just now' 
        }
      }));
    }
  };

  const handlePlatformDisconnect = (platformId) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platformId]: { connected: false }
    }));
    setShowDisconnectModal(false);
  };

  const renderAccountSection = () => (
    <div className="settings-section">
      <h2>Account Settings</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Email & Password</h3>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="user@example.com" />
          </div>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="settings-actions">
            <button className="btn btn-primary">Update Account</button>
            <button className="btn btn-outline">Cancel</button>
          </div>
        </div>

        <div className="settings-card">
          <h3>Account Status</h3>
          <div className="status-item">
            <span className="status-label">Plan:</span>
            <span className="status-value">Pro Plan</span>
            <span className="status-badge status-active">Active</span>
          </div>
          <div className="status-item">
            <span className="status-label">Trial Ends:</span>
            <span className="status-value">7 days remaining</span>
          </div>
          <div className="status-item">
            <span className="status-label">Businesses Connected:</span>
            <span className="status-value">1 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessSection = () => (
    <div className="settings-section">
      <h2>Business Connections</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Connected Platforms</h3>
          <div className="platform-list">
            {platforms.map(platform => (
              <div key={platform.id} className="platform-item">
                <div className="platform-info">
                  <span className="platform-icon">{platform.icon}</span>
                  <div className="platform-details">
                    <h4>{platform.name}</h4>
                    <p>{platform.description}</p>
                    {connectedPlatforms[platform.id]?.connected && (
                      <div className="connection-status">
                        <span className="business-name">
                          {connectedPlatforms[platform.id].businessName}
                        </span>
                        <span className="last-sync">
                          Last sync: {connectedPlatforms[platform.id].lastSync}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="platform-actions">
                  {platform.status === 'mvp' && (
                    <>
                      {connectedPlatforms[platform.id]?.connected ? (
                        <div className="connected-actions">
                          <button className="btn btn-small btn-outline">
                            <Globe size={14} />
                            Refresh Data
                          </button>
                          <button 
                            className="btn btn-small btn-danger"
                            onClick={() => setShowDisconnectModal(platform.id)}
                          >
                            Disconnect
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-primary"
                          onClick={() => handlePlatformConnect(platform.id)}
                        >
                          <Plus size={16} />
                          Connect
                        </button>
                      )}
                    </>
                  )}
                  {platform.status === 'coming-soon' && (
                    <span className="status-badge status-coming-soon">Coming Soon</span>
                  )}
                  {platform.status === 'requested' && (
                    <span className="status-badge status-requested">On Request</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="platform-request">
            <h4>Request New Platform</h4>
            <p>Don't see your platform? Let us know what you'd like to connect.</p>
            <div className="request-form">
              <input type="text" placeholder="Platform name (e.g., TripAdvisor, BBB)" />
              <button className="btn btn-outline">Request Platform</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="settings-section">
      <h2>Notification Settings</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Email Notifications</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={notifications.emailAlerts}
                  onChange={(e) => setNotifications(prev => ({
                    ...prev, 
                    emailAlerts: e.target.checked
                  }))}
                />
                <span className="toggle-slider"></span>
                Email Alerts for New Reviews
              </label>
            </div>
            <div className="toggle-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={notifications.weeklyReport}
                  onChange={(e) => setNotifications(prev => ({
                    ...prev, 
                    weeklyReport: e.target.checked
                  }))}
                />
                <span className="toggle-slider"></span>
                Weekly Summary Report
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label>Notification Frequency</label>
            <select 
              value={notifications.frequency}
              onChange={(e) => setNotifications(prev => ({
                ...prev, 
                frequency: e.target.value
              }))}
            >
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly Digest</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>

          <div className="settings-actions">
            <button className="btn btn-primary" onClick={() => handleSave('notifications')}>
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="settings-section">
      <h2>Profile Settings</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue="John Doe" />
          </div>
          <div className="form-group">
            <label>Time Zone</label>
            <select defaultValue="America/Los_Angeles">
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Business Logo</label>
            <div className="logo-upload">
              <div className="logo-preview">
                <div className="logo-placeholder">
                  <Building size={32} />
                </div>
              </div>
              <div className="upload-actions">
                <button className="btn btn-outline">Upload Logo</button>
                <p>PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>
          <div className="settings-actions">
            <button className="btn btn-primary">Save Profile</button>
            <button className="btn btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingSection = () => (
    <div className="settings-section">
      <h2>Billing & Subscription</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Current Plan</h3>
          <div className="plan-info">
            <div className="plan-details">
              <h4>Pro Plan</h4>
              <p>$29/month • Up to 5 businesses</p>
              <span className="plan-status">Active until Jan 15, 2025</span>
            </div>
            <button className="btn btn-outline">Change Plan</button>
          </div>
        </div>

        <div className="settings-card">
          <h3>Payment Method</h3>
          <div className="payment-method">
            <div className="card-info">
              <CreditCard size={20} />
              <span>•••• •••• •••• 4242</span>
              <span>Expires 12/26</span>
            </div>
            <button className="btn btn-outline">Update Card</button>
          </div>
        </div>

        <div className="settings-card">
          <h3>Billing History</h3>
          <div className="invoice-list">
            <div className="invoice-item">
              <span>Dec 2024</span>
              <span>$29.00</span>
              <button className="btn btn-small btn-outline">
                <Download size={14} />
                Download
              </button>
            </div>
            <div className="invoice-item">
              <span>Nov 2024</span>
              <span>$29.00</span>
              <button className="btn btn-small btn-outline">
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="settings-section">
      <h2>Security Settings</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Two-Factor Authentication</h3>
          <div className="security-item">
            <div className="security-info">
              <h4>Authenticator App</h4>
              <p>Add an extra layer of security to your account</p>
            </div>
            <div className="security-action">
              {twoFactorEnabled ? (
                <button 
                  className="btn btn-danger"
                  onClick={() => setTwoFactorEnabled(false)}
                >
                  Disable 2FA
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={() => setTwoFactorEnabled(true)}
                >
                  Enable 2FA
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3>Active Sessions</h3>
          <div className="session-list">
            <div className="session-item">
              <div className="session-info">
                <div className="session-device">
                  <Monitor size={16} />
                  <span>Chrome on macOS</span>
                </div>
                <div className="session-details">
                  <span>San Francisco, CA</span>
                  <span>Current session</span>
                </div>
              </div>
            </div>
            <div className="session-item">
              <div className="session-info">
                <div className="session-device">
                  <Smartphone size={16} />
                  <span>Mobile App</span>
                </div>
                <div className="session-details">
                  <span>San Francisco, CA</span>
                  <span>2 hours ago</span>
                </div>
              </div>
              <button className="btn btn-small btn-danger">Revoke</button>
            </div>
          </div>
          <button className="btn btn-outline">Revoke All Other Sessions</button>
        </div>
      </div>
    </div>
  );

  const renderDangerSection = () => (
    <div className="settings-section">
      <h2>Danger Zone</h2>
      <div className="settings-cards">
        <div className="settings-card danger-card">
          <h3>Disconnect All Businesses</h3>
          <p>This will disconnect all your business accounts and stop monitoring reviews. You can reconnect them later.</p>
          <button className="btn btn-danger">Disconnect All</button>
        </div>

        <div className="settings-card danger-card">
          <h3>Delete Account</h3>
          <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button 
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderHelpSection = () => (
    <div className="settings-section">
      <h2>Help & Support</h2>
      <div className="settings-cards">
        <div className="settings-card">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How do I connect my Google Business Profile?</h4>
              <p>Go to Business Connections and click "Connect" next to Google Business Profile.</p>
            </div>
            <div className="faq-item">
              <h4>How often are reviews updated?</h4>
              <p>Reviews are checked every hour and you'll be notified of new reviews based on your notification settings.</p>
            </div>
          </div>
          <button className="btn btn-outline">
            <ExternalLink size={16} />
            View All FAQs
          </button>
        </div>

        <div className="settings-card">
          <h3>Contact Support</h3>
          <p>Need help? Our support team is here to assist you.</p>
          <div className="contact-options">
            <button className="btn btn-primary">
              <Mail size={16} />
              Email Support
            </button>
            <button className="btn btn-outline">
              <HelpCircle size={16} />
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'account': return renderAccountSection();
      case 'business': return renderBusinessSection();
      case 'notifications': return renderNotificationsSection();
      case 'profile': return renderProfileSection();
      case 'billing': return renderBillingSection();
      case 'security': return renderSecuritySection();
      case 'danger': return renderDangerSection();
      case 'help': return renderHelpSection();
      default: return renderAccountSection();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-header">
            <SettingsIcon size={24} />
            <h1>Settings</h1>
          </div>
          <nav className="settings-nav">
            {sidebarSections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="settings-content">
          {renderSection()}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Account</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger">
                <AlertTriangle size={20} />
                <span>This action cannot be undone. All your data will be permanently deleted.</span>
              </div>
              <p>Please type <strong>DELETE</strong> to confirm:</p>
              <input type="text" placeholder="Type DELETE to confirm" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disconnect Platform Modal */}
      {showDisconnectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Disconnect Platform</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDisconnectModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to disconnect this platform? You'll stop receiving review updates until you reconnect.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowDisconnectModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handlePlatformDisconnect(showDisconnectModal)}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
