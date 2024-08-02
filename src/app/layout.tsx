import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claudinova",
  description: "Claudinova",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
