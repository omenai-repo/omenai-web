import { getApiUrl } from "@/config";

export async function verifyGalleryRequest(name: string) {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/verification/verifyGallery`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message };
  } catch (error: any) {
    console.log(error);
  }
}
