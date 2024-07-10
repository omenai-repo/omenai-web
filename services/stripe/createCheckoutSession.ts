import { getApiUrl } from "@/config";

export async function createCheckoutSession(
  item: string,
  amount: number,
  gallery_id: string,
  meta: {
    trans_type: string;
    user_id: string;
    user_email: string;
    order_id: string;
  }
) {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/stripe/createCheckoutSession`, {
      method: "POST",
      body: JSON.stringify({ item, amount, gallery_id, meta }),
    });

    const result = await res.json();

    return {
      isOk: res.ok,
      message: result.message,
      url: result.url,
    };
  } catch (error: any) {
    console.log(error);
  }
}
