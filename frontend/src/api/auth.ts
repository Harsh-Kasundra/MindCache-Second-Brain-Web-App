import api from "./axios";

export const signInUser = async (user_email: string, password: string) => {
  const response = await api.post("/auth/signin", { user_email, password });
  return response.data;
};

export const signUpUser = async (
  username: string,
  user_email: string,
  password: string,
) => {
  const response = await api.post("/auth/signup", {
    username,
    user_email,
    password,
  });
  return response.data;
};
