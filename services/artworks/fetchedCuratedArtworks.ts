import { getApiUrl } from "@/config";
import filterArtObjectsByMedium from "@/utils/filterArtObjectsByMedium";
import { SessionContextValue } from "next-auth/react";

export const fetchCuratedArtworks = async (
  session: SessionContextValue,
  page: number
) => {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/artworks/getUserCuratedArtworks`, {
      method: "POST",
      body: JSON.stringify({
        preferences: session.data!.user.preferences,
        page,
      }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error: any) {
    console.log(error);
  }
};
