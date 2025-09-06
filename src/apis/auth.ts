import { ILoginPayload } from "@/types/ILoginPayload";
import { createAxiosServer } from "@/apis/createAxiosServer";

export const login = async ({ id, password }: ILoginPayload) => {
  const params = `id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`;

  const api = await createAxiosServer();
  const response = await api.post(`/auth/signin`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};
