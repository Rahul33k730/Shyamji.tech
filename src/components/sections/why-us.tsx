"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield, Zap, Layers, Users, CheckCircle } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "Scalable Architecture",
    description: "Cloud-native systems designed for massive concurrency and future-proof scalability.",
    icon: Layers
  },
  {
    title: "Enterprise-Grade Security",
    description: "Industry-standard protocols and security audits to ensure data integrity and compliance.",
    icon: Shield
  },
  {
    title: "Real-time Processing",
    description: "Low-latency data processing engines for instant insights and rapid synchronization.",
    icon: Zap
  },
  {
    title: "Full-Stack Expertise",
    description: "Mastery across modern web, mobile, and backend technologies for cohesive systems.",
    icon: Users
  }
]

export function WhyUs() {
  return (
    <section id="why-us" className="section-padding bg-[#EFF6FF] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] z-0" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">
              WHY SHYAMJI TECHNOLOGIES
            </span>
            <h2 className="mb-10 lg:mb-12">
              Why Forward-Thinking <br className="hidden md:block" />
              Teams Choose Us
            </h2>
            
            <p className="text-[#6B7280] text-lg mb-12 max-w-xl leading-relaxed">
              We don't just build software; we architect the foundations of digital success. Our commitment to quality, security, and scalability sets us apart.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1A56DB] shadow-md transition-transform group-hover:scale-110 duration-300">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827]">{feature.title}</h3>
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#1A56DB]" />
                <span className="text-sm font-bold text-[#111827]">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#1A56DB]" />
                <span className="text-sm font-bold text-[#111827]">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#1A56DB]" />
                <span className="text-sm font-bold text-[#111827]">24/7 Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white/50 aspect-[4/5] lg:aspect-square">
              <Image 
                src="/image2.png" 
                alt="Professional Office Team" 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A56DB]/20 to-transparent mix-blend-overlay" />
            </div>
            
            {/* Overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-[#E5E7EB] max-w-[280px] hidden md:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#111827]">50+</p>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Projects Delivered</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                "Shyamji Tech built exactly what we needed, making the entire process smooth and professional."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
