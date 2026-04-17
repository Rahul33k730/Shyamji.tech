"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
  const lastUpdated = "April 6, 2026"
  
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-[#F9FAFB]">
        <div className="container-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#111827] mb-4"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-[#6B7280] font-medium">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl space-y-12 text-[#6B7280] leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">1. Introduction</h2>
              <p>
                Welcome to Shyamji Tech. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc ml-6 space-y-3">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc ml-6 space-y-3">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">5. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
            </div>

            <div className="pt-8 border-t border-[#E5E7EB]">
              <p className="font-bold text-[#111827]">Contact Us</p>
              <p className="mt-2">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <p className="mt-1 font-medium text-[#1A56DB]">privacy@shyamji.tech</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
