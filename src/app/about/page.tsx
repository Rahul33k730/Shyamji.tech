"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2, Target, Eye, Users, Award, Rocket } from "lucide-react"

const values = [
  {
    title: "Technical Excellence",
    description: "We maintain the highest standards of code quality and architectural integrity in every project we undertake.",
    icon: Target
  },
  {
    title: "Client Partnership",
    description: "We don't just act as a vendor; we become a true technical partner, invested in our clients' long-term success.",
    icon: Users
  },
  {
    title: "Innovation First",
    description: "We constantly explore and integrate emerging technologies like AI and Cloud-Native architectures to keep our clients ahead.",
    icon: Eye
  }
]

const stats = [
  { label: "Founded", value: "2020" },
  { label: "Engineers", value: "25+" },
  { label: "Projects", value: "100+" },
  { label: "Countries", value: "12" }
]

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-[#EFF6FF]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label"
            >
              ABOUT SHYAMJI TECHNOLOGIES
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              Driving Digital Transformation Through <br className="hidden md:block" />
              <span className="text-[#1A56DB]">Precision Engineering</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-lg lg:text-xl leading-relaxed max-w-2xl"
            >
              Based in India, we are a high-performance technology company dedicated to building the future of intelligent software for global enterprises.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-3xl font-bold text-[#111827] mb-1">{stat.value}</p>
                <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-8">Our Mission & Vision</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] flex-shrink-0 shadow-sm">
                    <Rocket className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">The Mission</h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      To empower organizations with robust, scalable, and intelligent technology solutions that solve real-world problems and drive measurable business growth.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] flex-shrink-0 shadow-sm">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">The Vision</h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      To be the world's most trusted technology partner for startups and enterprises, recognized for our engineering excellence and unwavering commitment to quality.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=1200&fit=crop" 
                alt="Our Team Working" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#1A56DB]/5 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-[#F9FAFB]">
        <div className="container-custom text-center mb-16 lg:mb-20">
          <span className="section-label">OUR CORE VALUES</span>
          <h2>What Drives Us Forward</h2>
        </div>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] mb-6">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-4">{value.title}</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">The Founder's Story</h2>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-10">
              Shyamji Technologies was founded with a simple yet powerful vision: to bridge the gap between complex engineering and business needs. Our founder, having worked with top global enterprises, saw a need for a technology partner that combines high-end technical expertise with the agility of a startup.
            </p>
            <p className="text-[#6B7280] text-lg leading-relaxed">
              Today, we are a team of passionate engineers, designers, and strategists working together to build products that matter. We believe in transparency, technical rigor, and delivering value that lasts.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
