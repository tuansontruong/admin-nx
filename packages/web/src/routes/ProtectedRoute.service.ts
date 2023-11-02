import { AxiosError } from "axios";
import axiosClient from "../axios/apiClient";

export const validateToken = async () => {
  try {
    const { data } = await axiosClient.get("/validate-token");
    return data.permissions;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null;
    }
  }
};
