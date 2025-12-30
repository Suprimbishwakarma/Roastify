import express from "express";
import authRouter from "./routes/auth.route.js";
import helmet from "helmet";
import session from "express-session";
import cors from "cors";

// express app initialization
const app = express();

// middleware configuration
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  })
);

// session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true in production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use("/auth", authRouter);

export default app;
