import express, { RequestHandler } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/users", register as RequestHandler);
router.post("/sessions", login as RequestHandler);
router.post("/logout", logout as RequestHandler);
router.post("/mail-password", forgotPassword as RequestHandler);
router.post("/new-password/:id/:token", resetPassword as RequestHandler);
router.get("/ping", (_req, res) => {
  res.send("pong");
});

export default router;
