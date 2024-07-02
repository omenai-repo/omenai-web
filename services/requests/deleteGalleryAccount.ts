import { getApiUrl } from "@/config";
import { getSession } from "next-auth/react";

export async function deleteGalleryAccount() {
  const session = await getSession();
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/requests/gallery/deleteAccount`, {
      method: "POST",
      body: JSON.stringify({ gallery_id: session?.user.id }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message };
  } catch (error: any) {
    console.log(error);
  }
}
