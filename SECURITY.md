# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in ReviewMonitor, please report it responsibly.

### How to Report

1. **Email**: Send details to security@reviewmonitor.com
2. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Response Time**: We'll acknowledge your report within 24 hours
- **Updates**: We'll provide updates every 48-72 hours during investigation
- **Resolution**: Critical vulnerabilities will be patched within 7 days
- **Credit**: We'll credit you in our security acknowledgments (unless you prefer anonymity)

### Security Measures

Our application implements:

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Security headers via Helmet.js
- Environment variable protection
- Secure database connections

### Responsible Disclosure

Please do not:
- Publicly disclose the vulnerability before we've had a chance to fix it
- Access user data or disrupt our services
- Perform testing that could harm our users

We appreciate your help in keeping ReviewMonitor secure!
