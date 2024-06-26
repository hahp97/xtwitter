import bcrypt from "bcryptjs";
import connectDb from "../database";
import { ObjectId } from "mongodb";
export interface User {
  username: string;
  email: string;
  password: string;
  _id?: string;
}

export const createUser = async (user: User, mongo: any): Promise<User> => {
  const { password } = user;
  if (!password) {
    throw new Error("Password is required");
  }
  return await mongo.User.insertOne({ ...user });
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
): Promise<{ email: string; username: string }> => {
  return await mongo.User.findOne({ _id: id });
};

export const findUserByUsername = async (
  username: string,
  mongo: any
): Promise<User | null> => {
  try {
    return await mongo.User.findOne({ username });
  } catch (error) {
    throw new Error("Database error");
  }
};
