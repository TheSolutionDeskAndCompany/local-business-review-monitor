# 🏪 Local Business Review Monitor

**Never miss a customer review again.**  
Monitor, manage, and get instant alerts for your business's online reviews—all in one dashboard.

> **Contact us for a demo:** support@solutiondesk.ca

---

## 🎯 Who Is This For?

Local Business Review Monitor is a premium service for business owners, managers, and marketing professionals who want to protect their reputation and win more customers. Get notified instantly when a new review appears on Google, Facebook, or Yelp—before it impacts your business.

## ✨ Key Features

- **Instant Email Alerts** - Get notified within minutes of new reviews
- **Unified Dashboard** - Monitor Google, Facebook, and Yelp in one place
- **Easy Setup** - Connect your business profiles in under 60 seconds
- **Smart Analytics** - Track rating trends and response rates
- **Multi-Location Support** - Perfect for franchises and chains
- **Secure & Private** - Your business data stays protected
- **Mobile Responsive** - Manage reviews on any device

## 🚀 How It Works

1. **Sign Up** - Create your account with our 7-day free trial
2. **Connect** - Link your Google Business Profile, Facebook Pages, and Yelp accounts
3. **Monitor** - Receive instant alerts and manage your reputation effortlessly

## 💰 Simple, Transparent Pricing

- **Free Trial** - 7 days, no credit card required
- **Starter** - $19/month (1 business, basic alerts)
- **Professional** - $39/month (up to 5 businesses, advanced analytics)
- **Enterprise** - $79/month (unlimited businesses, priority support)

**Contact sales@solutiondesk.ca for custom pricing and enterprise features.**

## 🔌 Platform Integrations

### Currently Supported
- ✅ **Google Business Profile** (Google Reviews)
- 🔄 **Facebook Pages** (Coming Soon)
- 🔄 **Yelp Business** (Coming Soon)

### On Request
- TripAdvisor, Trustpilot, Better Business Bureau, and more

*Don't see your platform? [Contact us](mailto:support@solutiondesk.ca) to request new integrations.*

## 🛟 Support & Help

We're here to help you succeed:

- 📚 **Help Center**: Contact support@solutiondesk.ca for assistance
- 📧 **Email Support**: support@solutiondesk.ca
- 💬 **Live Chat**: Available in your dashboard
- 📞 **Phone Support**: Available for Professional and Enterprise plans

*Average response time: Under 2 hours during business hours*

## 🔒 Security & Privacy

Your business data is precious. We protect it with:

- **Bank-level encryption** for all data transmission and storage
- **SOC 2 Type II compliance** (certification in progress)
- **GDPR compliant** data handling practices
- **No data sharing** - We never sell or share your business information
- **Regular security audits** and penetration testing

**Privacy Policy available upon request - contact hello@solutiondesk.ca**

## 🏢 About The Solution Desk

Local Business Review Monitor is proudly developed by The Solution Desk, a Canadian technology company specializing in business automation and reputation management solutions.

**Founded**: 2024  
**Headquarters**: Canada  
**Mission**: Helping local businesses thrive in the digital age

## 📞 Contact & Sales

- **General Inquiries**: hello@solutiondesk.ca
- **Sales & Demos**: sales@solutiondesk.ca
- **Technical Support**: support@solutiondesk.ca
- **Partnership Opportunities**: partners@solutiondesk.ca

## 🌟 Customer Success Stories

*"Since using Review Monitor, we've increased our response rate to reviews by 300% and our average rating has improved from 4.2 to 4.7 stars."*  
— Sarah M., Restaurant Owner

*"The instant alerts helped us catch and resolve a service issue before it became a bigger problem. Worth every penny."*  
— Mike T., Auto Repair Shop

**Contact sales@solutiondesk.ca to hear more success stories and case studies.**

## 🚀 Ready to Get Started?

**Start your free 7-day trial today** - no credit card required.

**[Contact Sales for Demo →](mailto:sales@solutiondesk.ca)**

---

## 📄 Legal & License

This repository contains proprietary software and is not open source.  

**Copyright © 2025 The Solution Desk Inc. All rights reserved.**

Unauthorized copying, distribution, or modification of this software is strictly prohibited. This software is licensed, not sold.

*For licensing inquiries or white-label opportunities, contact: licensing@solutiondesk.ca*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Google Business Profile API credentials
- Stripe account for payments

### Installation

1. **Clone and install dependencies:**
```bash
npm install
cd client && npm install && cd ..
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- MongoDB connection string
- Google Business Profile API keys
- Stripe keys
- Email service credentials

3. **Start development servers:**
```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend
cd client && npm start
```

The app will be available at `http://localhost:3000`

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Authentication**: JWT-based user auth
- **Database**: MongoDB with Mongoose
- **Review Monitoring**: Cron jobs checking APIs every 15 minutes
- **Notifications**: Email via Nodemailer, SMS ready
- **Payments**: Stripe subscriptions

### Frontend (React)
- **Routing**: React Router
- **State**: Context API for auth
- **UI**: Custom CSS with modern design
- **Charts**: Chart.js for analytics

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Business Platforms
- `POST /api/business/connect/google` - Connect Google Business Profile
- `GET /api/business/platforms` - Get connected platforms
- `DELETE /api/business/disconnect/:platform` - Disconnect platform

### Reviews
- `GET /api/reviews` - Get user's reviews
- `GET /api/reviews/stats` - Get review statistics
- `PATCH /api/reviews/:id/read` - Mark review as read
- `GET /api/reviews/export` - Export reviews (CSV/JSON)

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/subscription` - Get subscription status

## 🔑 Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/review-monitor

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Google Business Profile API
GOOGLE_API_KEY=your-google-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (Gmail SMTP)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# App
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

## 📋 Features

### MVP Features ✅
- [x] User registration/login
- [x] Google Business Profile integration
- [x] Review dashboard
- [x] Email notifications
- [x] Stripe payments
- [x] CSV export
- [x] Trial management

### Coming Soon 🚧
- [ ] Yelp integration
- [ ] Facebook integration
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Review response templates

## 🚀 Deployment

### Heroku Deployment
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Connect MongoDB Atlas
4. Deploy:
```bash
git push heroku main
```

### Netlify + Backend Hosting
1. Deploy frontend to Netlify
2. Deploy backend to Railway/Render
3. Update CORS and CLIENT_URL settings

## 💰 Business Model

- **Basic Plan**: $19/month - Google monitoring + email notifications
- **Pro Plan**: $39/month - All platforms + SMS + priority support
- **7-day free trial** for all new users

## 🔐 Security

- JWT tokens for authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure password hashing with bcrypt
- CORS protection
- Helmet.js security headers

## 📊 Monitoring

The app automatically checks for new reviews every 15 minutes and:
1. Fetches reviews from connected platforms
2. Stores new reviews in database
3. Sends email/SMS notifications
4. Updates review statistics

## 🆘 Support

For technical support or business inquiries:
- Email: support@reviewmonitor.com
- Documentation: [Coming Soon]

## 📝 License

Private - All rights reserved

---

**Ready to protect your business reputation? Start your free trial today!**
