import { createAxiosServer } from "@/apis/createAxiosServer";

export async function getCenterName(): Promise<string> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return "김현수센터";
  const api = await createAxiosServer();
  const { data } = await api.get("/centers");
  return data?.data?.name ?? "센터";
}
