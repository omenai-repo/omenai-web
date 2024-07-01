import { getApiUrl } from "@/config";
import { getSession } from "next-auth/react";

export async function getAllArtworksById() {
  const session = await getSession();
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/artworks/getAllArtworksbyId`, {
      method: "POST",
      body: JSON.stringify({ id: session?.user.id }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error: any) {
    console.log(error);
  }
}
