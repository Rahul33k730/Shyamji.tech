"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsOfService() {
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
            Terms of Service
          </motion.h1>
          <p className="text-[#6B7280] font-medium">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl space-y-12 text-[#6B7280] leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">1. Terms</h2>
              <p>
                By accessing this website and engaging with Shyamji Tech, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Shyamji Tech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc ml-6 space-y-3">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on Shyamji Tech's website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">3. Disclaimer</h2>
              <p>
                The materials on Shyamji Tech's website are provided on an 'as is' basis. Shyamji Tech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">4. Limitations</h2>
              <p>
                In no event shall Shyamji Tech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shyamji Tech's website, even if Shyamji Tech or a Shyamji Tech authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111827]">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>

            <div className="pt-8 border-t border-[#E5E7EB]">
              <p className="font-bold text-[#111827]">Contact Us</p>
              <p className="mt-2">If you have any questions about these Terms, please contact us at:</p>
              <p className="mt-1 font-medium text-[#1A56DB]">hello@shyamji.tech</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
