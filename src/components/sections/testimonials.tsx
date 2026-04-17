"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ravi Sharma",
    company: "FinEdge Solutions",
    role: "CTO",
    content: "Shyamji Tech delivered our dashboard in just 2 weeks. Truly impressive speed and quality. Their team is highly professional and technically sound.",
    rating: 5
  },
  {
    name: "Priya Patel",
    company: "EduGrowth India",
    role: "Founder",
    content: "The AI automation they implemented has transformed our backend operations. We've seen a 40% increase in efficiency since the deployment.",
    rating: 5
  },
  {
    name: "Amit Verma",
    company: "HealthSync Systems",
    role: "Director of Product",
    content: "Outstanding mobile app development. They handled our complex requirements with ease and delivered a seamless experience for our users.",
    rating: 5
  },
  {
    name: "Ananya Iyer",
    company: "Vistara Tech",
    role: "VP Engineering",
    content: "A reliable partner for scaling our infrastructure. Their scalable architecture solutions are world-class and production-ready.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16 lg:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            CLIENT STORIES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            What Our Partners Say
          </motion.h2>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="flex whitespace-nowrap">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-6 lg:gap-8 pr-6 lg:pr-8"
            >
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div
                  key={i}
                  className="w-[350px] lg:w-[400px] flex-shrink-0 bg-white border border-[#E5E7EB] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow whitespace-normal"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-8 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1A56DB] flex items-center justify-center text-white font-bold text-xs">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">{testimonial.name}</h4>
                      <p className="text-xs text-[#6B7280]">
                        {testimonial.company} • {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
