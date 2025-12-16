/**
 * Helper script to get OAuth 2.0 refresh token
 * 
 * Usage:
 * 1. Set your CLIENT_ID and CLIENT_SECRET below
 * 2. Run: node get-refresh-token.js
 * 3. Follow the instructions to authorize and get your refresh token
 */

const readline = require('readline');
const { OAuth2Client } = require('google-auth-library');

// Replace these with your OAuth 2.0 credentials from Google Cloud Console
const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:8080';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function getRefreshToken() {
  try {
    // Generate the authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/analytics.readonly'],
      prompt: 'consent', // Force consent to get refresh token
    });

    console.log('\n📋 Follow these steps:\n');
    console.log('1. Visit this URL:');
    console.log(authUrl);
    console.log('\n2. Sign in with a Google account that has access to your GA4 property');
    console.log('3. Click "Allow" to grant permissions');
    console.log('4. Copy the authorization code from the redirect URL');
    console.log('   (It will look like: http://localhost:8080/?code=XXXXX)');
    console.log('\n');

    const code = await askQuestion('Paste the authorization code here: ');

    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code.trim());
    
    console.log('\n✅ Success! Your refresh token is:\n');
    console.log(tokens.refresh_token);
    console.log('\n📝 Add this to your .env file as GA4_REFRESH_TOKEN\n');
    
    rl.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

if (CLIENT_ID.includes('YOUR_CLIENT_ID') || CLIENT_SECRET.includes('YOUR_CLIENT_SECRET')) {
  console.error('❌ Please update CLIENT_ID and CLIENT_SECRET in this file first!');
  process.exit(1);
}

getRefreshToken();

