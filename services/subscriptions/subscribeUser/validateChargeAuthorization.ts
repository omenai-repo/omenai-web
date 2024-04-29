import { getApiUrl } from "@/config";

export async function validateChargeAuthorization(data: {
  card: string;
  cvv: string;
  month: string;
  year: string;
  authorization: { mode: string; pin: any };
  tx_ref: string;
}) {
  try {
    const url = getApiUrl();
    const res = await fetch(
      `${url}/api/subscriptions/subscribeUser/validateChargeAuthorization`,
      {
        method: "POST",
        body: JSON.stringify({ ...data }),
      }
    );

    const result = await res.json();
    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error: any) {
    console.log(error);
  }
}