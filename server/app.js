import express from "express";
import authRouter from "./routes/auth.route.js";
import fetchRouter from "./routes/fetch.route.js";
import roastRouter from "./routes/roast.route.js";
import helmet from "helmet";
import session from "express-session";
import cors from "cors";
import rateLimit from "express-rate-limit";

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

// ratelimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

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

// rate-limiting
app.use(limiter);

// route to OAuth 2.0 implementation of spotify
app.use("/auth", authRouter);

// route to fetch user data from spotify User
app.use("/data", fetchRouter);

// route to get the roast back from the AI model
app.use("/roast", roastRouter);

export default app;
