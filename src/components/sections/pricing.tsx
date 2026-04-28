"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string; // JSON string
  popular: boolean;
  order: number;
}

const fallbackPlans = [
  {
    name: "Starter",
    price: "₹24,999",
    description: "Perfect for early-stage startups and small projects.",
    features: JSON.stringify(["Single Platform (Web or Mobile)", "Standard UI/UX Design", "Core Features Implementation", "30 Days Support", "Cloud Deployment"]),
    popular: false
  },
  {
    name: "Professional",
    price: "₹74,999",
    description: "Comprehensive solution for growing businesses.",
    features: JSON.stringify(["Full-Stack Application", "Premium AI Integration", "Advanced Dashboard", "Priority Support", "Scalable Infrastructure", "SEO & Performance Optimization"]),
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "High-performance systems for large-scale organizations.",
    features: JSON.stringify(["Complex Multi-Platform Systems", "Custom AI/ML Models", "24/7 Dedicated Support", "Enterprise-Grade Security", "Internal Tooling", "Legacy System Integration"]),
    popular: false
  }
]

export function Pricing() {
  const [plans, setPlans] = React.useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/pricing");
        const data = await res.json();
        if (data && data.length > 0) {
          setPlans(data);
        } else {
          setPlans(fallbackPlans as any);
        }
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
        setPlans(fallbackPlans as any);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 lg:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            PRICING
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Invest in Engineering Velocity
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, i) => {
            let features: string[] = [];
            try {
              features = JSON.parse(plan.features || "[]");
            } catch (e) {
              console.error("Failed to parse features for plan:", plan.name);
            }
            
            return (
              <motion.div
                key={plan.id || plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "relative p-8 lg:p-10 rounded-2xl border transition-all duration-300 hover:shadow-2xl flex flex-col",
                  plan.popular 
                    ? "bg-[#1A56DB] text-white border-[#1A56DB] md:scale-105 z-10" 
                    : "bg-white text-[#111827] border-[#E5E7EB]"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className={cn("text-xl font-bold mb-2", plan.popular ? "text-white" : "text-[#111827]")}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.name !== "Enterprise" && <span className={cn("text-xs font-medium", plan.popular ? "text-blue-100" : "text-[#6B7280]")}>/project</span>}
                </div>
                <p className={cn("text-sm mb-8 leading-relaxed", plan.popular ? "text-blue-100" : "text-[#6B7280]")}>
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                      <Check className={cn("w-5 h-5 flex-shrink-0 mt-0.5", plan.popular ? "text-white" : "text-[#1A56DB]")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/#contact"
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-center transition-all shadow-md active:scale-95",
                    plan.popular 
                      ? "bg-white text-[#1A56DB] hover:bg-gray-50" 
                      : "bg-[#1A56DB] text-white hover:bg-[#1E3A8A]"
                  )}
                >
                  Get Started
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
