import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const configEnviroment = {
  PORT: process.env.PORT || 5174,
  JWT_SECRET: process.env.JWT_SECRET,
  LOCAL_DB: process.env.LOCAL_DB,
  DB_NAME: process.env.DB_NAME,
};
