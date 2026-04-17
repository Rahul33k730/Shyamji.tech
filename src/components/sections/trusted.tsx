"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Cloud, Triangle, CreditCard, Sprout, GraduationCap, Activity, Globe, Zap, Shield, Database, Cpu, Layout } from "lucide-react"

const companies = [
  { name: "CloudCore", icon: Cloud, color: "text-blue-500" },
  { name: "DeltaApps", icon: Triangle, color: "text-emerald-500" },
  { name: "FinTech Pro", icon: CreditCard, color: "text-amber-500" },
  { name: "AgroTech", icon: Sprout, color: "text-green-500" },
  { name: "EduPulse", icon: GraduationCap, color: "text-purple-500" },
  { name: "HealthSync", icon: Activity, color: "text-red-500" },
  { name: "Nexus", icon: Globe, color: "text-indigo-500" },
  { name: "Quantum", icon: Zap, color: "text-yellow-500" },
  { name: "Zenith", icon: Shield, color: "text-cyan-500" },
  { name: "SaaSFlow", icon: Database, color: "text-pink-500" },
  { name: "NextGen AI", icon: Cpu, color: "text-orange-500" },
  { name: "TechVistara", icon: Layout, color: "text-blue-600" }
]

export function Trusted() {
  const [clickedLogos, setClickedLogos] = React.useState<Set<number>>(new Set())

  const toggleLogo = (index: number) => {
    setClickedLogos(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section className="pt-12 pb-16 bg-[#F9FAFB] border-y border-[#E5E7EB] overflow-hidden">
      <div className="container-custom mb-8">
        <p className="text-center text-[12px] font-bold uppercase tracking-[2px] text-[#6B7280]">
          Trusted by Innovative Teams Across India
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        {/* Infinite Scroll Container */}
        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16"
          >
            {[...companies, ...companies].map((company, i) => {
              const isClicked = clickedLogos.has(i % companies.length)
              return (
                <button 
                  key={i} 
                  onClick={() => toggleLogo(i % companies.length)}
                  className={`flex items-center gap-3 text-xl md:text-2xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none ${
                    company.color
                  }`}
                >
                  <company.icon className={`w-6 h-6 md:w-8 md:h-8`} />
                  <span className="tracking-tighter">
                    {company.name.toUpperCase()}
                  </span>
                </button>
              )
            })}
          </motion.div>
        </div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10" />
      </div>
    </section>
  )
}
