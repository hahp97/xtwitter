import { Request, Response, NextFunction } from "express";
import { tokenize } from "../utils/token";
import { UnauthenticatedError } from "../errors/unauthenticatedError";

const authenticateUser = async (req: any, res: any, next: any) => {
  const accessToken = req.headers["x-token"];
  if (accessToken) {
    try {
      const user = tokenize.verify(accessToken);
      req.context.user = user?.data;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid access token" });
    }
  } else {
    next();
  }
};

export default authenticateUser;
