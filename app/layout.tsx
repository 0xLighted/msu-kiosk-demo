import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

import Header from "@/components/ui/header";
import { ResponsiveWrapper } from "@/components/layout/responsive-wrapper";
import { UserProvider } from "@/context/user-context";

const lexend = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MSU Smart Kiosk",
  description: "AI-powered Smart Kiosk for Management and Science University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased`}>
        <UserProvider>
          <ResponsiveWrapper className="p-5 gap-5 bg-light text-dark">
            <Header />
            {children}
          </ResponsiveWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
