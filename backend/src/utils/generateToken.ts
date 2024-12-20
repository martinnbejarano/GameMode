import jwt from "jsonwebtoken";
import { envConfig } from "./env.config.js";
import { Response } from "express";

const generateTokenAndSetCookie = (
  _id: string,
  role: "user" | "company",
  res: Response
) => {
  const token = jwt.sign({ _id, role }, envConfig.JWT_SECRET as string, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndSetCookie;
