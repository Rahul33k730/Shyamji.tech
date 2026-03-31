"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Save,
  X,
  User,
  Star,
  Eye,
  EyeOff
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  status: string;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    content: "",
    image: "",
    status: "visible"
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials?all=true");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = currentTestimonial.id ? `/api/testimonials/${currentTestimonial.id}` : "/api/testimonials";
      const method = currentTestimonial.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTestimonial),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchTestimonials();
        setCurrentTestimonial({ name: "", role: "", content: "", image: "", status: "visible" });
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const toggleStatus = async (testimonial: Testimonial) => {
    const newStatus = testimonial.status === "visible" ? "hidden" : "visible";
    try {
      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...testimonial, status: newStatus }),
      });
      if (res.ok) fetchTestimonials();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            Testimonials
          </h1>
          <p className="text-gray-400 mt-1">Manage client reviews and feedback.</p>
        </div>
        <Button 
          onClick={() => {
            setCurrentTestimonial({ name: "", role: "", content: "", image: "", status: "visible" });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 flex items-center gap-2 font-bold"
        >
          <Plus className="w-5 h-5" /> Add Testimonial
        </Button>
      </div>

      {isLoading && testimonials.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} variant="glass" className="border-white/5 p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center overflow-hidden border border-white/10">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-gray-400 text-sm italic mb-6 flex-1">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                  testimonial.status === "visible" ? "bg-emerald-400/10 text-emerald-400" : "bg-gray-400/10 text-gray-400"
                )}>
                  {testimonial.status === "visible" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {testimonial.status}
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => toggleStatus(testimonial)}
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-white hover:bg-white/5 rounded-lg p-2"
                  >
                    {testimonial.status === "visible" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={() => {
                      setCurrentTestimonial(testimonial);
                      setIsModalOpen(true);
                    }}
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-white hover:bg-white/5 rounded-lg p-2"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => handleDelete(testimonial.id)}
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg"
            >
              <Card variant="glass" padding="lg" className="border-white/10 shadow-2xl bg-[#0f0f0f]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {currentTestimonial.id ? "Edit Testimonial" : "New Testimonial"}
                  </h2>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={currentTestimonial.name}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Role / Company</label>
                    <input
                      type="text"
                      required
                      value={currentTestimonial.role}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="CEO at TechCorp"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Content</label>
                    <textarea
                      required
                      rows={4}
                      value={currentTestimonial.content}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, content: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors resize-none"
                      placeholder="Write the testimonial content here..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Image URL (Optional)</label>
                    <input
                      type="text"
                      value={currentTestimonial.image}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, image: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button"
                      variant="ghost" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 rounded-xl py-6 font-bold text-gray-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-bold flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" /> Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
