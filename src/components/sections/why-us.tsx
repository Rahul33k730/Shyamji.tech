"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Cloud, Code2, Database, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    title: "Scalable Architecture",
    description: "Built for growth, our systems scale seamlessly from 100 to 100 million users.",
    icon: Cloud,
  },
  {
    title: "Enterprise-Grade Security",
    description: "Multi-layered security protocols to keep your business and data protected.",
    icon: ShieldCheck,
  },
  {
    title: "Real-time Processing",
    description: "Low-latency systems optimized for high-performance and instant response.",
    icon: Zap,
  },
  {
    title: "Full-Stack Expertise",
    description: "From database optimization to pixel-perfect UI, we handle everything.",
    icon: Code2,
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-[36px] font-heading font-semibold mb-8 tracking-tight text-primary">
              Why Forward-Thinking <br />
              <span className="gradient-text">Teams Choose Us</span>
            </h2>
            <p className="text-secondary text-[16px] leading-[1.6] mb-10 max-w-xl font-normal">
              We don't just build code; we build business solutions that are designed to lead the market. Our approach combines technical brilliance with strategic thinking.
            </p>
            
            <ul className="space-y-6">
              {[
                "Accelerated time-to-market for complex software",
                "Proven track record with top Indian startups",
                "Highly specialized AI and ML expertise",
                "Transparent and collaborative development process"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 text-primary font-medium text-[16px]"
                >
                  <div className="p-1 rounded-full bg-[#00e5a0]/10 text-[#00e5a0]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 glass rounded-3xl border border-border/10 bg-card/40 hover:border-[#1ab8ff]/20 transition-all group"
              >
                <div className="p-3 rounded-2xl bg-[#1ab8ff]/10 text-[#1ab8ff] w-fit mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-heading font-semibold mb-3 tracking-tight text-primary">{feature.title}</h3>
                <p className="text-secondary text-[16px] leading-[1.6] font-normal">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
