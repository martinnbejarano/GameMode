import { Router } from "express";
import authRoutes from "./auth.routes.js";
import gameRoutes from "./game.routes.js";
import userRoutes from "./user.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/games", gameRoutes);
router.use("/users", userRoutes);

export default router;
