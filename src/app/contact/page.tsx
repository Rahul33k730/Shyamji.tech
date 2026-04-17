"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-[#EFF6FF]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label"
            >
              CONTACT US
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              Let's Discuss Your <br className="hidden md:block" />
              <span className="text-[#1A56DB]">Next Big Project</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-lg lg:text-xl leading-relaxed max-w-2xl"
            >
              Our engineering experts are ready to help you scale your digital infrastructure and build intelligent solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-12">
                <div>
                  <h2 className="mb-10">Get In Touch</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] flex-shrink-0 shadow-sm">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Email Us</p>
                        <p className="text-[#111827] font-bold">hello@shyamji.tech</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] flex-shrink-0 shadow-sm">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Call Us</p>
                        <p className="text-[#111827] font-bold">+91 9580893230</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] flex-shrink-0 shadow-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Office</p>
                        <p className="text-[#111827] font-bold text-sm">Tech Park, Bengaluru, India</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] flex-shrink-0 shadow-sm">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Hours</p>
                        <p className="text-[#111827] font-bold text-sm">Mon - Fri, 9AM - 6PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#111827] mb-6">Follow Our Journey</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: Linkedin, href: "#" },
                      { icon: Twitter, href: "#" },
                      { icon: Instagram, href: "#" }
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href}
                        className="w-12 h-12 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5E7EB] h-[300px] bg-[#F9FAFB] flex items-center justify-center group">
                  <div className="absolute inset-0 bg-[#EFF6FF] opacity-50 group-hover:opacity-30 transition-opacity" />
                  <MapPin className="w-12 h-12 text-[#1A56DB] relative z-10" />
                  <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-bold text-[#6B7280] uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-md">Bengaluru, Karnataka</p>
                </div>
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
                    rows={6} 
                    placeholder="Tell us about your project requirements..." 
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#1A56DB] focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-[#1A56DB] text-white font-bold rounded-xl hover:bg-[#1E3A8A] transition-all shadow-lg hover:shadow-[#1A56DB]/20 active:scale-[0.98] flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
