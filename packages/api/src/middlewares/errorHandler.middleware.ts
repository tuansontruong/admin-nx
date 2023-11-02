import { NextFunction, Request, Response } from "express";
import { AxiosError, BaseError } from "../exceptions";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ permissions: null });
  }

  if (err instanceof AxiosError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof BaseError) {
    const { message, statusCode = 400 } = err;
    res.status(statusCode).json({
      message,
    });
    return;
  }

  //   uncaught error
  res.status(500).json({
    message: "Internal server error",
  });
};
