"use client"

import * as React from "react"
import { motion } from "framer-motion"

const steps = [
  {
    title: "Strategy & Discovery",
    description: "We dive deep into your business needs and technical requirements."
  },
  {
    title: "Design & Architecture",
    description: "Mapping out the software architecture and crafting the user experience."
  },
  {
    title: "Agile Development",
    description: "Iterative building and testing to ensure rapid delivery of features."
  },
  {
    title: "Launch & Optimization",
    description: "Deploying your product and continuously optimizing for performance."
  }
]

export function Process() {
  return (
    <section id="process" className="section-padding bg-[#EFF6FF]">
      <div className="container-custom">
        <div className="text-center mb-16 lg:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            HOW WE WORK
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            How We Build Exceptional Software
          </motion.h2>
        </div>

        <div className="relative">
          {/* Dotted Connection Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[12%] right-[12%] border-t-2 border-dotted border-[#1A56DB] z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#EFF6FF] flex items-center justify-center mx-auto mb-8 shadow-md transition-all group-hover:scale-110 group-hover:bg-[#1A56DB] group-hover:text-white group-hover:border-[#1A56DB]">
                  <span className="text-2xl font-bold text-[#1A56DB] transition-colors group-hover:text-white">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-4">{step.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
