"use client";
import ComponentWrapper from "./components/ComponentWrapper";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@shared/lib/auth/next-auth-options";
import { signOut, useSession } from "next-auth/react";
import {
  notFound,
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { getApiUrl } from "@shared/config";

export default function OrderPayment({
  params,
}: {
  params: { order_id: string };
}) {
  const router = useRouter();
  const route = usePathname();
  const url = getApiUrl();
  const [redirect_uri, set_redirect_uri] = useLocalStorage(
    "redirect_uri_on_login",
    ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = useSearchParams();
  const user_id_key = searchParams.get("id_key");

  const session = useSession();

  useEffect(() => {
    if (session.data === null) {
      toast.error("Error notification", {
        description: "Please login to your account",
        style: {
          background: "red",
          color: "white",
        },
        className: "class",
      });
      router.replace("/auth/login");
    }
    if (user_id_key === "" || undefined) notFound();
    if (
      session.data === null ||
      session!.data.user === undefined ||
      session!.data.user.id !== user_id_key
    ) {
      toast.error("Error notification", {
        description:
          "Unauthorized access detected. Please login to the appropriate account to access this page",
        style: {
          background: "red",
          color: "white",
        },
        className: "class",
      });
      set_redirect_uri(`${url}${route}?id_key=${user_id_key}`);
      router.replace("/auth/login/");
    } else {
      setIsLoggedIn(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ComponentWrapper
      order_id={params.order_id}
      session={session.data}
      isLoggedIn={isLoggedIn}
    />
  );
}
