import { getApiUrl } from "@/config";
import { getSession } from "next-auth/react";

export async function updateGalleryPassword(password: string, code: string) {
  const session = await getSession();
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/requests/gallery/updatePassword`, {
      method: "POST",
      body: JSON.stringify({ gallery_id: session?.user.id, password, code }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message };
  } catch (error: any) {
    console.log(error);
  }
}
