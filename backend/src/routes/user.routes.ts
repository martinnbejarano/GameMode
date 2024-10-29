import express, { RequestHandler } from "express";
import { protectRouteUser } from "../middlewares/protectRoute.js";
import CustomRequest from "../interfaces/CustomRequest.js";
const router = express.Router();

router.get("/ping", protectRouteUser, (req: CustomRequest, res) => {
  if (!req.user) {
    console.log(req);
    return res.status(401).send("Usuario no autorizado");
  }
  const { _id } = req.user;

  res.json({ id: _id });
});

export default router;
