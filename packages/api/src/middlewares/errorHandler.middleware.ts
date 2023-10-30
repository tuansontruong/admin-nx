import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ permissions: null });
  }

  //   uncaught error
  res.status(500).json({
    message: "Internal server error",
  });
};
