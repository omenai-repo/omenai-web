import AuthProvider from "@shared/lib/auth/auth-provider";
import { nextAuthOptions } from "@shared/lib/auth/next-auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Providers from "@shared/react-query-provider/Provider";
import LoginModal from "@shared/components/modal/LoginModal";
import RecoveryModal from "@shared/components/modal/RecoveryModal";
import { OrderReceivedModal } from "@shared/components/modal/OrderConfirmedModal";
import { ThemeProvider } from "./material_tailwind/MaterialTailwindExports";
import { Toaster } from "sonner";

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
        <Toaster
          position="top-right"
          expand
          visibleToasts={3}
          closeButton
          duration={7000}
        />
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
