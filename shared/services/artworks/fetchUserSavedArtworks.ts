import { getApiUrl } from "@shared/config";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export async function fetchUserSaveArtworks() {
  const session = await getSession();
  try {
    const url = getApiUrl();
    const response = await fetch(`${url}/api/artworks/getUserSavedArtworks`, {
      method: "POST",
      body: JSON.stringify({ id: session!.user.id }),
    }).then(async (res) => {
      if (!res.ok) return undefined;
      const result = await res.json();

      return result;
    });

    return response;
  } catch (error: any) {
    console.log(error);
  }
}
