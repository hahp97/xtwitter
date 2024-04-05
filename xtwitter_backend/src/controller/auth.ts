import express from "express";
import { Request, Response, NextFunction, Router } from "express";
import { User, findUserById } from "../repositories/auth";
import { handleLogin, registerUser } from "../services/auth";
import configDb from "../database";
import { tokenize } from "../utils/token";
import { ObjectId } from "mongodb";

const router = express.Router();

// POST /api/v1/auth/login
router.post("/login", async (req: any, res: Response, next: NextFunction) => {
  // try login
  // if success
  // return access token
  console.log("req.body", req.body);
  try {
    const user = req.body;
    const { mongo } = req.context || {};
    const existingUser = await handleLogin(user, mongo);

    const token = tokenize.create(existingUser);

    res.status(200).send({
      message: "Login success",
      user: {
        userName: existingUser.userName,
        email: existingUser.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/v1/auth/register
router.post("/register", async (req: any, res) => {
  try {
    const { mongo } = req.context || {};
    const user: User = req.body;
    await registerUser(user, mongo);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/v1/auth/logout
router.post("/logout", async (req: any, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout success" });
});

// GET /api/v1/auth/me
router.get("/me", async (req: any, res: any, next: any) => {
  try {
    const accessToken = req.headers["x-token"];
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const user = tokenize.verify(accessToken);
    const { mongo } = req.context || {};

    const userData = await findUserById(new ObjectId(user.data?.id), mongo);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("userData", userData);

    res.status(200).json({
      userName: userData.userName,
      email: userData.email,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
