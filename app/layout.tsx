import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacOS Design",
  description: "Front-end design system for MacOS-inspired web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
