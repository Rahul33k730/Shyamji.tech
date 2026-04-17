"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Redirect on success
        window.location.href = "/admin";
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Please enter a correct username and password for a staff account. Note that both fields may be case-sensitive.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] text-[#333] font-sans">
      {/* Brand Header */}
      <div className="mb-8">
        <Logo size="lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] px-4"
      >
        <div className="bg-white border border-[#dee2e6] rounded shadow-sm overflow-hidden">
          {/* Card Header (Django Teal/Blue) */}
          <div className="bg-[#1A56DB] px-5 py-3 border-b border-[#1A56DB]">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">
              Administration Login
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-50 border-l-4 border-red-500 rounded flex gap-3 items-start"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-medium text-red-700 leading-relaxed">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#666] flex items-center gap-2 uppercase tracking-wide">
                  Email address:
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#999] group-focus-within:text-[#1A56DB] transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#ccc] rounded text-sm placeholder-[#999] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB]/20 transition-all"
                    placeholder="admin@shyamji.tech"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-[#666] flex items-center gap-2 uppercase tracking-wide">
                    Password:
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#999] group-focus-within:text-[#1A56DB] transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#ccc] rounded text-sm placeholder-[#999] focus:outline-none focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB]/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-2.5 px-4 bg-[#1A56DB] hover:bg-[#1E3A8A] text-white text-xs font-bold uppercase tracking-[0.1em] rounded shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
                  isLoading && "cursor-wait"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Support Links */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#999] font-medium">
            &copy; {new Date().getFullYear()} Shyamji Tech. Secure Administration.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
