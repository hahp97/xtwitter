import { ErrorRequestHandler } from "express";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { UnauthorisedError } from "../errors/unauthorisedError";
import { NoResultReturnedError } from "../errors/noResultReturnedError";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof UnauthenticatedError) {
    res.status(401).json({
      message: "Request is unauthenticated",
      description: error.message,
    });
    return;
  }

  if (error instanceof UnauthorisedError) {
    res.status(403).json({
      message: "Request is unauthorised",
      description: error.message,
    });
    return;
  }

  if (error instanceof NoResultReturnedError) {
    res.status(404).json({
      message: "No result returned",
      description: error.message,
    });
    return;
  }

  if (error.name === "BadRequestError") {
    res.status(400).json({
      message: "Bad request",
      description: error.message,
    });
    return;
  }

  res.status(500).json({
    message: "An unexpected error occurred",
    description: (error as Error).message,
  });
};
