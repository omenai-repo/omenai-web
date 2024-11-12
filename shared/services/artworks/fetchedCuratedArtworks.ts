import { getApiUrl } from "@shared/config";
import filterArtObjectsByMedium from "@shared/utils/filterArtObjectsByMedium";
import { SessionContextValue } from "next-auth/react";

export const fetchCuratedArtworks = async (
  session: SessionContextValue,
  page: number,
  filters?: filterOptionsType
) => {
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/artworks/getUserCuratedArtworks`, {
      method: "POST",
      body: JSON.stringify({
        preferences: session.data!.user.preferences,
        page,
        filters,
      }),
    });

    const result = await res.json();

    return {
      isOk: res.ok,
      message: result.message,
      data: result.data,
      pageCount: result.pageCount,
    };
  } catch (error: any) {
    console.log(error);
  }
};
