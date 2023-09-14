import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full text-gray-50 bg-gray-800">
      <body className={`${inter.className} antialiased font-sans h-full`}>
        <div className="p-6 md:p-8 flex flex-col h-full max-w-md mx-auto">
          <h1 className="tracking-tighter font-bold text-5xl">Stocks</h1>

          <div className="grow mt-10 md:mt-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
