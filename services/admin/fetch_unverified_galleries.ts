import { getApiUrl } from "@/config";

export async function fetchUnverifiedGalleries() {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/admin/get_non_verified_galleries`, {
      method: "GET",
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error: any) {
    console.log(error);
  }
}
