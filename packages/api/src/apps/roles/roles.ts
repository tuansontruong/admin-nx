import express, { Request, Response } from "express";
import { management } from "../../lib/authenticator";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { data } = await management.clientGrants.getAll();
    return res.status(200).json({
      succeed: data.find((item) => item.audience === process.env.AUTH0_AUDIENCE)
        ?.scope,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      faileds: error,
    });
  }
});

export default router;
