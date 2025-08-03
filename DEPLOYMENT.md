# Deployment Guide

This guide covers deploying the Local Business Review Monitor to various hosting platforms.

## Quick Deploy Options

### 1. Heroku (Recommended for MVP)

**Prerequisites:**
- Heroku account
- Heroku CLI installed

**Steps:**
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set GOOGLE_API_KEY=your-google-api-key
heroku config:set STRIPE_SECRET_KEY=your-stripe-secret-key
heroku config:set EMAIL_USER=your-email
heroku config:set EMAIL_PASS=your-email-password

# Deploy
git push heroku main
```

### 2. Railway

**Steps:**
1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### 3. Render

**Steps:**
1. Connect GitHub repository
2. Configure build and start commands
3. Set environment variables
4. Deploy

## Environment Variables Required

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
GOOGLE_API_KEY=your-google-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=https://your-domain.com
```

## Database Setup

### MongoDB Atlas (Recommended)
1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for cloud deployment)
5. Get connection string

## Domain Setup

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Point DNS to hosting provider
3. Configure SSL certificate
4. Update CLIENT_URL environment variable

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test user registration/login
- [ ] Test Google Business Profile connection
- [ ] Test email notifications
- [ ] Test Stripe payment flow
- [ ] Verify webhook endpoints
- [ ] Check SSL certificate
- [ ] Monitor application logs
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure backup strategy

## Monitoring

### Recommended Tools
- **Uptime**: UptimeRobot or Pingdom
- **Errors**: Sentry
- **Analytics**: Google Analytics
- **Performance**: New Relic or DataDog

## Scaling Considerations

### Performance Optimization
- Enable MongoDB indexing
- Implement Redis caching
- Use CDN for static assets
- Optimize database queries

### Security
- Enable HTTPS only
- Set up rate limiting
- Regular security updates
- Monitor for vulnerabilities

## Backup Strategy

1. **Database**: Automated MongoDB Atlas backups
2. **Code**: Git repository with tags
3. **Environment**: Documented configuration
4. **Monitoring**: Regular health checks
