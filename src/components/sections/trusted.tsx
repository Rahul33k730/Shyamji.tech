"use client"

import * as React from "react"
import { motion } from "framer-motion"

const companies = [
  "Stripe", "Vercel", "Linear", "Render", "Postman", "OpenAI"
]

export function Trusted() {
  return (
    <section className="py-20 bg-foreground/5 border-y border-border/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 pr-16"
          >
            {[...companies, ...companies].map((item, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="badge text-[#8a9ab8] hover:text-[#1ab8ff] transition-colors cursor-default">
                  {item}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] opacity-50" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
