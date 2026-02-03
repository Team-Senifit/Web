import axios from "axios";
import { AuthError } from "./errors";

export const axiosClient = axios.create({
  baseURL: "",
  withCredentials: true, // 쿠키 인증이면 필수
});

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      // 여기서는 '어디로 갈지'까지만 지정, next는 클라이언트에서 붙임
      throw new AuthError("/login");
    }
    throw error;
  },
);
