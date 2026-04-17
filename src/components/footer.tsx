"use client"

import * as React from "react"
import Link from "next/link"
import { Linkedin, Twitter, Instagram, Github } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1E3A8A] text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Logo size="md" className="[&_span]:text-white" />
            </Link>
            <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
              Engineering high-performance digital solutions for startups and enterprises across India and the globe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-sm active:scale-95"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-sm active:scale-95"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-sm active:scale-95"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-sm active:scale-95"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#why-us" className="hover:text-white transition-colors">Why Choose Us</Link></li>
              <li><Link href="/#process" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Services</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link href="/#services" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Mobile Apps</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">AI & Automation</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Data Engineering</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-blue-200/60 font-medium">
          <p>&copy; {currentYear} Shyamji Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
