"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Search, Code, Rocket, CheckCircle } from "lucide-react"

const steps = [
  {
    title: "Strategy & Discovery",
    description: "We dive deep into your business needs and technical requirements.",
    icon: Search,
  },
  {
    title: "Design & Architecture",
    description: "Mapping out the software architecture and crafting the user experience.",
    icon: Code,
  },
  {
    title: "Agile Development",
    description: "Iterative building and testing to ensure rapid delivery of features.",
    icon: Rocket,
  },
  {
    title: "Launch & Optimization",
    description: "Deploying your product and continuously optimizing for performance.",
    icon: CheckCircle,
  },
]

export function Process() {
  return (
    <section id="process" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-left mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[36px] font-heading font-semibold mb-6 tracking-tight text-primary"
          >
            How We Build <br />
            <span className="gradient-text">Exceptional Software</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-secondary text-[16px] max-w-2xl leading-[1.6] font-normal"
          >
            Our process is streamlined for maximum efficiency and quality, from the first meeting to the final launch.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card variant="glass" padding="lg" className="h-full group bg-card/40 border-border/10 hover:border-[#1ab8ff]/20 transition-all">
                <div className="absolute top-4 right-4 text-4xl font-heading font-bold text-foreground/5 pointer-events-none group-hover:text-[#1ab8ff]/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="p-3 rounded-2xl bg-[#1ab8ff]/10 text-[#1ab8ff] w-fit mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-heading font-semibold mb-3 tracking-tight text-primary">{step.title}</h3>
                <p className="text-secondary text-[16px] leading-[1.6] font-normal">
                  {step.description}
                </p>
              </Card>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
