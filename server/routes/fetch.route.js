import { Router } from "express";
import {
  getUserdata,
  getUserPlaylists,
} from "../controllers/fetch.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use(verifyToken);

// returns combined user data. userData, topTracks, TopArtists, etc.
router.get("/user", getUserdata);

// returns playlists for a specific user or playlist id.
router.get("/playlist/:id", getUserPlaylists);

export default router;
