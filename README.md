# Local Business Review Monitor

A simple, powerful review monitoring tool for local businesses. Get instant notifications when customers leave reviews on Google Business Profile, Yelp, and Facebook.

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
