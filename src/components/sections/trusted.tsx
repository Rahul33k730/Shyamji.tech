"use client"

import * as React from "react"
import { motion } from "framer-motion"

const companies = [
  { name: "TechVistara", icon: "🚀" },
  { name: "Innovate India", icon: "🇮🇳" },
  { name: "SaaSFlow", icon: "⚡" },
  { name: "NextGen AI", icon: "🧠" },
  { name: "CloudCore", icon: "☁️" },
  { name: "DeltaApps", icon: "📐" },
  { name: "FinTech Pro", icon: "💳" },
  { name: "AgroTech", icon: "🌱" },
  { name: "EduPulse", icon: "🎓" },
  { name: "HealthSync", icon: "🏥" }
]

export function Trusted() {
  return (
    <section className="py-12 bg-background/50 border-y border-border/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-secondary opacity-60">
          Trusted by Innovative Teams Across India
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1500] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 sm:gap-24 pr-12 sm:pr-24"
          >
            {[...companies, ...companies].map((company, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <span className="text-xl sm:text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                  {company.icon}
                </span>
                <span className="text-lg sm:text-xl font-black tracking-tighter text-secondary group-hover:text-primary transition-colors duration-300 opacity-40 group-hover:opacity-100">
                  {company.name.toUpperCase()}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  )
}
