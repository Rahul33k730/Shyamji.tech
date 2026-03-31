"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: "₹25,000",
    description: "Ideal for early-stage startups needing a solid foundation.",
    features: [
      "Basic website",
      "Responsive design",
      "Contact form",
      "5 pages",
    ],
    highlight: false,
  },
  {
    name: "Professional",
    price: "₹60,000",
    description: "Perfect for scaling companies with advanced tech needs.",
    features: [
      "Custom website",
      "Admin dashboard",
      "API integration",
      "SEO optimization",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "₹150,000+",
    description: "Dedicated solutions for large-scale operations.",
    features: [
      "AI integration",
      "Automation systems",
      "Scalable architecture",
      "Premium support",
    ],
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-left mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[36px] font-heading font-semibold mb-6 tracking-tight text-primary"
          >
            Invest in <br />
            <span className="gradient-text">Engineering Velocity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-secondary text-[16px] max-w-2xl leading-[1.6] font-normal"
          >
            Premium execution for high-growth teams. Choose the model that fits your engineering goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                variant="glass"
                padding="lg"
                className={`h-full relative overflow-hidden group hover:border-[#1ab8ff]/20 transition-all border-border/10 flex flex-col ${plan.highlight ? "border-[#1ab8ff]/30 bg-[#1ab8ff]/5 shadow-[0_0_40px_rgba(26,184,255,0.05)]" : ""}`}
              >
                {plan.highlight && (
                  <div className="absolute top-4 right-4 bg-[#1ab8ff] text-[#080a0e] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-4 tracking-tight text-primary">{plan.name}</h3>
                <div className="mb-6">
                  <span className="stat-number text-4xl text-primary">{plan.price}</span>
                </div>
                <p className="card-description mb-8">
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 card-description text-primary/80">
                      <Check className="w-5 h-5 text-[#00e5a0] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className={cn(
                  "w-full py-6 rounded-xl btn-text transition-all",
                  plan.highlight 
                    ? "bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(26,184,255,0.35)]" 
                    : "bg-foreground/5 text-primary border border-border/10 hover:border-[#1ab8ff]/50"
                )}>
                  Get Started
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
