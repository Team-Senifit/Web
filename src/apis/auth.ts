import { ILoginPayload } from "@/types/ILoginPayload";
import axios from "axios";

export const login = async ({ id, password }: ILoginPayload) => {
  const params = `id=${id}&password=${password}`;

  console.log(params);
  const response = await axios.post(`/api/auth/signin`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true, // 쿠키로 세션 유지
  });

  return response.data;
};
