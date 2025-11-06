import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controller/AuthController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await login(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) await logout(token);
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    next(error);
  }
});

router.post("/me", authenticate, async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let user;
    if (token) {
      user = await getCurrentUser(token);
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

export default router;
