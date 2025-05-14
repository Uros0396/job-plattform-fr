import "./globals.css";
import ReduxProvider from "../store/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La tua App",
  description: "App con Redux + Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
