import { Router } from 'express';
import { createPurchase } from '../controllers/purchase.controller.js'
import { protectRouteUser } from "../middlewares/protectRoute.js";

const router = Router();

router.post('/create', protectRouteUser, createPurchase);


export default router; 