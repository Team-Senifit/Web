import axios from "axios";
import { AuthError } from "./errors";

export const axiosClient = axios.create({
  baseURL: "",
  withCredentials: true, // 쿠키 인증이면 필수
});

axiosClient.interceptors.request.use((config) => {
  const url = config.url;
  if (typeof url === "string" && !url.startsWith("http")) {
    if (!url.startsWith("/api/")) {
      const base = url.startsWith("/") ? "" : "/";
      if (!config.baseURL) {
        // baseURL이 비어있을 때만 /api를 강제로 붙임
        config.url = `/api${base}${url}`;
      }
    }
  }
  return config;
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
