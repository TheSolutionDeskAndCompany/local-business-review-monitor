# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-08-03

### Added
- Initial release of Local Business Review Monitor MVP
- User authentication system with JWT
- Google Business Profile API integration
- Review monitoring dashboard
- Email notification system
- Stripe payment integration with subscription management
- 7-day free trial system
- CSV/JSON review export functionality
- Modern responsive web interface
- Landing page with pricing information
- User registration and login flows
- Review statistics and analytics
- Platform connection management
- Security features (rate limiting, CORS, input validation)
- Automated review checking every 15 minutes
- MongoDB database integration
- Production-ready deployment configuration

### Features
- **Authentication**: Secure user registration and login
- **Review Monitoring**: Automatic Google Business Profile review tracking
- **Notifications**: Instant email alerts for new reviews
- **Dashboard**: Clean interface for managing reviews and settings
- **Payments**: Subscription billing with Stripe
- **Export**: Download reviews in CSV or JSON format
- **Trial**: 7-day free trial for new users
- **Responsive**: Mobile-friendly design

### Technical Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router, Context API
- **Authentication**: JWT tokens, bcrypt password hashing
- **Payments**: Stripe subscriptions
- **Notifications**: Nodemailer with Gmail SMTP
- **Security**: Helmet.js, rate limiting, CORS protection
- **Monitoring**: Cron jobs for automated review checking

### API Endpoints
- Authentication: `/api/auth/*`
- Business platforms: `/api/business/*`
- Reviews: `/api/reviews/*`
- Payments: `/api/payments/*`

### Deployment
- Heroku-ready with Procfile
- Environment variable configuration
- Production build optimization
- Database connection handling
