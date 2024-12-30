import express from "express";
import { signup, login , logout } from "../controllers/auth.controller.js";
const router = express.Router();


// Routes beginning with /api/auth
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout",logout)

export default router;