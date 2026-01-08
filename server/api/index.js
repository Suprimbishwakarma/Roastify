import "dotenv/config";
import app from "../app.js";

// Export the Express app as a Vercel serverless function
// This file is crucial for Vercel to handle requests correctly
export default app;
