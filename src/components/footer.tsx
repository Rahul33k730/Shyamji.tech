"use client"

import * as React from "react"
import Link from "next/link"
import { Cpu, Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "News", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Tutorials", href: "#" },
      { name: "Community", href: "#" },
      { name: "Admin Portal", href: "/admin/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Data Security", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/10 pt-20 pb-10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">SHYAMJI TECH</span>
            </Link>
            <p className="text-secondary max-w-xs text-[16px] leading-relaxed font-normal">
              Building the future of intelligent technology with cutting-edge AI and software solutions for the next generation of startups.
            </p>
            <div className="flex gap-4">
              <Link
                href="mailto:shyamjitech33@gmail.com"
                className="p-2 rounded-lg glass hover:text-[#1ab8ff] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-lg glass hover:text-[#1ab8ff] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-[16px] font-semibold text-primary">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-secondary hover:text-primary transition-colors font-normal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] text-muted font-normal">
          <p>© 2026 Shyamji Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Status</Link>
            <Link href="#" className="hover:text-primary transition-colors">Security</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
