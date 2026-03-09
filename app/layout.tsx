import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Masjid Al-Ikhlas Seksyen 13",
  description: "Masjid Al-Ikhlas Seksyen 13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} h-full overflow-hidden`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
