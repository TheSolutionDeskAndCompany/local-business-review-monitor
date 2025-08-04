const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password for Gmail
  }
});

// Send new review notification
async function sendNewReviewNotification(user, review) {
  try {
    const subject = `New ${review.rating}-star review for ${user.businessName}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Review Alert!</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <strong style="font-size: 18px;">${review.reviewerName}</strong>
            <span style="margin-left: 10px; color: #ffa500;">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </span>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5; margin: 0;">
            "${review.text || 'No comment provided'}"
          </p>
          
          <div style="margin-top: 15px; font-size: 14px; color: #666;">
            <strong>Platform:</strong> ${review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}<br>
            <strong>Date:</strong> ${review.reviewDate.toLocaleDateString()}
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/dashboard" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View in Dashboard
          </a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
          <p>You're receiving this because you have email notifications enabled for new reviews.</p>
          <p>To manage your notification preferences, visit your dashboard settings.</p>
        </div>
      </div>
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: html
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Review notification sent to ${user.email}`);
    
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

// Send welcome email
async function sendWelcomeEmail(user) {
  try {
    const subject = `Welcome to Review Monitor - Your 7-day trial has started!`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Review Monitor, ${user.ownerName}!</h2>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for signing up! Your 7-day free trial has started, and you're all set to monitor reviews for <strong>${user.businessName}</strong>.
        </p>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d5a2d; margin-top: 0;">Next Steps:</h3>
          <ol style="color: #2d5a2d;">
            <li>Connect your Google Business Profile</li>
            <li>Set up your notification preferences</li>
            <li>Explore your review dashboard</li>
          </ol>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/dashboard" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Get Started
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          Need help? Reply to this email or visit our support center.
        </p>
      </div>
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: html
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${user.email}`);
    
  } catch (error) {
    console.error('Welcome email sending error:', error);
  }
}

// Send trial ending reminder
async function sendTrialEndingEmail(user, daysLeft) {
  try {
    const subject = `Your Review Monitor trial ends in ${daysLeft} day${daysLeft > 1 ? 's' : ''}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your trial is ending soon!</h2>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Hi ${user.ownerName}, your 7-day trial for <strong>${user.businessName}</strong> ends in ${daysLeft} day${daysLeft > 1 ? 's' : ''}.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Don't miss out on staying on top of your reviews! Upgrade now to continue monitoring and responding to customer feedback.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/pricing" 
             style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Choose Your Plan
          </a>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Why continue with Review Monitor?</h3>
          <ul>
            <li>Never miss a review again</li>
            <li>Respond faster to customer feedback</li>
            <li>Protect your business reputation</li>
            <li>Simple, affordable pricing</li>
          </ul>
        </div>
      </div>
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: html
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Trial ending email sent to ${user.email}`);
    
  } catch (error) {
    console.error('Trial ending email sending error:', error);
  }
}

module.exports = {
  sendNewReviewNotification,
  sendWelcomeEmail,
  sendTrialEndingEmail
};
