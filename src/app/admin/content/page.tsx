"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Search, 
  Save, 
  X, 
  Edit3, 
  Plus, 
  Trash2, 
  Layout, 
  Code, 
  Link as LinkIcon, 
  Settings as SettingsIcon,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  key: string;
  value: string;
  category: string;
}

export default function ContentManagement() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentItem, setCurrentItem] = useState<Partial<ContentItem>>({
    key: "",
    value: "",
    category: "General"
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content?raw=true");
      if (res.ok) {
        const data = await res.json();
        setContentItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = currentItem.id ? `/api/content/${currentItem.id}` : "/api/content";
      const method = currentItem.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchContent();
        setCurrentItem({ key: "", value: "", category: "General" });
      }
    } catch (error) {
      console.error("Failed to save content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content item?")) return;
    try {
      const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
      if (res.ok) fetchContent();
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  const filteredContent = contentItems.filter(item => 
    item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["General", "Hero", "Services", "About", "Contact", "Social"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            Content Management
          </h1>
          <p className="text-gray-400 mt-1">Manage static text and configuration across the site.</p>
        </div>
        <Button 
          onClick={() => {
            setCurrentItem({ key: "", value: "", category: "General" });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 flex items-center gap-2 font-bold"
        >
          <Plus className="w-5 h-5" /> Add Content Key
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1 space-y-2">
          <Card variant="glass" className="p-4 border-white/5 bg-white/[0.02]">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 px-2">Categories</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group"
                >
                  {cat}
                  <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Content List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search content keys or values..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
              ))
            ) : filteredContent.length === 0 ? (
              <div className="text-center py-20 text-gray-500 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                No content items found.
              </div>
            ) : (
              filteredContent.map((item) => (
                <Card key={item.id} variant="glass" className="p-6 border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-widest text-blue-500 px-2 py-1 bg-blue-500/10 rounded-lg">
                          {item.key}
                        </span>
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider px-2 py-0.5 border border-white/5 rounded-md">
                          {item.category || "General"}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed font-medium">
                        {item.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-start opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        onClick={() => {
                          setCurrentItem(item);
                          setIsModalOpen(true);
                        }}
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl p-2"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDelete(item.id)}
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

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
                    {currentItem.id ? "Edit Content Key" : "New Content Key"}
                  </h2>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Content Key (Unique)</label>
                    <input
                      type="text"
                      required
                      value={currentItem.key}
                      onChange={(e) => setCurrentItem({ ...currentItem, key: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors font-mono"
                      placeholder="hero_title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Category</label>
                    <select
                      value={currentItem.category}
                      onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors appearance-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-[#0f0f0f]">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Value / Text</label>
                    <textarea
                      required
                      rows={6}
                      value={currentItem.value}
                      onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors resize-none leading-relaxed"
                      placeholder="Enter the content value here..."
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
