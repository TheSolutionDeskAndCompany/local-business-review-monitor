# ReviewReady (fresh)

A modern, production-ready review management platform that helps local businesses monitor and respond to reviews across multiple platforms from a single dashboard.

## Core Features

- 📊 Unified review inbox across Google Business Profile, Facebook, and Yelp
- ⚡ Real-time review monitoring with email alerts
- 📈 Performance analytics and response time tracking
- ✨ Clean, accessible UI with dark/light mode
- 🔒 Secure authentication with email/password
- 🚀 Built with Next.js, Vercel, and Postgres

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with email/password
- **Deployment**: Vercel
- **Monitoring**: Vercel Analytics

## Environment Variables

Create a `.env.local` file with:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/reviewready?schema=public"

# Authentication
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=no-reply@reviewready.app
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT
