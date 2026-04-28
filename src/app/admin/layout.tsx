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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-medium">Verifying Session...</p>
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#0f0f0f] border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="mb-10">
            <Link href="/admin" className="flex items-center group">
              <Logo size="sm" className="[&_span]:text-white" />
            </Link>
          </div>

          <nav className="flex-1 space-y-1.5">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-400 hover:text-white hover:bg-blue-500/10 transition-all mb-4 border border-blue-500/10"
            >
              <Globe className="w-5 h-5" />
              Visit Website
            </Link>

            <div className="text-[10px] font-black text-gray-600 uppercase tracking-[2px] mb-4 ml-4">
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
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/5 lg:hidden text-white"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black tracking-[2px] text-blue-500 uppercase">Secure Access</span>
              <span className="text-sm font-semibold text-white">System Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
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
