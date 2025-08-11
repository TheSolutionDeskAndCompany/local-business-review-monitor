import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Bell, 
  Download, 
  ArrowRight, 
  LogOut,
  Clock
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
const KpiBar = ({ metrics }) => {
  if (!metrics) return null;

  const kpis = [
    {
      label: 'New Reviews (7d)',
      value: metrics.newReviews7d || 0,
      delta: metrics.deltas?.newReviews7d,
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      label: 'Avg Rating (30d)',
      value: metrics.avgRating30d ? metrics.avgRating30d.toFixed(1) : '0.0',
      delta: metrics.deltas?.avgRating30d,
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      label: 'Response Rate (30d)',
      value: `${metrics.responseRate30d || 0}%`,
      delta: metrics.deltas?.responseRate30d,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Avg Response Time',
      value: `${metrics.avgResponseHours || 0}h`,
      delta: metrics.deltas?.avgResponseHours,
      icon: Clock,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const isPositive = kpi.delta > 0;
        const deltaColor = isPositive ? 'text-green-600' : 'text-red-600';
        
        return (
          <div key={index} className="rounded-2xl border shadow-sm bg-white p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${kpi.color}`} />
              {kpi.delta && (
                <span className={`text-sm font-medium ${deltaColor}`}>
                  {isPositive ? '+' : ''}{kpi.delta}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-600">{kpi.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// Reviews Inbox Component
const ReviewsInbox = ({ reviews = [] }) => {
  const [filter, setFilter] = useState('all');

  const handleExport = () => {
    console.log('Exporting reviews...');
  };

  const handleReply = (reviewId) => {
    console.log('Replying to review:', reviewId);
  };

  return (
    <div className="rounded-2xl border shadow-sm bg-white">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Reviews Inbox</h2>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          {['all', 'unreplied', 'low-rating'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600 mb-6">Connect Google Business Profile to start monitoring reviews</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Connect Google
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < (review.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{review.platform || 'Google'}</span>
                  </div>
                  <span className="text-sm text-gray-500">{review.date || 'Today'}</span>
                </div>
                <p className="text-gray-900 mb-3">{review.text || 'Great service and friendly staff!'}</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleReply(review.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Reply
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm">
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Connect Platforms Card Component
const ConnectPlatformsCard = ({ providers = [] }) => {
  if (!providers.length) return null;

  return (
    <div className="rounded-2xl border shadow-sm bg-white">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Connected Platforms</h2>
      </div>
      <div className="p-6 space-y-3">
        {providers.map(provider => (
          <div key={provider.id} className="flex items-center justify-between">
            <div className="font-medium text-gray-900">{provider.name}</div>
            {provider.connected ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                Connected
              </span>
            ) : (
              <button 
                onClick={() => {
                  const returnTo = encodeURIComponent('/dashboard');
                  window.location.href = `/api/oauth/${provider.id}/start?return_to=${returnTo}`;
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Alerts Panel Component
const AlertsPanel = ({ alerts = [] }) => (
  <div className="rounded-2xl border shadow-sm bg-white">
    <div className="p-6 border-b">
      <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
    </div>
    <div className="p-6">
      {alerts.length === 0 ? (
        <p className="text-gray-600 text-sm">No recent alerts</p>
      ) : (
        <div className="space-y-3">
          {alerts.slice(0, 3).map(alert => (
            <div key={alert.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${alert.type === 'low_rating' ? 'bg-red-500' : 'bg-yellow-500'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-xs text-gray-600">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Other placeholder components
const AutomationsCard = () => (
  <div className="rounded-2xl border shadow-sm bg-white">
    <div className="p-6 border-b">
      <h2 className="text-lg font-semibold text-gray-900">Automations</h2>
    </div>
    <div className="p-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Auto-reply to 5-star reviews</span>
          <button className="w-10 h-6 bg-gray-200 rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Alert on low ratings</span>
          <button className="w-10 h-6 bg-blue-600 rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PlanCard = () => (
  <div className="rounded-2xl border shadow-sm bg-white">
    <div className="p-6 border-b">
      <h2 className="text-lg font-semibold text-gray-900">Plan & Usage</h2>
    </div>
    <div className="p-6">
      <div className="text-sm text-gray-600 mb-2">Free Trial</div>
      <div className="text-lg font-semibold text-gray-900 mb-4">5 days remaining</div>
      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Upgrade Now
      </button>
    </div>
  </div>
);

const InsightsMini = ({ insights }) => {
  if (!insights) return null;
  
  return (
    <div className="rounded-2xl border shadow-sm bg-white">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Insights (30 days)</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Top Keywords</h3>
            <div className="space-y-2">
              {insights.keywords?.slice(0, 3).map((keyword, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{keyword.word}</span>
                  <span className="text-gray-500">{keyword.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Platform Split</h3>
            <div className="space-y-2">
              {insights.platformSplit?.map((platform, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{platform.platform}</span>
                  <span className="text-gray-500">{platform.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
      const [connectorsRes, metricsRes, reviewsRes, alertsRes, insightsRes] = await Promise.all([
        axios.get('/api/connectors'),
        axios.get('/api/me/metrics?range=30d').catch(() => null),
        axios.get('/api/reviews?limit=50').catch(() => ({ data: { reviews: [] } })),
        axios.get('/api/alerts').catch(() => ({ data: [] })),
        axios.get('/api/insights?range=30d').catch(() => null)
      ]);

      setConnectors(connectorsRes.data);
      setMetrics(metricsRes?.data);
      setReviews(reviewsRes.data.reviews || []);
      setAlerts(alertsRes.data || []);
      setInsights(insightsRes?.data);
      
      const hasConn = connectorsRes.data?.some(c => c.enabled && c.connected);
      setHasConnections(hasConn);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
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

  if (!connectors) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">Error loading dashboard data</div>
      </div>
    );
  }

  const enabledProviders = connectors.filter(c => c.enabled);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
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
