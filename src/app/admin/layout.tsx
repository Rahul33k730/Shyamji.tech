"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Cpu, 
  Menu, 
  X,
  MessageCircle,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Pricing", href: "/admin/pricing", icon: Cpu },
  { name: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Chat History", href: "/admin/chats", icon: MessageCircle },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Primary authentication check
  React.useEffect(() => {
    const checkAuth = async () => {
      if (pathname === "/admin/login") {
        return;
      }

      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        router.replace("/admin/login");
      }
    };
    
    checkAuth();
  }, [pathname, router]);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  // While checking auth, show a loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // Force clear cookie on client side too
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 shadow-sm",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="mb-10">
            <Link href="/admin" className="flex items-center group">
              <Logo size="sm" className="[&_span]:text-[#111827]" />
            </Link>
          </div>

          <nav className="flex-1 space-y-1.5">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all mb-4 border border-blue-100 bg-blue-50/50"
            >
              <Globe className="w-5 h-5" />
              Visit Website
            </Link>

            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 ml-4">
              Management
            </div>

            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
                  <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600")} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Topbar */}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden text-gray-600"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black tracking-[2px] text-blue-600 uppercase">Secure Access</span>
              <span className="text-sm font-semibold text-[#111827]">System Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </header>

        <div className="p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
