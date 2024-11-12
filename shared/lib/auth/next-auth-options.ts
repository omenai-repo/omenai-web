import { AdminLoginProvider } from "@shared/services/login/AdminLogin";
import { GalleryLoginProvider } from "@shared/services/login/GalleryLogin";
import { IndividualLoginProvider } from "@shared/services/login/IndividualLogin";
import { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 7200 },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    IndividualLoginProvider,
    GalleryLoginProvider,
    AdminLoginProvider,
  ],
  pages: {
    signIn: "/",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: ".omenai.app", // Sets cookie for the entire domain
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "__Host-next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: ".omenai.app",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") return { ...token, ...session.user };
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user = token as any;

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
