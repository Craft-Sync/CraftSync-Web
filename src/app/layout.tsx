import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { Provider } from "@/components/Providers/SessionProvider";
import QueryclientProvider from "@/components/Providers/QueryClientProvider";
import 'react-loading-skeleton/dist/skeleton.css'
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className
          )}
        >
          <QueryclientProvider>
            <Navbar />
            <Toaster position="top-center" />
            {children}
          </QueryclientProvider>
        </body>
      </Provider>
    </html>
  );
}
