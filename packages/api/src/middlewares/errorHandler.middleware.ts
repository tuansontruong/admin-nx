import { Request, Response, NextFunction } from "express";
import { AxiosError } from "../exceptions";

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

  //   uncaught error
  res.status(500).json({
    message: "Internal server error",
  });
};
