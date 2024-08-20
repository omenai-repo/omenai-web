import { getApiUrl } from "@/config";

export async function fetchAllArtworks(user_id: string) {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/viewHistory/getViewHistory`, {
      method: "POST",

      body: JSON.stringify({ user_id }),
    });

    const result = await res.json();
    return { isOk: res.ok, data: result.data, message: result.message };
  } catch (error: any) {
    console.log(error);
  }
}
