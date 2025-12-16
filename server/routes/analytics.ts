import { RequestHandler } from "express";

interface AnalyticsData {
  users: number | null;
  newUsers: number | null;
  sessions: number | null;
  pageViews: number | null;
  bounceRate: number | null;
  avgSessionDuration: number | null;
  avgEngagementTime: number | null;
  eventCount: number | null;
  activeUsersLast30Min: number | null;
  topPages: Array<{ 
    page: string; 
    pageTitle?: string;
    views: number; 
    users: number | null; 
    eventCount: number | null; 
    bounceRate: number | null;
  }>;
  topCountries: Array<{ country: string; users: number }>;
  topSources: Array<{ source: string; users: number }>;
  topPlatforms: Array<{ platform: string; users: number }>;
  dateRange: {
    start: string;
    end: string;
  };
  errors?: Array<{ metric: string; error: string }>;
}

/**
 * Google Analytics Data Handler
 * 
 * Supports two authentication methods:
 * 
 * METHOD 1: OAuth 2.0 (Recommended - No service account keys needed)
 * Set environment variables:
 *    - GA4_PROPERTY_ID (your GA4 property ID, e.g., "123456789")
 *    - GA4_CLIENT_ID (OAuth 2.0 Client ID)
 *    - GA4_CLIENT_SECRET (OAuth 2.0 Client Secret)
 *    - GA4_REFRESH_TOKEN (OAuth 2.0 Refresh Token)
 * 
 * METHOD 2: Service Account (If organization allows)
 * Set environment variables:
 *    - GA4_PROPERTY_ID (your GA4 property ID, e.g., "123456789")
 *    - GA4_CLIENT_EMAIL (service account email)
 *    - GA4_PRIVATE_KEY (service account private key)
 * 
 * Note: The property ID is numeric, not the measurement ID (G-XXXXXXX)
 * Find it in GA4 Admin > Property Settings > Property ID
 */

export const handleAnalytics: RequestHandler = async (req, res) => {
  try {
    // Get date range from query parameters or use defaults
    const startDate = (req.query.start as string) || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = (req.query.end as string) || new Date().toISOString();
    
    // Ensure dates are valid strings
    if (!startDate || !endDate || typeof startDate !== 'string' || typeof endDate !== 'string') {
      return res.status(400).json({
        error: "Invalid date parameters",
        message: "Start and end dates must be valid ISO date strings",
        errors: [{ metric: 'dateRange', error: 'Invalid date parameters' }]
      });
    }
    
    const propertyId = process.env.GA4_PROPERTY_ID;
    
    // Check for OAuth 2.0 credentials (preferred method)
    const oauthClientId = process.env.GA4_CLIENT_ID;
    const oauthClientSecret = process.env.GA4_CLIENT_SECRET;
    const oauthRefreshToken = process.env.GA4_REFRESH_TOKEN;
    const hasOAuth = propertyId && oauthClientId && oauthClientSecret && oauthRefreshToken;
    
    // Check for Service Account credentials (fallback)
    const clientEmail = process.env.GA4_CLIENT_EMAIL;
    const privateKey = process.env.GA4_PRIVATE_KEY;
    const hasServiceAccount = propertyId && clientEmail && privateKey;

    // Check if we have any credentials to fetch real data
    const hasCredentials = hasOAuth || hasServiceAccount;
    
    // Debug logging - show what environment variables are loaded
    console.log("🔍 GA4 API Check:", {
      hasPropertyId: !!propertyId,
      hasOAuth: !!hasOAuth,
      hasServiceAccount: !!hasServiceAccount,
      hasCredentials: !!hasCredentials,
      propertyId: propertyId,
      envVars: {
        GA4_PROPERTY_ID: propertyId ? `${propertyId.substring(0, 3)}...` : 'NOT SET',
        GA4_CLIENT_ID: oauthClientId ? `${oauthClientId.substring(0, 10)}...` : 'NOT SET',
        GA4_CLIENT_SECRET: oauthClientSecret ? 'SET (hidden)' : 'NOT SET',
        GA4_REFRESH_TOKEN: oauthRefreshToken ? 'SET (hidden)' : 'NOT SET',
        GA4_CLIENT_EMAIL: clientEmail ? `${clientEmail.substring(0, 10)}...` : 'NOT SET',
        GA4_PRIVATE_KEY: privateKey ? 'SET (hidden)' : 'NOT SET',
      }
    });
    
    // Format dates for GA4 API (YYYY-MM-DD format)
    const formatDateForGA4 = (dateStr: string): string => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${dateStr}`);
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    // Validate date range
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return res.status(400).json({
        error: "Invalid date range",
        message: "Start and end dates must be valid ISO date strings",
        errors: [{ metric: 'dateRange', error: 'Invalid date format' }]
      });
    }
    
    if (startDateObj > endDateObj) {
      return res.status(400).json({
        error: "Invalid date range",
        message: "Start date must be before end date",
        errors: [{ metric: 'dateRange', error: 'Start date after end date' }]
      });
    }
    
    // For "all time", GA4 API supports using relative dates like "2020-01-01" or we can use a very early date
    // GA4 data typically goes back to when the property was created (usually 2020 or later)
    const ga4StartDate = formatDateForGA4(startDate);
    const ga4EndDate = formatDateForGA4(endDate);
    
    console.log("📅 Date range for GA4 API:", {
      start: ga4StartDate,
      end: ga4EndDate,
      startISO: startDate,
      endISO: endDate
    });

    if (hasCredentials) {
      try {
        // Dynamic import to avoid requiring the package if not installed
        const { BetaAnalyticsDataClient } = await import('@google-analytics/data');
        const { GoogleAuth } = await import('google-auth-library');
        
        let analyticsDataClient: InstanceType<typeof BetaAnalyticsDataClient>;
        
        if (hasOAuth) {
          // Use OAuth 2.0 authentication with GoogleAuth
          // Following Google's recommended approach for OAuth2 user credentials
          console.log("🔐 Initializing OAuth 2.0 authentication...");
          
          const googleAuth = new GoogleAuth({
            credentials: {
              client_id: oauthClientId!,
              client_secret: oauthClientSecret!,
              refresh_token: oauthRefreshToken!,
              type: 'authorized_user',
            },
            scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
          });
          
          // Verify authentication works by getting credentials
          try {
            const credentials = await googleAuth.getAccessToken();
            console.log("✅ OAuth authentication successful, access token obtained");
          } catch (authError) {
            console.error("❌ OAuth authentication failed:", authError);
            throw new Error(`OAuth authentication failed: ${authError instanceof Error ? authError.message : String(authError)}`);
          }
          
          analyticsDataClient = new BetaAnalyticsDataClient({
            auth: googleAuth,
          });
        } else if (hasServiceAccount) {
          // Use Service Account authentication
          analyticsDataClient = new BetaAnalyticsDataClient({
            credentials: {
              client_email: clientEmail,
              private_key: privateKey.replace(/\\n/g, '\n'),
            },
          });
        } else {
          throw new Error('No valid credentials found');
        }

        // Use Property ID: 516612454
        const propertyIdNum = propertyId?.trim() || '516612454';
        if (!/^\d+$/.test(propertyIdNum)) {
          throw new Error(`Invalid property ID format: "${propertyIdNum}". Property ID must be numeric.`);
        }
        
        const propertyPath = `properties/${propertyIdNum}`;
        console.log("📊 Fetching GA4 data for property:", propertyPath);
        console.log("📅 Date range:", { start: ga4StartDate, end: ga4EndDate });
        
        // Validate dates - ensure they're valid and start is before end
        const startDateObj = new Date(ga4StartDate + 'T00:00:00');
        const endDateObj = new Date(ga4EndDate + 'T23:59:59');
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
          throw new Error(`Invalid date format. Dates must be in YYYY-MM-DD format. Got: ${ga4StartDate} to ${ga4EndDate}`);
        }
        
        if (endDateObj > today) {
          const todayStr = formatDateForGA4(today.toISOString());
          throw new Error(`End date ${ga4EndDate} cannot be in the future. Maximum allowed: ${todayStr}`);
        }
        
        if (startDateObj > endDateObj) {
          throw new Error(`Start date ${ga4StartDate} must be before or equal to end date ${ga4EndDate}.`);
        }

        // Fetch overall metrics - using only valid GA4 metrics
        const [overallReport] = await analyticsDataClient.runReport({
          property: propertyPath,
          dateRanges: [
            {
              startDate: ga4StartDate,
              endDate: ga4EndDate,
            },
          ],
          metrics: [
            { name: 'activeUsers' },
            { name: 'newUsers' },
            { name: 'sessions' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'averageEngagementTime' },
            { name: 'eventCount' },
          ],
        });

        // Fetch top pages with detailed metrics
        const [pagesReport] = await analyticsDataClient.runReport({
          property: propertyPath,
          dateRanges: [
            {
              startDate: ga4StartDate,
              endDate: ga4EndDate,
            },
          ],
          metrics: [
            { name: 'screenPageViews' },
            { name: 'activeUsers' },
            { name: 'eventCount' },
            { name: 'bounceRate' },
          ],
          dimensions: [
            { name: 'pagePath' },
            { name: 'pageTitle' }
          ],
          orderBys: [
            {
              metric: { metricName: 'screenPageViews' },
              desc: true,
            },
          ],
          limit: 10,
        });

        // Fetch top countries
        const [countriesReport] = await analyticsDataClient.runReport({
          property: propertyPath,
          dateRanges: [
            {
              startDate: ga4StartDate,
              endDate: ga4EndDate,
            },
          ],
          metrics: [{ name: 'activeUsers' }],
          dimensions: [{ name: 'country' }],
          orderBys: [
            {
              metric: { metricName: 'activeUsers' },
              desc: true,
            },
          ],
          limit: 10,
        });

        // Fetch additional reports with error handling (each can fail independently)
        let sourcesReport: any = { rows: [] };
        let platformsReport: any = { rows: [] };
        let activeUsers30Min: number | null = null;
        const errors: Array<{ metric: string; error: string }> = [];

        try {
          // Fetch top sources (First user source/medium)
          const sourcesResult = await analyticsDataClient.runReport({
            property: propertyPath,
            dateRanges: [{ startDate: ga4StartDate, endDate: ga4EndDate }],
            metrics: [{ name: 'activeUsers' }],
            dimensions: [{ name: 'firstUserSource' }, { name: 'firstUserMedium' }],
            orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
            limit: 10,
          });
          sourcesReport = sourcesResult[0];
        } catch (e) {
          const errorMsg = e instanceof Error ? e.message : String(e);
          console.warn("⚠️ Failed to fetch sources report:", errorMsg);
          errors.push({ metric: 'topSources', error: errorMsg });
        }

        try {
          // Fetch active users in last 30 minutes
          const now = new Date();
          const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
          const thirtyMinStart = formatDateForGA4(thirtyMinutesAgo.toISOString());
          const thirtyMinEnd = formatDateForGA4(now.toISOString());
          
          const activeUsers30MinResult = await analyticsDataClient.runReport({
            property: propertyPath,
            dateRanges: [{ startDate: thirtyMinStart, endDate: thirtyMinEnd }],
            metrics: [{ name: 'activeUsers' }],
          });
          
          const thirtyMinRows = activeUsers30MinResult[0].rows || [];
          const value = thirtyMinRows[0]?.metricValues?.[0]?.value;
          activeUsers30Min = value ? parseInt(value, 10) : null;
        } catch (e) {
          const errorMsg = e instanceof Error ? e.message : String(e);
          console.warn("⚠️ Failed to fetch active users (last 30 min):", errorMsg);
          errors.push({ metric: 'activeUsersLast30Min', error: errorMsg });
        }

        try {
          // Fetch platforms - users by platform
          const platformsResult = await analyticsDataClient.runReport({
            property: propertyPath,
            dateRanges: [{ startDate: ga4StartDate, endDate: ga4EndDate }],
            metrics: [{ name: 'activeUsers' }],
            dimensions: [{ name: 'platform' }],
            orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
            limit: 10,
          });
          platformsReport = platformsResult[0];
        } catch (e) {
          const errorMsg = e instanceof Error ? e.message : String(e);
          console.warn("⚠️ Failed to fetch platforms report:", errorMsg);
          errors.push({ metric: 'topPlatforms', error: errorMsg });
        }

        // Process overall metrics
        const rows = overallReport.rows || [];
        console.log("📊 Overall report rows:", rows.length);
        console.log("📊 First row metrics:", rows[0]?.metricValues?.map(m => ({ name: m.value })));
        
        const metrics = rows[0]?.metricValues || [];
        
        // Only use real values from API - no fallbacks
        const users = metrics[0]?.value ? parseInt(metrics[0].value, 10) : null;
        const newUsers = metrics[1]?.value ? parseInt(metrics[1].value, 10) : null;
        const sessions = metrics[2]?.value ? parseInt(metrics[2].value, 10) : null;
        const pageViews = metrics[3]?.value ? parseInt(metrics[3].value, 10) : null;
        const bounceRate = metrics[4]?.value ? parseFloat(metrics[4].value) * 100 : null;
        const avgSessionDuration = metrics[5]?.value ? parseFloat(metrics[5].value) : null;
        const avgEngagementTime = metrics[6]?.value ? parseFloat(metrics[6].value) : null;
        const eventCount = metrics[7]?.value ? parseInt(metrics[7].value, 10) : null;
        
        console.log("📊 Processed metrics:", { users, newUsers, sessions, pageViews, bounceRate, avgSessionDuration, avgEngagementTime, eventCount });

        // Process top pages with detailed metrics - only include rows with real data
        const topPages = (pagesReport.rows || [])
          .filter(row => row.metricValues?.[0]?.value) // Only include rows with views data
          .map(row => ({
            page: row.dimensionValues?.[1]?.value || row.dimensionValues?.[0]?.value || '',
            pageTitle: row.dimensionValues?.[0]?.value || '',
            views: parseInt(row.metricValues[0].value, 10),
            users: row.metricValues[1]?.value ? parseInt(row.metricValues[1].value, 10) : null,
            eventCount: row.metricValues[2]?.value ? parseInt(row.metricValues[2].value, 10) : null,
            bounceRate: row.metricValues[3]?.value ? parseFloat(row.metricValues[3].value) * 100 : null,
          }));

        // Process top countries - only include rows with real data
        console.log("🌍 Countries report rows:", countriesReport.rows?.length || 0);
        const topCountries = (countriesReport.rows || [])
          .filter(row => row.metricValues?.[0]?.value) // Only include rows with users data
          .map(row => ({
            country: row.dimensionValues?.[0]?.value || '',
            users: parseInt(row.metricValues[0].value, 10),
          }));

        // Process top sources (First user source/medium) - only include rows with real data
        const topSources = (sourcesReport.rows || [])
          .filter(row => row.metricValues?.[0]?.value) // Only include rows with users data
          .map(row => ({
            source: `${row.dimensionValues?.[0]?.value || ''} / ${row.dimensionValues?.[1]?.value || ''}`,
            users: parseInt(row.metricValues[0].value, 10),
          }));

        // Process platforms - users by platform - only include rows with real data
        const topPlatforms = (platformsReport.rows || [])
          .filter(row => row.metricValues?.[0]?.value) // Only include rows with users data
          .map(row => ({
            platform: row.dimensionValues?.[0]?.value || '',
            users: parseInt(row.metricValues[0].value, 10),
          }));

        const data: AnalyticsData = {
          users,
          newUsers,
          sessions,
          pageViews,
          bounceRate,
          avgSessionDuration,
          avgEngagementTime,
          eventCount,
          activeUsersLast30Min: activeUsers30Min !== null && activeUsers30Min !== undefined ? activeUsers30Min : null,
          topPages,
          topCountries,
          topSources,
          topPlatforms,
          dateRange: {
            start: startDate,
            end: endDate,
          },
          ...(errors.length > 0 && { errors }),
        };

        console.log("✅ Successfully fetched real GA4 data:", {
          users,
          sessions,
          pageViews,
          bounceRate: bounceRate !== null ? bounceRate.toFixed(2) + '%' : 'N/A',
          avgSessionDuration: avgSessionDuration !== null ? Math.floor(avgSessionDuration) + 's' : 'N/A',
          topPagesCount: topPages.length,
          topCountriesCount: topCountries.length,
          dateRange: `${ga4StartDate} to ${ga4EndDate}`
        });
        
        // Log if data seems empty
        if (users === 0 && sessions === 0 && pageViews === 0) {
          console.warn("⚠️ All metrics are zero - this might indicate:");
          console.warn("  1. No data in GA4 for the selected date range");
          console.warn("  2. The property ID might be incorrect");
          console.warn("  3. The account might not have access to this property");
        }
        return res.status(200).json(data);
      } catch (apiError) {
        console.error("❌ Google Analytics API error:", apiError);
        console.error("Error details:", apiError instanceof Error ? apiError.message : String(apiError));
        
        let errorMessage = apiError instanceof Error ? apiError.message : String(apiError);
        let helpfulMessage = errorMessage;
        
        if (apiError instanceof Error) {
          console.error("Error stack:", apiError.stack);
          
          // Check for specific GA4 API error codes
          if (errorMessage.includes('3 INVALID_ARGUMENT') || errorMessage.includes('INVALID_ARGUMENT')) {
            helpfulMessage = `Invalid argument in GA4 API request. This usually means:
- Property ID format is incorrect (should be numeric, e.g., "516612454")
- Date format is invalid
- Metric or dimension name is invalid
- Property ID doesn't exist or you don't have access

Property ID used: ${propertyId}
Date range: ${ga4StartDate} to ${ga4EndDate}`;
            console.error("⚠️ INVALID_ARGUMENT error - check property ID and date format");
          }
          if (errorMessage.includes('invalid_grant') || errorMessage.includes('INVALID_GRANT')) {
            helpfulMessage = "Refresh token is expired or invalid. Please regenerate it using the OAuth 2.0 Playground.";
            console.error("⚠️ Refresh token may be expired or invalid. Please regenerate it.");
          }
          if (errorMessage.includes('insufficient permissions') || errorMessage.includes('PERMISSION_DENIED')) {
            helpfulMessage = "The OAuth account doesn't have access to this GA4 property. Please ensure the account has Viewer or Editor access.";
            console.error("⚠️ The account may not have access to this GA4 property.");
          }
          if (errorMessage.includes('invalid property') || errorMessage.includes('NOT_FOUND')) {
            helpfulMessage = `Property ID "${propertyId}" not found. Please verify the Property ID in GA4 Admin > Property Settings.`;
            console.error("⚠️ The property ID may be incorrect.");
          }
          if (errorMessage.includes('UNAUTHENTICATED')) {
            helpfulMessage = "Authentication failed. Please check your OAuth credentials (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN).";
            console.error("⚠️ Authentication failed - check OAuth credentials");
          }
        }
        
        // Return error - NO FALLBACK DATA
        return res.status(500).json({ 
          error: "Failed to fetch analytics data",
          message: helpfulMessage,
          originalError: errorMessage,
          errors: [{ metric: 'all', error: helpfulMessage }]
        });
      }
    }

    // Return error if credentials are not configured - NO FALLBACK DATA
    console.log("⚠️ No credentials configured - cannot fetch real data");
    return res.status(400).json({ 
      error: "Google Analytics credentials not configured",
      message: "Please configure GA4 credentials in environment variables",
      errors: [{ metric: 'all', error: 'Missing credentials' }]
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ 
      error: "Failed to fetch analytics data",
      message: error instanceof Error ? error.message : "Unknown error",
      errors: [{ metric: 'all', error: error instanceof Error ? error.message : "Unknown error" }]
    });
  }
};

