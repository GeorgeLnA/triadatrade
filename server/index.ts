import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAnalytics } from "./routes/analytics";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Debug endpoint to check environment variables (development only)
  app.get("/api/env-check", (_req, res) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "Not available in production" });
    }
    res.json({
      GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID ? "SET" : "NOT SET",
      GA4_CLIENT_ID: process.env.GA4_CLIENT_ID ? "SET" : "NOT SET",
      GA4_CLIENT_SECRET: process.env.GA4_CLIENT_SECRET ? "SET" : "NOT SET",
      GA4_REFRESH_TOKEN: process.env.GA4_REFRESH_TOKEN ? "SET" : "NOT SET",
      GA4_CLIENT_EMAIL: process.env.GA4_CLIENT_EMAIL ? "SET" : "NOT SET",
      GA4_PRIVATE_KEY: process.env.GA4_PRIVATE_KEY ? "SET" : "NOT SET",
      dotenvLoaded: !!process.env.GA4_PROPERTY_ID || !!process.env.GA4_CLIENT_ID,
    });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/analytics", handleAnalytics);

  return app;
}
