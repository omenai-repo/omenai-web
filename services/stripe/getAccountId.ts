import { getApiUrl } from "@/config";

export async function getAccountId(email: string) {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/stripe/getAccountId`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    return {
      isOk: res.ok,
      data: result.data,
    };
  } catch (error: any) {
    console.log(error);
  }
}
