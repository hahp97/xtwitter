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
  try {
    const user = req.body;
    const { mongo } = req.context || {};

    if (!user.email || !user.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await handleLogin(user, mongo);

    const token = tokenize.create(existingUser);

    res.status(200).send({
      message: "Login success",
      user: {
        username: existingUser.username,
        email: existingUser.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/v1/auth/register
router.post("/register", async (req: any, res: Response) => {
  try {
    const { mongo } = req.context || {};
    const user: User = req.body;

    if (!user.email || !user.password || !user.username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = await registerUser(user, mongo);

    console.log({ newUser });
    res.status(201).json({
      message: "User created",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/v1/auth/me
router.get("/me", async (req: any, res: Response) => {
  try {
    const { mongo, user } = req.context || {};

    const userInfo = await findUserById(new ObjectId(user._id), mongo);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user: {
        username: userInfo.username,
        email: userInfo.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
