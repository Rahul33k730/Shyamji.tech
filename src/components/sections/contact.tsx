"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Send } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    service: "AI & Machine Learning",
    message: ""
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "AI & Machine Learning", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-[36px] font-heading font-semibold mb-8 tracking-tight text-primary">
              Ready to Build Your <br />
              <span className="gradient-text">Future with Us?</span>
            </h2>
            <p className="text-secondary text-[16px] leading-[1.6] mb-10 max-w-xl font-normal">
              Our team of experts is ready to help you build the next generation of digital solutions. Let's talk about your project and see how we can work together.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "shyamjitech33@gmail.com" },
                { icon: MessageSquare, label: "Phone", value: "+91 9580893230" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#1ab8ff]/10 text-[#1ab8ff]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-widest text-muted">{item.label}</p>
                    <p className="text-primary font-semibold text-[16px] tracking-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" padding="lg" className="border-border/10 bg-card/40 shadow-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold uppercase tracking-widest text-muted ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 outline-none transition-colors text-primary text-[16px]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold uppercase tracking-widest text-muted ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 outline-none transition-colors text-primary text-[16px]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-muted ml-1">Select Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 outline-none transition-colors text-primary text-[16px] appearance-none"
                  >
                    <option>AI & Machine Learning</option>
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>Cloud Infrastructure</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-muted ml-1">Project Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 outline-none transition-colors text-primary text-[16px] resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button 
                  disabled={status === "loading"}
                  className="w-full py-6 bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] font-semibold text-[16px] tracking-[0.01em] rounded-xl flex items-center justify-center gap-2"
                >
                  {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Book a Consultation"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
