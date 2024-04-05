import { User, createUser, findUserByEmail } from "../repositories/auth";
import bcrypt from "bcryptjs";

export const registerUser = async (user: any, mongo: any): Promise<User> => {
  try {
    const existingUser = await findUserByEmail(user.email, mongo);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    return await createUser(user, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const handleLogin = async (user: User, mongo: any): Promise<User> => {
  try {
    const existingUser = await findUserByEmail(user.email, mongo);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(user.password, existingUser.password);

    if (isValid) {
      return existingUser;
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
