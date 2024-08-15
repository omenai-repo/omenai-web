import { getApiUrl } from "@/config";

export async function downgradeSubscriptionPlan(
  data: NextChargeParams,
  gallery_id: string
) {
  try {
    const url = getApiUrl();
    const res = await fetch(
      `${url}/api/subscriptions/downgradeSubscriptionPlan`,
      {
        method: "POST",
        body: JSON.stringify({ data, gallery_id }),
      }
    );

    const result = await res.json();
    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error: any) {
    console.log(error);
  }
}
