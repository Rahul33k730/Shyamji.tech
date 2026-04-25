"use client"

import * as React from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Star, Users, Briefcase, Globe, Monitor, Smartphone, Cpu, Database, Layout, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ParticleNetwork } from "@/components/ui/particle-network"

function Counter({ target, suffix = "", delay = 0 }: { target: number, suffix?: string, delay?: number }) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  React.useEffect(() => {
    if (isInView) {
      let start = 0
      const end = target
      const duration = 2000
      const increment = end / (duration / 16)
      
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(interval)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
        return () => clearInterval(interval)
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, target, delay])

  return <span ref={ref}>{count}{suffix}</span>
}

function RotatingText() {
    const texts = [
      "App Development", 
      "AI & Automation", 
      "Elite Web Tech", 
      "Smart Tech", 
      "AI-Driven Growth", 
      "Scalable Systems",
      "Elite Web Apps", 
      "NextGen Apps",
      "SaaS Solutions", 
      "Cloud Systems", 
      "Data Engineering"
    ]
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[1.4em] relative overflow-hidden inline-block align-bottom min-w-[280px] sm:min-w-[650px] ml-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-0 bottom-0 text-[#1A56DB] whitespace-nowrap pb-1"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const statsData = [
  { label: "Platforms Deployed", value: 50, suffix: "+" },
  { label: "Success Rate", value: 98, suffix: "%" },
  { label: "Velocity Index", value: 3, suffix: "X" }
]

export function Hero() {
  // Robust hero image source with fallbacks
  const heroCandidates = React.useMemo(
    () => [
      "/image1.png",
      "/image1.jpg",
      "/image%201.png",
      "/image 1.png",
      "/hero.jpg",
      "/hero.png",
      "/hero.jpeg",
      "/hero.webp",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=1200&fit=crop",
    ],
    []
  )
  const [heroSrcIndex, setHeroSrcIndex] = React.useState(0)
  const handleHeroError = React.useCallback(() => {
    setHeroSrcIndex((i) => (i + 1 < heroCandidates.length ? i + 1 : i))
  }, [heroCandidates.length])
  const heroSrc = heroCandidates[heroSrcIndex]

  return (
    <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-40 overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] z-0" />
      <ParticleNetwork />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EFF6FF] rounded-full blur-[120px] -mr-[400px] -mt-[200px] opacity-60 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EFF6FF] rounded-full blur-[100px] -ml-[300px] -mb-[200px] opacity-40 z-0" />
      {/* Full-bleed hero background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroSrc}
          alt="Engineering Team Working"
          fill
          className="object-cover object-[80%_50%]"
          onError={handleHeroError}
          priority
          sizes="100vw"
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/30 to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 h-full w-[42%] bg-gradient-to-r from-white/85 to-transparent pointer-events-none" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#1A56DB]/10 mb-8">
              <Sparkles className="w-4 h-4 text-[#1A56DB]" />
              <span className="text-[11px] font-bold text-[#1A56DB] uppercase tracking-[1.5px]">Engineering the Digital Frontier</span>
            </div>
            
            <h1 className="mb-8 tracking-tight leading-[1.2] text-[#111827]">
              Building the Future of <RotatingText />
            </h1>
            
            <p className="text-slate-700 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl font-medium">
              We engineer high-performance digital infrastructure for the next generation of startups. From AI-driven automation to scalable enterprise platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-20">
              <Link href="#contact" className="btn-primary px-8 py-4 text-lg shadow-lg shadow-[#1A56DB]/20 group">
                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#services" className="btn-outline px-8 py-4 text-lg">
                View Services
              </Link>
            </div>

            {/* Stats below Get Started */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-12"
            >
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[2px] mb-8">
                PARTNERING WITH GLOBAL INNOVATORS
              </p>
              <div className="grid grid-cols-3 gap-8 md:gap-12 -ml-2 sm:-ml-4 md:-ml-6">
                {statsData.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-[#6B7280] text-xs md:text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden"
          >
            {/* Main Image Container (edge-to-edge like your reference) */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)]">
              <div className="relative overflow-hidden aspect-[16/10] lg:aspect-[16/9]">
                <Image
                  src={heroSrc}
                  alt="Engineering Team Working"
                  fill
                  className="object-cover object-[80%_50%]"
                  onError={handleHeroError}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/40 to-transparent pointer-events-none" />
                <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-white/65 to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Floating Trust Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-[#E5E7EB] flex items-center gap-4 max-w-[240px] z-20"
            >
              <div className="w-12 h-12 rounded-full bg-[#1A56DB] flex items-center justify-center text-white shadow-lg shadow-[#1A56DB]/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827] leading-tight mb-1">Enterprise Grade Architecture</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-10 -right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-[#E5E7EB] flex items-center gap-4 max-w-[220px] z-20"
            >
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB]">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827] leading-tight mb-1">Top-Tier Tech Talent</p>
                <p className="text-xs text-[#6B7280]">100+ Engineers India-wide</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
