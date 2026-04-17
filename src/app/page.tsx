"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { Trusted } from "@/components/sections/trusted"
import { Services } from "@/components/sections/services"
import { Products } from "@/components/sections/products"
import { WhyUs } from "@/components/sections/why-us"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="relative min-h-screen">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#1A56DB] z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <div className="flex flex-col gap-0">
        <Hero />
        <Trusted />
        <Services />
        <Products />
        <WhyUs />
        <Process />
        <Testimonials />
        <Pricing />
        <Contact />
      </div>
      
      <Footer />
    </main>
  )
}
