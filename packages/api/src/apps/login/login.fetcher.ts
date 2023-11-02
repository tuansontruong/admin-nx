import { AxiosError } from "../../exceptions";
import { oAuth } from "../../lib/authenticator";

export const loginFetcher = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const { data } = await oAuth.passwordGrant({
      username,
      password,
      audience: process.env.AUTH0_AUDIENCE,
    });
    return data;
  } catch (error) {
    throw new AxiosError(error);
  }
};
