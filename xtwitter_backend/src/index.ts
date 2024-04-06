import { ObjectId } from "mongodb";
import { configEnviroment } from "./config/config";
import connectDB from "./database";
import express from "express";
import cors from "cors";
import authRouter from "./controller/auth";
import bodyParser from "body-parser";
import { tokenize } from "./utils/token";
import cookieParser from "cookie-parser";
import postRouter from "./controller/post";
import commentRouter from "./controller/comment";
import getUserData from "./middleware/getUserData ";
import authenticateUser from "./middleware/authHandler";
import likeRouter from "./controller/like";

const start = async () => {
  const app = express();

  const { db, mongo } = await connectDB();

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:5000"],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(async (req: any, res: any, next: any) => {
    req.context = { db, mongo };
    next();
  });

  app.use("/api/v1", authenticateUser, getUserData);

  app.get("/", (req, res) => {
    return res.send("Hello World");
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/comments", commentRouter);
  app.use("/api/v1/likes", likeRouter);

  app.listen(configEnviroment.PORT, () => {
    console.log(`Server is running on port: ${configEnviroment.PORT}`);
  });
};

start();
