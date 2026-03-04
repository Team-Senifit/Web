import { ILoginPayload } from "@/types/ILoginPayload";
import axios from "axios";

export const login = async ({ id, password }: ILoginPayload) => {
  const params = new URLSearchParams({ id, password });

  const response = await axios.post(`/api/auth/signin`, params.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true, // 쿠키로 세션 유지
  });

  return response.data;
};
