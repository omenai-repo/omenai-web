import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { URLS } from "./constants/middleware_constants/urls";

const userDashboardRegex = /\/dashboard\/user\/.*/;
const galleryDashboardRegex = /\/dashboard\/gallery\/.*/;
const purchasePageRegex = /\/purchase\/.*/;
const paymentPageRegex = /\/payment\/.*/;

function redirect(url: string, request: NextRequest) {
  return NextResponse.redirect(new URL(url, request.url));
}
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      // Handle unauthenticated requests
      return NextResponse.rewrite(
        new URL("/auth/login/secure/admin", request.url)
      ); // Redirect to login page
    }
  } else {
    const isUserDashboard = userDashboardRegex.test(request.url);
    const isGalleryDashboard = galleryDashboardRegex.test(request.url);
    const isPurchasePage = purchasePageRegex.test(request.url);
    const isPaymentPage = paymentPageRegex.test(request.url);

    if (token) {
      switch (token.role) {
        case "user":
          if (isGalleryDashboard) {
            return redirect(URLS.userLogin, request);
          }
          break;
        case "gallery":
          if (isUserDashboard || isPurchasePage || isPaymentPage) {
            return redirect(URLS.userLogin, request);
          }
        case "admin":
          if (
            isGalleryDashboard ||
            isUserDashboard ||
            isPurchasePage ||
            isPaymentPage
          ) {
            return redirect(URLS.userLogin, request);
          }
      }
    } else {
      if (
        isUserDashboard ||
        isPurchasePage ||
        isGalleryDashboard ||
        isPaymentPage
      ) {
        return redirect(URLS.userLogin, request);
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/verify/:path*",
    "/admin/:path*",
    "/purchase/:path*",
    "/payment/:path*",
  ],
};
