import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
    console.log(req)
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
