"use client";

import { usePathname } from "next/navigation";
import { Chatbot } from "@/components/chatbot";

export function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {children}
      {!isAdminPage && <Chatbot />}
    </>
  );
}
