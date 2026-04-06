"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Target, Eye, Shield, Cpu, Linkedin, ArrowRight } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Precision Engineering",
    desc: "We don't just write code; we architect solutions with extreme precision and scalability in mind."
  },
  {
    icon: Eye,
    title: "Future-First Approach",
    desc: "We stay ahead of the curve, integrating the latest AI and cloud technologies into every project."
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    desc: "Our rigorous testing and peer-review processes ensure that every deployment is production-ready."
  },
  {
    icon: Cpu,
    title: "Deep Tech Expertise",
    desc: "From complex algorithms to high-performance infrastructure, our technical depth is our core strength."
  }
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 hero-grid opacity-20" />
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-8">
              We Build the <br />
              <span className="gradient-text">Digital Infrastructure</span> <br />
              of Tomorrow
            </h1>
            <p className="text-xl text-secondary font-light leading-relaxed mb-12">
              Based in the heart of India's tech landscape, Shyamji Tech is a boutique engineering powerhouse 
              dedicated to turning complex technical challenges into high-performance digital reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-foreground/5 border-y border-border/5 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-primary mb-6 uppercase">
                The Founder's Story
              </h2>
              <div className="space-y-6 text-secondary text-lg font-light leading-relaxed">
                <p>
                  Shyamji Tech was born out of a simple observation: most startups struggle not with their vision, 
                  but with the technical infrastructure required to scale it.
                </p>
                <p>
                  Our founder, Rahul Yadav, envisioned a company that doesn't just act as a vendor, but as a 
                  true technical partner. A company where engineering excellence is the baseline, not a goal.
                </p>
                <p>
                  Today, we are a funded startup helping innovative teams across India and the globe build 
                  AI-driven systems and scalable web applications that redefine their industries.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card variant="glass" padding="none" className="overflow-hidden border-white/5 rounded-[40px] aspect-square lg:aspect-auto lg:h-[600px] relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1ab8ff]/20 to-[#00e5a0]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-primary/10">
                   <span className="text-9xl font-black opacity-20">RY</span>
                </div>
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-card/40 flex items-end p-12">
                  <div className="w-full">
                    <h3 className="text-3xl font-black text-primary mb-2">Rahul Yadav</h3>
                    <p className="text-[#1ab8ff] font-bold uppercase tracking-widest text-sm mb-6">Founder & Chief Architect</p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-primary hover:text-[#00e5a0] transition-colors font-bold"
                    >
                      <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" padding="lg" className="h-full border-white/5 bg-gradient-to-br from-card/40 to-transparent">
                <h3 className="text-2xl font-black text-primary mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#1ab8ff]/10 flex items-center justify-center text-[#1ab8ff]">🚀</span>
                  OUR MISSION
                </h3>
                <p className="text-secondary text-lg font-light leading-relaxed">
                  To empower founders and innovative teams with the high-performance digital 
                  infrastructure they need to scale their impact and solve global challenges.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" padding="lg" className="h-full border-white/5 bg-gradient-to-br from-card/40 to-transparent">
                <h3 className="text-2xl font-black text-primary mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center text-[#00e5a0]">👁️</span>
                  OUR VISION
                </h3>
                <p className="text-secondary text-lg font-light leading-relaxed">
                  To become the world's most trusted engineering partner for the next generation 
                  of technology startups, setting the standard for quality and innovation.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-foreground/5 border-t border-border/5 px-6">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter text-primary mb-4 uppercase">Core Values</h2>
          <p className="text-secondary max-w-2xl mx-auto font-light">The principles that guide every line of code we write and every partnership we build.</p>
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="glass" padding="lg" className="h-full border-white/5 hover:border-[#1ab8ff]/20 transition-all text-left group">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors mb-6">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-3">{value.title}</h4>
                  <p className="text-sm text-secondary font-light leading-relaxed">{value.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-16 rounded-[48px] glass border-white/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1ab8ff]/10 to-[#00e5a0]/10 -z-10" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary mb-8">
              Join Us in Building the Future
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#contact">
                <button className="px-12 py-5 rounded-2xl bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] font-black text-lg shadow-[0_8px_30px_rgba(26,184,255,0.25)] hover:scale-105 transition-transform flex items-center gap-3">
                  Work With Us <ArrowRight className="w-5 h-5" />
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
