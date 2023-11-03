import { axiosClient } from "@axios";

interface PostLoginRequest {
  username: string;
  password: string;
}

interface PostLoginResponse {
  access_token: string;
}

export const postLogin = async (
  payload: PostLoginRequest
): Promise<PostLoginResponse> => {
  const { data } = await axiosClient.post("/api/login", payload);
  return data;
};
