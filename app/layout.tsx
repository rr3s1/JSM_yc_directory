import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import {Toaster} from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";


const workSans = localFont({
  src: [
    {
      path: "../fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Startups Directory",
  description: "Pitch, Vote & Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
