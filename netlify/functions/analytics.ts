import { handleAnalytics } from "../../server/routes/analytics";

// Netlify Function handler for /api/analytics
// We intentionally avoid Express/serverless-http in production functions to prevent bundling/runtime issues.
export const handler = async (event: any) => {
  const start = event?.queryStringParameters?.start;
  const end = event?.queryStringParameters?.end;

  let statusCode = 200;
  let payload: any = null;

  const res: any = {
    headersSent: false,
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(obj: any) {
      payload = obj;
      this.headersSent = true;
      return this;
    },
  };

  const req: any = {
    query: {
      ...(start ? { start } : {}),
      ...(end ? { end } : {}),
    },
  };

  try {
    await handleAnalytics(req, res);
  } catch (e) {
    statusCode = 500;
    payload = {
      error: "Failed to fetch analytics data",
      message: e instanceof Error ? e.message : String(e),
    };
  }

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(payload ?? {}),
  };
};


