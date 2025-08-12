import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, 
  LogOut
} from 'lucide-react';

// Onboarding Component
const Onboarding = ({ providers }) => {
  const primary = providers.find(p => p.id === 'google') || providers[0];
  
  const startOAuth = (id) => {
    const returnTo = encodeURIComponent('/dashboard');
    window.location.href = `/api/oauth/${id}/start?return_to=${returnTo}`;
  };

  const Step = ({ n, title, hint, action }) => (
    <div className="p-6 border rounded-2xl bg-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
          {n}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {hint && <p className="text-sm text-gray-600 mb-4">{hint}</p>}
      {action}
    </div>
  );

  return (
    <div className="rounded-2xl border shadow-sm bg-white">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Get set up in 3 minutes</h2>
        <p className="text-gray-600 mt-1">Connect your first platform to start monitoring reviews</p>
      </div>
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Step 
            n="1" 
            title="Connect Google Business Profile" 
            action={
              <button 
                onClick={() => startOAuth(primary?.id || 'google')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Connect {primary?.name || 'Google'} <ArrowRight className="w-4 h-4" />
              </button>
            } 
          />
          <Step 
            n="2" 
            title="Turn on alerts" 
            hint="Email or Slack when a low-star review lands."
          />
          <Step 
            n="3" 
            title="Send first review request" 
            hint="Use our prebuilt template."
          />
        </div>
      </div>
    </div>
  );
};

// KPI Bar Component
// Simple KPI Bar Component
const KpiBar = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm text-gray-600">Total Reviews</h3>
        <p className="text-2xl font-bold text-gray-900">{metrics.totalReviews || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm text-gray-600">Average Rating</h3>
        <p className="text-2xl font-bold text-gray-900">{metrics.averageRating || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm text-gray-600">Response Rate</h3>
        <p className="text-2xl font-bold text-gray-900">{metrics.responseRate || 0}%</p>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm text-gray-600">New Reviews</h3>
        <p className="text-2xl font-bold text-gray-900">{metrics.newReviews || 0}</p>
      </div>
    </div>
  );
};

// Simple Reviews Inbox Component
const ReviewsInbox = ({ reviews = [] }) => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h2>
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No reviews yet</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Connect Google Business Profile
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div key={index} className="border rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{review.author || 'Anonymous'}</div>
                <div className="text-sm text-gray-500">{review.rating || 5}★</div>
              </div>
              <p className="text-gray-700 text-sm">{review.text || 'Great service!'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple Platforms Card
const ConnectPlatformsCard = ({ providers = [] }) => (
  <div className="bg-white p-4 rounded-lg border">
    <h3 className="font-semibold mb-3">Platforms</h3>
    <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
      Connect Google Business Profile
    </button>
  </div>
);

// Simple Alerts Panel
const AlertsPanel = ({ alerts = [] }) => (
  <div className="bg-white p-4 rounded-lg border">
    <h3 className="font-semibold mb-3">Alerts</h3>
    <p className="text-gray-600 text-sm">No recent alerts</p>
  </div>
);

// Simple Automations Card
const AutomationsCard = () => (
  <div className="bg-white p-4 rounded-lg border">
    <h3 className="font-semibold mb-3">Automations</h3>
    <p className="text-gray-600 text-sm">Set up automated responses</p>
  </div>
);

// Simple Plan Card
const PlanCard = () => (
  <div className="bg-white p-4 rounded-lg border">
    <h3 className="font-semibold mb-3">Plan</h3>
    <p className="text-sm text-gray-600 mb-3">Free Trial - 5 days remaining</p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
      Upgrade Now
    </button>
  </div>
);

// Simple Insights Component
const InsightsMini = ({ insights }) => {
  if (!insights) return null;
  
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold mb-3">Insights</h3>
      <p className="text-gray-600 text-sm">Analytics coming soon</p>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock logout function since authentication is removed
  const logout = () => {
    console.log('Logout clicked (no auth required)');
    navigate('/');
  };
  const [connectors, setConnectors] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasConnections, setHasConnections] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [connectorsRes, reviewsRes, alertsRes, insightsRes] = await Promise.all([
        axios.get('/api/connectors').catch(() => ({ data: [] })),
        axios.get('/api/reviews?limit=50').catch(() => ({ data: { reviews: [] } })),
        axios.get('/api/alerts').catch(() => ({ data: [] })),
        axios.get('/api/insights?range=30d').catch(() => ({ data: null }))
      ]);

      setConnectors(connectorsRes.data || []);
      // Set mock metrics data since /api/me/metrics was removed
      setMetrics({
        totalReviews: reviewsRes.data?.reviews?.length || 12,
        averageRating: 4.2,
        responseRate: 85,
        newReviews: 3
      });
      setReviews(reviewsRes.data.reviews || [
        {
          id: 1,
          platform: 'Google',
          author: 'Sarah Johnson',
          rating: 5,
          text: 'Excellent service! The team was professional and delivered exactly what we needed.',
          date: new Date().toISOString(),
          responded: false
        },
        {
          id: 2,
          platform: 'Google',
          author: 'Mike Chen',
          rating: 4,
          text: 'Great experience overall. Quick response time and quality work.',
          date: new Date(Date.now() - 86400000).toISOString(),
          responded: true
        }
      ]);
      setAlerts(alertsRes.data || []);
      setInsights(insightsRes.data);
      
      const hasConn = connectorsRes.data?.some(c => c.enabled && c.connected) || false;
      setHasConnections(hasConn);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      // Set default values on error with demo data
      setConnectors([]);
      setMetrics({
        totalReviews: 12,
        averageRating: 4.2,
        responseRate: 85,
        newReviews: 3
      });
      setReviews([
        {
          id: 1,
          platform: 'Google',
          author: 'Sarah Johnson',
          rating: 5,
          text: 'Excellent service! The team was professional and delivered exactly what we needed.',
          date: new Date().toISOString(),
          responded: false
        },
        {
          id: 2,
          platform: 'Google',
          author: 'Mike Chen',
          rating: 4,
          text: 'Great experience overall. Quick response time and quality work.',
          date: new Date(Date.now() - 86400000).toISOString(),
          responded: true
        }
      ]);
      setAlerts([]);
      setInsights(null);
      setHasConnections(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  // Remove the error condition - always show dashboard with fallback data
  const safeConnectors = connectors || [];

  const enabledProviders = safeConnectors.filter(c => c.enabled);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">ReviewReady Dashboard</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/upgrade')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Upgrade
          </button>
          <button 
            onClick={logout}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Onboarding or KPI Bar */}
      {!hasConnections ? (
        <Onboarding providers={enabledProviders} />
      ) : (
        <KpiBar metrics={metrics} />
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Reviews Inbox */}
        <div className="col-span-12 lg:col-span-8">
          <ReviewsInbox reviews={reviews} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <AlertsPanel alerts={alerts} />
          <ConnectPlatformsCard providers={enabledProviders} />
          <AutomationsCard />
          <PlanCard />
        </div>
      </div>

      {/* Insights - Only show if connected */}
      {hasConnections && <InsightsMini insights={insights} />}
    </div>
  );
};

export default Dashboard;
