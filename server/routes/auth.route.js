import { Router } from "express";
import { getCallback, loggedIn } from "../controllers/auth.controller.js";

const router = Router();

// route for spotify login and callback.
router.get("/login", loggedIn);
router.get("/callback", getCallback);

export default router;
