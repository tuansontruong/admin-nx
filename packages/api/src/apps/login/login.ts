import express, { Request, Response } from "express";
import { oAuth } from "../../lib/authenticator";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const data = await oAuth.passwordGrant({
      username,
      password,
      audience: process.env.AUTH0_AUDIENCE,
    });
    return res.status(200).json({
      succeed: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      succeed: error,
    });
  }
});

export default router;