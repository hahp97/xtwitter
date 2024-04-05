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
import { authHandler } from "./middleware/authHandler";

const start = async () => {
  const app = express();

  const { db, mongo } = await connectDB();

  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(async (req: any, res: any, next: any) => {
    const accessToken = req.headers["x-token"];
    if (accessToken) {
      // Xác thực accessToken ở đây (hoặc sử dụng middleware authenticateToken từ ví dụ trước)
      // Nếu accessToken hợp lệ, có thể gắn thông tin người dùng vào req.user và tiếp tục xử lý
      const user = tokenize.verify(accessToken);

      // check user in db
      req.user = {
        id: user?.data?.id,
        userName: user?.data?.userName,
      };

      // Nếu accessToken không hợp lệ, có thể chuyển hướng người dùng đến trang đăng nhập
    }
    next();
  });

  app.use(async (req: any, res: any, next: any) => {
    const { id } = req.user || {};
    const user = ObjectId.isValid(id)
      ? await mongo?.User.findOne({ _id: new ObjectId(id) })
      : null;

    req.context = {
      db,
      mongo,
      user,
    };
    next();
  });

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    return res.send("Hello World");
  });

  app.use("/api/v1/auth", authRouter);

  app.use("/api/v1/posts", authHandler, postRouter);

  app.use("/api/v1/comments", authHandler, commentRouter);

  app.listen(configEnviroment.PORT, () => {
    console.log(`Server is running on port: ${configEnviroment.PORT}`);
  });
};

start();
