import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import generateRoast from "../controllers/roast.controller.js";

const router = Router();

router.use(verifyToken);

router.post("/generate", generateRoast);

export default router;
