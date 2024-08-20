import { getApiUrl } from "@/config";

export async function fetchAllArtworks(
  artwork: string,
  artist: string,
  art_id: string,
  user_id: string
) {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/viewHistory/createViewHistory`, {
      method: "POST",

      body: JSON.stringify({ artwork, artist, art_id, user_id }),
    });

    return { isOk: res.ok };
  } catch (error: any) {
    console.log(error);
  }
}
