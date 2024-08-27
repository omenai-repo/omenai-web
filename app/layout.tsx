import AuthProvider from "@/lib/auth/auth-provider";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Providers from "@/react-query-provider/Provider";
import LoginModal from "@/components/modal/LoginModal";
import RecoveryModal from "@/components/modal/RecoveryModal";
import { OrderReceivedModal } from "@/components/modal/OrderConfirmedModal";
import { ThemeProvider } from "./material_tailwind/MaterialTailwindExports";
import { Toaster } from "react-hot-toast";

const nunito_sans = Inter({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Omenai",
  description: "Omenai Homepage",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  return (
    <html lang="en">
      <body className={`${nunito_sans.className} flex flex-col justify-center`}>
        <NextTopLoader color="#1A1A1A" height={6} />
        <Toaster />
        <AuthProvider session={session}>
          <ThemeProvider>
            <Providers>
              <LoginModal />
              <RecoveryModal />
              <OrderReceivedModal />
              {children}
              <SpeedInsights />
            </Providers>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
