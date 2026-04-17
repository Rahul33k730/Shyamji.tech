"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Monitor, Smartphone, Cpu, Database, ArrowRight, Code2, Globe2, BarChart3, Rocket } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Web Development",
    description: "Enterprise-grade web applications built with React, Next.js, and scalable Node.js architectures for mission-critical performance.",
    icon: Monitor,
    details: ["React & Next.js", "Full Stack Systems", "Cloud Native"],
    color: "bg-blue-500"
  },
  {
    title: "Mobile Apps",
    description: "High-performance native and cross-platform mobile solutions for iOS and Android devices, ensuring seamless user experiences.",
    icon: Smartphone,
    details: ["iOS & Android", "React Native", "Seamless UX"],
    color: "bg-indigo-500"
  },
  {
    title: "AI & Automation",
    description: "Intelligent automation and GPT integrations to streamline business processes and unlock new operational efficiencies.",
    icon: Cpu,
    details: ["GPT Integrations", "Process Automation", "Custom AI Models"],
    color: "bg-purple-500"
  },
  {
    title: "Data Engineering",
    description: "Robust data pipelines, ETL processes, and advanced analytics for data-driven decision making and strategic insights.",
    icon: Database,
    details: ["ETL Pipelines", "Data Analytics", "Performance Cleaning"],
    color: "bg-cyan-500"
  }
]

export function Services() {
  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EFF6FF] rounded-full blur-[100px] opacity-40 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label"
            >
              CORE CAPABILITIES
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              Excellence in Engineering <br className="hidden md:block" />
              <span className="text-[#1A56DB]">Every Digital Frontier</span>
            </motion.h2>
            <p className="text-[#6B7280] text-lg max-w-xl">
              We provide end-to-end technology solutions that empower businesses to lead in a rapidly evolving digital landscape.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="#contact" className="btn-outline group">
              Get a Custom Proposal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="relative h-full p-8 bg-white border border-[#E5E7EB] rounded-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,86,219,0.1)] hover:-translate-y-2 overflow-hidden">
                {/* Hover Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                
                <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] mb-8 group-hover:bg-[#1A56DB] group-hover:text-white transition-all duration-500 shadow-sm">
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-[#111827] mb-4 group-hover:text-[#1A56DB] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-[#6B7280] text-[15px] leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto mb-8">
                  {service.details.map(detail => (
                    <span key={detail} className="text-[10px] font-bold text-[#1A56DB] bg-[#EFF6FF] px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#1A56DB]/5">
                      {detail}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-[#1A56DB] font-bold text-sm hover:gap-3 transition-all duration-300"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
