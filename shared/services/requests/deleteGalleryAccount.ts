import { getApiUrl } from "@shared/config";
import { getSession } from "next-auth/react";

export async function deleteAccount(route: RouteIdentifier) {
  const session = await getSession();
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/requests/${route}/deleteAccount`, {
      method: "POST",
      body: JSON.stringify({ id: session?.user.id }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message };
  } catch (error: any) {
    console.log(error);
  }
}
