"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "AI Analysis Platform",
    category: "AI & ML",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    description: "Real-time data analysis using advanced neural networks and predictive modeling.",
  },
  {
    title: "Modern SaaS Dashboard",
    category: "Software",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Highly performant, cloud-native dashboard for monitoring complex enterprise metrics.",
  },
  {
    title: "Quantum E-Commerce",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    description: "Next-gen shopping experience with serverless architecture and real-time inventory.",
  },
]

export function Products() {
  return (
    <section id="products" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-[36px] font-heading font-semibold mb-6 tracking-tight text-primary"
            >
              Transforming Ideas into <br />
              <span className="gradient-text">World-Class Products</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-secondary text-[16px] max-w-2xl leading-[1.6] font-normal"
            >
              We don't just build software; we build the core engines of modern digital businesses.
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-8 py-4 rounded-xl glass border border-white/10 text-[16px] font-semibold tracking-[0.01em] hover:border-[#1ab8ff]/50 transition-all text-primary"
          >
            View Case Studies
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" padding="sm" className="h-full group overflow-hidden bg-card/40 border-border/10 hover:border-[#1ab8ff]/20 transition-all">
                <div className="relative overflow-hidden aspect-video rounded-xl mb-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 rounded-full glass hover:bg-[#1ab8ff]/20 transition-colors text-white">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full glass hover:bg-[#1ab8ff]/20 transition-colors text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="text-[12px] font-semibold text-[#1ab8ff] uppercase tracking-widest mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="text-[20px] font-heading font-semibold mb-3 tracking-tight text-primary group-hover:text-[#1ab8ff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-[16px] leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
