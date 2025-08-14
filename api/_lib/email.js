export async function sendEmail({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'no-reply@example.com';
  
  if (!key) {
    // In development or if no API key is provided, return a special response
    return { delivered: false, reason: 'no_api_key' };
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${key}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ from, to, subject, html })
    });
    
    const data = await r.json().catch(() => ({}));
    
    if (!r.ok) {
      throw new Error(data?.message || 'Email send failed');
    }
    
    return { delivered: true, id: data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}
