# Google Analytics 4 (GA4) API Setup Guide

This guide will help you connect your admin panel to real Google Analytics data.

## Prerequisites

- A Google Cloud Platform (GCP) account
- A Google Analytics 4 (GA4) property
- Access to your GA4 property's Admin settings

## Authentication Methods

This guide provides **two authentication methods**:

1. **OAuth 2.0** (Recommended) - Works even if your organization blocks service account keys
2. **Service Account** (Alternative) - Only if your organization allows service account key creation

**If you see "Service account key creation is disabled"**, use **Method 1: OAuth 2.0** below.

---

## Method 1: OAuth 2.0 Authentication (Recommended)

This method doesn't require service account keys and works with organization policies that block key creation.

### Step 1: Get Your GA4 Property ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Click **Admin** (gear icon) in the bottom left
4. Under **Property**, click **Property Settings**
5. Find your **Property ID** (it's a numeric ID like `123456789`, NOT the Measurement ID `G-XXXXXXX`)
6. **Save this number** - you'll need it for `GA4_PROPERTY_ID`

### Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click **New Project**
4. Enter a project name (e.g., "Triada Trade Analytics")
5. Click **Create**

### Step 3: Enable Google Analytics Data API

1. In your Google Cloud project, go to **APIs & Services** > **Library**
2. Search for "Google Analytics Data API"
3. Click on **Google Analytics Data API**
4. Click **Enable**

### Step 4: Configure OAuth Consent Screen (IMPORTANT!)

**This step is critical - if skipped, you'll get "access_denied" errors!**

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** (unless you have a Google Workspace)
3. Click **Create**
4. Fill in the required fields:
   - **App name**: Triada Trade Analytics (or any name)
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click **Save and Continue**
6. On the **Scopes** page:
   - Click **Add or Remove Scopes**
   - Search for and add: `https://www.googleapis.com/auth/analytics.readonly`
   - Click **Update** then **Save and Continue**
7. On the **Test users** page:
   - Click **Add Users**
   - Add **your Google account email** (the one you'll use to authorize)
     - **Important**: Use the EXACT email you'll sign in with (e.g., `davidnuk877@gmail.com`)
   - Add any other emails that need access
   - Click **Add** then **Save and Continue**
8. Review and click **Back to Dashboard**

**CRITICAL - Avoid Verification:**
- **Keep the app in "Testing" mode** - DO NOT publish it to production
- Testing mode = No verification needed (works immediately)
- Production mode = Requires Google verification (takes weeks)
- Only test users you add can authorize (this is fine for your use case)
- **Make sure your email is EXACTLY in the test users list!**

**If you see "can only be accessed by developer-approved testers":**
- Go back to **OAuth consent screen** → **Test users**
- Make sure your email is added (check spelling - must match exactly)
- Click **Save**
- Wait a few minutes for changes to propagate
- Try authorizing again

### Step 5: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Name it (e.g., "Triada Analytics OAuth")
5. Under **Authorized redirect URIs**, add **BOTH** of these:
   - `https://developers.google.com/oauthplayground` (for OAuth Playground)
   - `http://localhost:8080` (for local dev)
6. Click **Create**
7. **Save the Client ID and Client Secret** - you'll need these

### Step 6: Get Refresh Token

You need to authorize the application once to get a refresh token. Here's how:

#### Option A: Using OAuth 2.0 Playground (Easiest)

**IMPORTANT**: Make sure you added `https://developers.google.com/oauthplayground` to your OAuth client's authorized redirect URIs in Step 4!

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right
3. Check **"Use your own OAuth credentials"**
4. Enter your **Client ID** and **Client Secret** from Step 4
5. **IMPORTANT**: In the left panel, **DO NOT use the dropdown menus**. Instead:
   - Look for the text field labeled **"Step 1: Select & authorize APIs"**
   - **Manually type** this exact scope in the text field:
     ```
     https://www.googleapis.com/auth/analytics.readonly
     ```
   - Do NOT select from any dropdown - type it directly!
6. Click **Authorize APIs**
7. Sign in with a Google account that has access to your GA4 property
8. Click **Allow** to grant permissions
9. Click **Exchange authorization code for tokens**
10. Copy the **Refresh token** - this is your `GA4_REFRESH_TOKEN`

**If you get "redirect_uri_mismatch" error:**
- Go back to Google Cloud Console → Credentials → Your OAuth Client
- Make sure `https://developers.google.com/oauthplayground` is in the **Authorized redirect URIs** list
- Save and try again

**If you get "invalid_scope" error:**
- Make sure you **manually typed** the scope: `https://www.googleapis.com/auth/analytics.readonly`
- Do NOT use dropdown menus - they add incorrect scope formats
- The scope must be entered exactly as shown above

#### Option B: Using a Script (Alternative)

Create a temporary script to get the refresh token (see troubleshooting section for script example).

### Step 7: Set Environment Variables

#### For Local Development (.env file)

Create a `.env` file in the root of your project:

```env
GA4_PROPERTY_ID=123456789
GA4_CLIENT_ID=your-client-id.apps.googleusercontent.com
GA4_CLIENT_SECRET=your-client-secret
GA4_REFRESH_TOKEN=your-refresh-token
```

#### For Production (Netlify)

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add these four variables:
   - `GA4_PROPERTY_ID` = Your property ID
   - `GA4_CLIENT_ID` = Your OAuth Client ID
   - `GA4_CLIENT_SECRET` = Your OAuth Client Secret
   - `GA4_REFRESH_TOKEN` = Your refresh token

### Step 8: Test the Connection

1. Start your development server: `npm run dev`
2. Navigate to `/admin` and log in
3. The admin panel should now show real Google Analytics data!

---

## Method 2: Service Account Authentication (Alternative)

**Only use this if your organization allows service account key creation.**

## Step-by-Step Setup

### Step 1: Get Your GA4 Property ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Click **Admin** (gear icon) in the bottom left
4. Under **Property**, click **Property Settings**
5. Find your **Property ID** (it's a numeric ID like `123456789`, NOT the Measurement ID `G-XXXXXXX`)
6. **Save this number** - you'll need it for `GA4_PROPERTY_ID`

### Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click **New Project**
4. Enter a project name (e.g., "Triada Trade Analytics")
5. Click **Create**

### Step 3: Enable Google Analytics Data API

1. In your Google Cloud project, go to **APIs & Services** > **Library**
2. Search for "Google Analytics Data API"
3. Click on **Google Analytics Data API**
4. Click **Enable**

### Step 4: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Enter a name (e.g., "triada-analytics-service")
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

### Step 5: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create** - this will download a JSON file
6. **Keep this file secure** - it contains sensitive credentials

### Step 6: Grant Service Account Access to GA4

1. Open the downloaded JSON file
2. Copy the `client_email` value (looks like `xxxxx@xxxxx.iam.gserviceaccount.com`)
3. Go back to Google Analytics
4. Click **Admin** > **Property Access Management**
5. Click the **+** button > **Add users**
6. Paste the `client_email` from the JSON file
7. Select **Viewer** role (minimum required)
8. Click **Add**

### Step 7: Extract Credentials from JSON

Open the downloaded JSON file and extract these values:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "xxxxx@xxxxx.iam.gserviceaccount.com",
  ...
}
```

You need:
- `client_email` → This is your `GA4_CLIENT_EMAIL`
- `private_key` → This is your `GA4_PRIVATE_KEY` (keep the `\n` characters)
- Property ID from Step 1 → This is your `GA4_PROPERTY_ID`

### Step 8: Set Environment Variables

#### For Local Development (.env file)

Create a `.env` file in the root of your project (if it doesn't exist):

```env
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**
- The `GA4_PRIVATE_KEY` must be wrapped in quotes
- Keep the `\n` characters in the private key
- The private key should be on a single line with `\n` for line breaks

#### For Production (Netlify)

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add these three variables:
   - `GA4_PROPERTY_ID` = Your property ID
   - `GA4_CLIENT_EMAIL` = Your service account email
   - `GA4_PRIVATE_KEY` = Your private key (with quotes and `\n` characters)

### Step 9: Test the Connection

1. Start your development server: `npm run dev`
2. Navigate to `/admin` and log in
3. The admin panel should now show real Google Analytics data!

## Troubleshooting

### Error: "Failed to fetch analytics data"

- **Check environment variables**: Make sure all three variables are set correctly
- **Check service account access**: Verify the service account email has Viewer access in GA4
- **Check API is enabled**: Ensure Google Analytics Data API is enabled in GCP
- **Check property ID**: Make sure you're using the numeric Property ID, not the Measurement ID

### Error: "Permission denied"

- The service account needs Viewer access in GA4
- Go to GA4 Admin > Property Access Management and add the service account email

### Error: "Invalid credentials"

- Double-check the `GA4_PRIVATE_KEY` format - it must include the `\n` characters
- Make sure the private key is wrapped in quotes in your `.env` file
- Verify the `GA4_CLIENT_EMAIL` matches the service account email exactly

### Still seeing mock data?

- Check the server console for error messages
- Verify environment variables are loaded: Add `console.log(process.env.GA4_PROPERTY_ID)` temporarily
- Make sure you're using the correct Property ID (numeric, not G-XXXXXXX)

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit your `.env` file or service account JSON to version control
- The `.env` file is already in `.gitignore`
- Keep your service account credentials secure
- Rotate keys periodically for security

## Need Help?

If you encounter issues:
1. Check the server console logs for detailed error messages
2. Verify all steps above were completed correctly
3. Ensure the Google Analytics Data API is enabled in your GCP project
4. Confirm the service account has proper permissions in GA4

