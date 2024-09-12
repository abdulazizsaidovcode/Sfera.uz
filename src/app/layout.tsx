"use client"; // This file will now be a client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

// Load your custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize a QueryClient
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const pathname = usePathname();
  const [tokens, setTokens] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<string | null>(null);

  // Fetch tokens and token expiry from localStorage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedTokens = localStorage.getItem("token");
  //     const storedTokenExpiry = localStorage.getItem("tokenExpiry");
  //     setTokens(storedTokens);
  //     setTokenExpiry(storedTokenExpiry);
  //   }
  // }, []);

  // // Redirect and token logic
  // useEffect(() => {
  //   if (tokens) {
  //     // If tokens exist, check their expiry
  //     if (tokenExpiry) {
  //       const now = new Date().getTime();
  //       if (now > parseInt(tokenExpiry)) {
  //         // Token is expired, clear storage and redirect
  //         localStorage.clear();
  //         router.push("/auth/login");
  //       }
  //     }
  //   } else {
  //     // Token is missing
  //     if (pathname !== "/" && !pathname.startsWith("/auth")) {
  //       // Only redirect if not on "/" or "/auth/*" pages
  //       localStorage.clear();
  //       router.push("/auth/login");
  //     }
  //   }
  // }, [tokens, tokenExpiry, pathname, router]);

  // // Handle refresh logic
  // useEffect(() => {
  //   const refresh = sessionStorage.getItem("refreshes");

  //   if (!tokens && pathname !== "/" && !pathname.startsWith("/auth")) {
  //     sessionStorage.removeItem("refreshes");
  //     router.push("/auth/login");
  //   } else if (!refresh) {
  //     sessionStorage.setItem("refreshes", "true");
  //   }
  // }, [tokens, pathname, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </body>
      </html>
    </QueryClientProvider>
  );
}
