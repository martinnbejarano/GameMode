import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { Request, Response } from "express";
import { envConfig } from "../utils/env.config.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, confirmPassword, birthday, type } =
      req.body;

    if (
      !username ||
      !password ||
      !email ||
      !confirmPassword ||
      !type ||
      (type !== "user" && type !== "company")
    ) {
      return res
        .status(400)
        .json({ message: "No se pudo registrar el usuario" });
    }

    if (type === "user" && !birthday) {
      return res.status(400).json({
        message: "La fecha de nacimiento es obligatoria para usuarios",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    let existingAccount;
    if (type === "user") {
      existingAccount = await User.findOne({ email });
    } else if (type === "company") {
      existingAccount = await Company.findOne({ email });
    }

    if (existingAccount) {
      return res.status(400).json({ message: "La cuenta ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newAccount;

    if (type === "user") {
      newAccount = new User({
        username,
        email,
        password: hashedPassword,
        birthday: new Date(birthday),
      });
    } else if (type === "company") {
      newAccount = new Company({
        username,
        email,
        password: hashedPassword,
      });
    }

    if (newAccount) {
      generateTokenAndSetCookie(newAccount._id.toString(), type, res);
      await newAccount.save();
      return res.status(201).json({
        _id: newAccount._id,
        type: type,
      });
    }

    res.status(400).json({ message: "No se pudo crear la cuenta" });
  } catch (error) {
    console.log("Error register controller", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, type } = req.body;

    if (
      !email ||
      !password ||
      !type ||
      (type !== "user" && type !== "company")
    ) {
      return res.status(400).json({ message: "No se pudo iniciar sesión" });
    }

    let account;
    if (type === "user") {
      account = await User.findOne({ email });
    } else if (type === "company") {
      account = await Company.findOne({ email });
    }

    if (!account) {
      return res.status(400).json({ message: "La cuenta no existe" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, account.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "La contraseña es incorrecta" });
    }

    generateTokenAndSetCookie(account._id.toString(), type, res);
    return res.status(200).json({
      _id: account._id,
      username: account.username,
      email: account.email,
      type: type,
    });
  } catch (error) {
    console.log("Error login controller", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Logged out successfully");
  } catch (err) {
    console.log("Error in logout controller", (err as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "El usuario no existe" });
  }

  const token = jwt.sign({ id: user._id }, envConfig.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envConfig.EMAIL_USER,
      pass: envConfig.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: envConfig.EMAIL_USER,
    to: email,
    subject: "Restablecer contraseña",
    text: `${envConfig.FRONTEND_URL}/reset-password/${user._id}/${token}`,
  };

  transporter.sendMail(
    mailOptions,
    (error: Error | null, _info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.log("Error sending email", error);
      } else {
        return res.status(200).json({ message: "Email sent successfully" });
      }
    }
  );
};

export const resetPassword = async (req: Request, res: Response) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "El usuario no existe" });
  }

  jwt.verify(token, envConfig.JWT_SECRET as string, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Token inválido" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      return res
        .status(200)
        .json({ message: "Contraseña restablecida exitosamente" });
    }
  });
};
