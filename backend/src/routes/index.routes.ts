import { Router } from "express";
import authRoutes from "./auth.routes.js";
import gameRoutes from "./game.routes.js";
import userRoutes from "./user.routes.js";
import companyRoutes from "./company.routes.js";
import { protectRouteCompany } from "../middlewares/protectRoute.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/games", gameRoutes);
router.use("/users", userRoutes);
router.use("/company", protectRouteCompany, companyRoutes);

export default router;
