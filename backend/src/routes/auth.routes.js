import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getCurrentUser);

export default router;