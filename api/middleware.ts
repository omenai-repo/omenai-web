import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Handle preflight requests (OPTIONS)
  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' with 'http://localhost:3000' for specific domain
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  // Set CORS headers for other requests
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' if specific origin is needed
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Authorization check (uncomment if needed)
  // if (
  //   !request.headers.get("Authorization") ||
  //   request.headers.get("Authorization") !==
  //     process.env.NEXT_PUBLIC_API_AUTH_HEADER
  // ) {
  //   return NextResponse.json(
  //     { message: "Unauthorized request" },
  //     { status: 401 }
  //   );
  // }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
