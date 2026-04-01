"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X, Cpu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Products", href: "#products" },
  { name: "Why Us", href: "#why-us" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const { theme } = useTheme()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgb(var(--background) / 0)", "rgb(var(--background) / 0.8)"]
  )
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  )

  const borderBottom = useTransform(
    scrollY,
    [0, 100],
    ["1px solid rgb(var(--border) / 0)", "1px solid rgb(var(--border) / 0.1)"]
  )

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ backgroundColor, backdropFilter: backdropBlur, borderBottom }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#1ab8ff] to-[#00e5a0] group-hover:scale-110 transition-transform duration-300">
            <Cpu className="w-6 h-6 text-[#080a0e]" />
          </div>
          <span className="text-xl font-black tracking-tighter text-primary transition-transform duration-300 group-hover:scale-105">SHYAMJI TECH</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link text-muted hover:text-primary transition-colors relative group/link py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/admin"
            className="nav-link text-muted hover:text-primary transition-colors"
          >
            Admin
          </Link>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 rounded-full bg-primary text-background btn-text font-semibold hover:shadow-[0_8px_40px_rgba(26,184,255,0.35)] transition-all"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-b border-border/10 p-6 flex flex-col gap-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-secondary hover:text-primary transition-colors"
            >
              Admin
            </Link>
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] font-black tracking-tight mt-2 shadow-[0_8px_30px_rgba(26,184,255,0.25)]">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
