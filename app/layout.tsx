import type { Metadata } from "next";
import "./globals.css";
import { GlobalHeader } from "@/components/ui/GlobalHeader";
import { GlobalFooter } from "@/components/ui/GlobalFooter";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://gospels-mu.vercel.app"),
  title: "GOSPELS — Gothenburg Ministry Hub",
  description:
    "A sacred, modern digital platform connecting worshipers, choirs, partner churches, and community members through events, prayer, giving, and volunteer ministry across Gothenburg.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#F9FAFB] text-on-surface antialiased font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <GlobalHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <GlobalFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
