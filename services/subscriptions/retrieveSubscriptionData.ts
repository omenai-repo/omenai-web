import { getApiUrl } from "@/config";

export async function retrieveSubscriptionData(gallery_id: string) {
  try {
    const url = getApiUrl();

    const res = await fetch(`${url}/api/subscriptions/getSubscriptionData`, {
      method: "POST",
      body: JSON.stringify({ gallery_id }),
    });

    const result = await res.json();
    console.log(result);

    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error) {
    console.log(error);
  }
}
