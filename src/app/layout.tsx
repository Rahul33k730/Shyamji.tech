import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Chatbot } from "@/components/chatbot";
import { RootWrapper } from "@/components/root-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Shyamji Tech | Building the Future of Intelligent Technology",
  description: "A premium AI and software technology company delivering cutting-edge solutions for global enterprises.",
  icons: {
    icon: [
      { url: "/logo3.jpeg" },
      { url: "/logo3.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo3.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: [
      { url: "/logo3.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/logo3.jpeg",
  },
  verification: {
    google: "IYJEKqM2l04tasdFIxPkzpN-_Q1Eh7Ya020vBSkdWeY",
  },
  openGraph: {
    title: "Shyamji Tech | Building the Future of Intelligent Technology",
    description: "A premium AI and software technology company delivering cutting-edge solutions for global enterprises.",
    url: "https://shyamji.tech",
    siteName: "Shyamji Tech",
    images: [
      {
        url: "/logo3.jpeg",
        width: 800,
        height: 800,
        alt: "Shyamji Tech Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shyamji Tech | Building the Future of Intelligent Technology",
    description: "A premium AI and software technology company delivering cutting-edge solutions for global enterprises.",
    images: ["/logo3.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <RootWrapper>
            {children}
          </RootWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
