"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#EFF6FF] relative">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Side: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-8 lg:mb-10">
                Ready to Build Your <br />
                Future With Us?
              </h2>
              <p className="text-[#6B7280] text-lg mb-12 max-w-md leading-relaxed">
                Contact our expert engineering team today to discuss your next project and how we can help you scale.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1A56DB] shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-[2px] mb-1">Email Us</p>
                    <p className="text-xl font-bold text-[#111827]">hello@shyamji.tech</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1A56DB] shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-[2px] mb-1">Call Us</p>
                    <p className="text-xl font-bold text-[#111827]">+91 9580893230</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#E5E7EB]"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Rahul Sharma" 
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#1A56DB] focus:bg-white outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="rahul@example.com" 
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#1A56DB] focus:bg-white outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Select Service</label>
                  <select className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#1A56DB] focus:bg-white outline-none transition-all text-sm font-medium appearance-none cursor-pointer">
                    <option>Web Development</option>
                    <option>Mobile Apps</option>
                    <option>AI & Automation</option>
                    <option>Data Engineering</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your project requirements..." 
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#1A56DB] focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-[#1A56DB] text-white font-bold rounded-xl hover:bg-[#1E3A8A] transition-all shadow-lg hover:shadow-[#1A56DB]/20 active:scale-[0.98]">
                  Book a Consultation
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
