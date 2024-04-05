import { RequestHandler } from "express";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { UnauthorisedError } from "../errors/unauthorisedError";

export const authHandler: RequestHandler = (req: any, res: any, next: any) => {
  const { user } = req.context || {};

  if (!user) {
    return new UnauthenticatedError("Unauthenticated");
  }

  next();
};
