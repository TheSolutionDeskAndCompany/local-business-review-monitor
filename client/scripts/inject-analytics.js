// client/scripts/inject-analytics.js
const fs = require('fs');
const path = require('path');

// Read the environment variables
const env = process.env;

// Check if Plausible is enabled
if (env.REACT_APP_ANALYTICS_PROVIDER === 'plausible' && env.REACT_APP_PLAUSIBLE_DOMAIN) {
  // Create the Plausible script
  const plausibleScript = `
    <script 
      defer 
      data-domain="${env.REACT_APP_PLAUSIBLE_DOMAIN}" 
      src="https://plausible.io/js/script.js"
    ></script>
  `;
  
  // Update the index.html file
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = content.replace(
      '%REACT_APP_ANALYTICS_SCRIPT%',
      plausibleScript
    );
    
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('✅ Injected Plausible analytics script');
  } else {
    console.error('❌ Could not find index.html in build directory');
    process.exit(1);
  }
} else {
  // Remove the placeholder if Plausible is not configured
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = content.replace('%REACT_APP_ANALYTICS_SCRIPT%', '');
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('ℹ️ Analytics not configured - removed placeholder');
  }
}
