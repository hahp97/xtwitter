import bcrypt from "bcryptjs";
import connectDb from "../database";
import { ObjectId } from "mongodb";
export interface User {
  userName: string;
  email: string;
  password: string;
  _id?: string;
}

export const createUser = async (user: User, mongo: any): Promise<User> => {
  const { password } = user;
  if (!password) {
    throw new Error("Password is required");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await mongo.User.insertOne({ ...user, password: hashedPassword });
};

export const findUserByEmail = async (
  email: string,
  mg: any
): Promise<User | null> => {
  const { mongo } = await connectDb();
  return await mongo.User.findOne({ email });
};

export const findUserById = async (
  id: ObjectId,
  mongo: any
): Promise<{ email: string; userName: string }> => {
  return await mongo.User.findOne({ _id: id });
};
