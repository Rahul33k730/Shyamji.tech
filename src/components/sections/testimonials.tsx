"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, User } from "lucide-react"

const testimonials = [
  {
    name: "Arjun Mehta",
    company: "TechVistara",
    role: "CEO",
    content: "Shyamji Tech has transformed our digital infrastructure. Their AI automation is truly world-class and cut our operational costs by 40% in just 3 months.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    company: "Innovate India",
    role: "CTO",
    content: "Outstanding delivery speed and code quality. The team built our entire SaaS platform from scratch with incredible precision and scalability.",
    rating: 5
  },
  {
    name: "Rohan Gupta",
    company: "SaaSFlow",
    role: "Founder",
    content: "A reliable partner for scaling our web applications. Their Next-Gen architecture allowed us to handle 10x more traffic without any downtime.",
    rating: 5
  },
  {
    name: "Ananya Iyer",
    company: "FinTech Pro",
    role: "Director of Product",
    content: "The AI integration provided by Shyamji Tech is revolutionary. Our users now experience personalized dashboards that were impossible before.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    company: "CloudCore",
    role: "VP Engineering",
    content: "Professional, fast, and highly technical. They are our go-to team for complex full-stack challenges and high-performance infrastructure.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-primary mb-6"
          >
            What Our <br />
            <span className="gradient-text">Partners Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-secondary text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            We've helped hundreds of startups and enterprises achieve their digital goals through high-performance engineering.
          </motion.p>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 pr-8"
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <motion.div
                key={i}
                className="w-[400px] flex-shrink-0"
              >
                <Card variant="glass" padding="lg" className="h-full bg-card/40 border-border/10 hover:border-[#1ab8ff]/20 transition-all flex flex-col group">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#00e5a0] text-[#00e5a0]" />
                    ))}
                  </div>
                  <p className="text-secondary text-[16px] leading-relaxed italic mb-8 font-normal whitespace-normal line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/10 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1ab8ff]/20 to-[#00e5a0]/20 flex items-center justify-center text-primary font-black border border-white/5">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="text-left">
                      <h4 className="text-primary font-bold text-[16px] tracking-tight">{testimonial.name}</h4>
                      <p className="text-muted text-[12px] font-bold uppercase tracking-wider">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  )
}
