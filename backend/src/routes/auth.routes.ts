import express, { RequestHandler } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/users", register as RequestHandler);
router.post("/login", login as RequestHandler);
router.post("/logout", logout as RequestHandler);
router.get("/ping", (_req, res) => {
  res.send("pong");
});

export default router;