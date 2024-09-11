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

  useEffect(() => {
    // Only access localStorage on the client
    if (typeof window !== "undefined") {
      const storedTokens = localStorage.getItem('token');
      const storedTokenExpiry = localStorage.getItem('tokenExpiry');
      setTokens(storedTokens);
      setTokenExpiry(storedTokenExpiry);
    }
  }, []);

  useEffect(() => {
    const refresh = sessionStorage.getItem("refreshes");

    if (!tokens) {
      sessionStorage.removeItem("refreshes");
      if (!pathname.startsWith("/auth")) router.push("/auth/login");
    } else if (!refresh) sessionStorage.setItem("refreshes", "true");
  }, [tokens, pathname, router]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (tokens && tokenExpiry) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("role");
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("role");
    }

    if (!tokens && !pathname.startsWith("/auth")) router.push("/auth/login");
    if (!tokens && pathname.startsWith("/auth")) sessionStorage.removeItem("refreshes");
  }, [pathname, tokens, tokenExpiry, router]);

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
