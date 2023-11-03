import { AxiosError } from "axios";

import { APIError } from "@axios";

import { postLogin } from "./login.fetcher";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ access_token: string }> => {
  try {
    const data = await postLogin({ username: email, password });
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new APIError(error.response.data.message);
    }
    throw error;
  }
};
