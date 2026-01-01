import "dotenv/config";
import app from "./app.js";

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
};

startServer();
