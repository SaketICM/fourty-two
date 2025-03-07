import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "42 - Financial Services",
  description: "Diversify with confidence with InCred Money financial services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

// import type React from "react";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "42 - Financial Services",
//   description: "Diversify with confidence with nDeed Money financial services",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//         <Toaster position="top-center" />
//       </body>
//     </html>
//   );
// }
