import { User, createUser, findUserByEmail } from "../repositories/auth";
import bcrypt from "bcryptjs";

export const registerUser = async (
  user: any,
  mongo: any
): Promise<{
  username: string;
  email: string;
}> => {
  try {
    if (!user.email || !user.password || !user.username) {
      throw new Error("Missing required fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      throw new Error("Invalid email format");
    }

    if (user.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const existingUser = await findUserByEmail(user.email, mongo);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      ...user,
      password: hashedPassword,
    };

    await createUser(newUser, mongo);

    return {
      username: newUser.username,
      email: newUser.email,
    };
  } catch (error: any) {
    throw new Error(error.message);
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
