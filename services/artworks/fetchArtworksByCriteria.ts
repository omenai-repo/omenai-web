import { getApiUrl } from "@/config";

export async function fetchArtworksByCriteria(
  medium: string,
  page?: number,
  filters?: any
) {
  try {
    const url = getApiUrl();
    const response = await fetch(`${url}/api/artworks/getArtworksByCriteria`, {
      method: "POST",
      body: JSON.stringify({ medium, page, filters }),
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
