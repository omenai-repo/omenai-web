import { getApiUrl } from "@shared/config";
import { getSession } from "next-auth/react";

export async function updatePassword(
  password: string,
  code: string,
  route: RouteIdentifier
) {
  const session = await getSession();
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/requests/${route}/updatePassword`, {
      method: "POST",
      body: JSON.stringify({ id: session?.user.id, password, code }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message };
  } catch (error: any) {
    console.log(error);
  }
}
