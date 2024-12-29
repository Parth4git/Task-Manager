import express from "express";
const router = express.Router();
import { getProfile } from "../controllers/profileController.js";
import{ verifyAccessToken } from "../middlewares/index.js";

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getProfile);

export default router;