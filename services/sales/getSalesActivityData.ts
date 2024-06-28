import { getApiUrl } from "@/config";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getCurrentMonthAndYear } from "@/utils/getCurrentMonthAndYear";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export async function getSalesActivityData() {
  const session = await getSession();
  const { year } = getCurrentMonthAndYear();
  try {
    const url = getApiUrl();
    const res = await fetch(`${url}/api/sales/getActivityById`, {
      method: "POST",
      body: JSON.stringify({ id: session?.user.id, year }),
    });

    const result = await res.json();

    return { isOk: res.ok, message: result.message, data: result.data };
  } catch (error: any) {
    console.log(error);
  }
}
