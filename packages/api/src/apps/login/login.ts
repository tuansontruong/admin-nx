import express, { NextFunction, Request, Response } from "express";
import { BaseError } from "../../exceptions";
import { loginFetcher } from "./login.fetcher";
const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BaseError("Email and Password are required", 400);
    }
    const userCredentials = await loginFetcher({ username, password });
    return res.status(200).json(userCredentials);
  } catch (error) {
    next(error);
  }
});

export default router;
