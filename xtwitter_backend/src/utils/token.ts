import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { configEnviroment } from "../config/config";
import { ObjectId } from "mongodb";

interface DecodedToken {
  id: ObjectId;
  userName: string;
}

function generateAccessToken(user: any) {
  const payload = {
    id: user._id,
    userName: user.userName,
  };

  const secret = configEnviroment.JWT_SECRET as string;
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token: string): {
  success: boolean;
  data?: DecodedToken;
  error?: string;
} {
  const secret: string = configEnviroment.JWT_SECRET as string;

  try {
    const decoded: DecodedToken = jwt.verify(token, secret) as DecodedToken;
    return { success: true, data: decoded };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const tokenize = {
  create: generateAccessToken,
  verify: verifyAccessToken,
};
