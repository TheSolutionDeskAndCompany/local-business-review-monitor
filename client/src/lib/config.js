// client/src/lib/config.js
export const SITE = {
  name: process.env.REACT_APP_SITE_NAME || 'ReviewReady',
  canonical: process.env.REACT_APP_CANONICAL_DOMAIN || '',
  analyticsProvider: process.env.REACT_APP_ANALYTICS_PROVIDER || 'none',
  plausibleDomain: process.env.REACT_APP_PLAUSIBLE_DOMAIN || '',
  sentryDsn: process.env.REACT_APP_SENTRY_DSN || '',
  showSocialProof: (process.env.REACT_APP_SHOW_SOCIAL_PROOF || 'false') === 'true'
};
