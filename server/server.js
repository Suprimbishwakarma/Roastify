import "dotenv/config";
import app from "./app.js";

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
    console.log(
      `Gemini API key Loaded: ${process.env.GEMINI_API_KEY ? "Yes" : "No"}`
    );
  });
};

startServer();
