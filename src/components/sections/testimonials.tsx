"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Quote, Star, User, Plus, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: "", role: "", content: "" });
  const [submitting, setSubmitting] = React.useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.length === 0) {
        // Fallback to Indian names if DB is empty
        setTestimonials([
          { name: "Arjun Mehta", role: "CEO, TechVistara", content: "Shyamji Tech has transformed our digital infrastructure. Their AI automation is truly world-class." },
          { name: "Priya Sharma", role: "CTO, Innovate India", content: "Outstanding delivery speed and code quality. The team is highly skilled and very professional." },
          { name: "Rohan Gupta", role: "Founder, SaaSFlow", content: "A reliable partner for scaling our web applications. Their execution is flawless." },
        ]);
      } else {
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", role: "", content: "" });
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-[36px] font-heading font-semibold mb-6 tracking-tight text-primary"
            >
              What Our <br />
              <span className="gradient-text">Partners Say</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-secondary text-[16px] max-w-2xl leading-[1.6] font-normal"
            >
              We've helped hundreds of startups and enterprises achieve their digital goals through innovation.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] font-semibold text-[16px] tracking-[0.01em] rounded-xl px-8 py-6 h-12"
            >
              <Plus className="w-4 h-4 mr-2" /> Share Your Feedback
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" padding="lg" className="h-full bg-card/40 border-border/10 hover:border-[#1ab8ff]/20 transition-all flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#00e5a0] text-[#00e5a0]" />
                  ))}
                </div>
                <p className="text-secondary text-[16px] leading-relaxed italic mb-8 flex-grow font-normal">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-border/10">
                  <div className="w-12 h-12 rounded-full bg-[#1ab8ff]/10 flex items-center justify-center text-[#1ab8ff]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-primary font-semibold text-[16px] tracking-tight">{testimonial.name}</h4>
                    <p className="text-muted text-[14px] font-normal">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-foreground/20 dark:bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md"
            >
              <Card variant="glass" padding="lg" className="border-border/10 shadow-2xl bg-card">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-heading font-black tracking-tight uppercase text-primary">Share Feedback</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-foreground/5">
                    <X className="w-6 h-6 text-muted" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 text-primary outline-none transition-all"
                      placeholder="e.g. Arjun Mehta"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Your Role / Company</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 text-primary outline-none transition-all"
                      placeholder="e.g. CEO, TechVistara"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Your Message</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/10 focus:border-[#1ab8ff]/50 text-primary outline-none transition-all resize-none"
                      placeholder="How was your experience working with us?"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] font-black py-6 rounded-xl"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : <><Send className="w-4 h-4 mr-2" /> Submit Feedback</>}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
