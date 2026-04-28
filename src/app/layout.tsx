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
    icon: "/logo3.jpeg",
    apple: "/logo3.jpeg",
    shortcut: "/logo3.jpeg",
  },
  verification: {
    google: "IYJEKqM2I04tasd...",
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
