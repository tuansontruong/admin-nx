import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@routes";
import { APIError } from "@axios";

import { loginUser } from "./login.service";

export const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<null | string>(null);

  const onLogin = async () => {
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      setIsLoading(true);

      const data = await loginUser(email, password);

      window.localStorage.setItem("access_token", data.access_token);

      navigate(PATHS.APP_PATH);
    } catch (error) {
      if (error instanceof APIError) {
        setError(error.message);
      }
      // show error floater if unknown error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    onLogin,
    error,
  };
};
