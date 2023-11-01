import express, { NextFunction, Request, Response } from "express";
import { oAuth } from "../../lib/authenticator";
import { AxiosError } from "../../exceptions";
import { errorHandler } from "../../middlewares";
const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const { data } = await oAuth.passwordGrant({
      username,
      password,
      audience: process.env.AUTH0_AUDIENCE,
    });
    return res.status(200).json(data);
  } catch (error) {
    next(new AxiosError(error));
  }
});

export default router;
