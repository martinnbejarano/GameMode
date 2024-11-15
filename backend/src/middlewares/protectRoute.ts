import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { envConfig } from "../utils/env.config.js";
import JwtPayload from "../interfaces/JwtPayload.js";
import CustomRequest from "../interfaces/CustomRequest.js";
import { IUser } from "../interfaces/IUser.js";
import { ICompany } from "../interfaces/ICompany.js";

const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, envConfig.JWT_SECRET as string) as JwtPayload;
};

export const protectRouteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "No autorizado - Token no proporcionado" });
    }

    const decoded = verifyToken(token);

    if (decoded.role !== "user") {
      return res
        .status(403)
        .json({ error: "Prohibido - Acceso solo para usuarios" });
    }

    const user = await User.findById(decoded._id)
      .select("-password -resetPasswordToken")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.user = user as IUser;
    next();
  } catch (err) {
    console.log("Error en middleware protectRouteUser", (err as Error).message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const protectRouteCompany = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "No autorizado - Token no proporcionado" });
    }

    const decoded = verifyToken(token);

    if (decoded.role !== "company") {
      return res
        .status(403)
        .json({ error: "Prohibido - Acceso solo para empresas" });
    }

    const company = await Company.findById(decoded._id).select(
      "-password -resetPasswordToken"
    );

    if (!company) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    req.company = company as ICompany;
    next();
  } catch (err) {
    console.log(
      "Error en middleware protectRouteCompany",
      (err as Error).message
    );
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
