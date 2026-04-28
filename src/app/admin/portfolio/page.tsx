"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Save,
  X,
  Image as ImageIcon,
  Tag,
  Layout
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string;
}

export default function PortfolioManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    category: "Web App",
    tags: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = currentProject.id ? `/api/portfolio/${currentProject.id}` : "/api/portfolio";
      const method = currentProject.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProjects();
        setCurrentProject({ title: "", description: "", image: "", category: "Web App", tags: "" });
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-blue-600" />
            Portfolio Management
          </h1>
          <p className="text-gray-500 mt-1">Showcase your best work to potential clients</p>
        </div>
        <Button 
          onClick={() => {
            setCurrentProject({ title: "", description: "", image: "", category: "Web App", tags: "" });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 flex items-center gap-2 font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" /> Add Project
        </Button>
      </div>

      {isLoading && projects.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} variant="glass" className="bg-white group overflow-hidden border-gray-200 shadow-sm hover:border-blue-500/20 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-500/10 shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.split(',').map(tag => (
                    <span key={tag} className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-medium">#{tag.trim()}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => {
                        setCurrentProject(project);
                        setIsModalOpen(true);
                      }}
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(project.id)}
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl my-auto"
            >
              <Card variant="glass" padding="lg" className="bg-white border-gray-200 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-[#111827] tracking-tight flex items-center gap-3">
                    {currentProject.id ? "Edit Project" : "New Project"}
                  </h2>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                        <Layout className="w-3 h-3" /> Project Title
                      </label>
                      <input
                        type="text"
                        value={currentProject.title}
                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="e.g. Modern E-commerce"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                        <Tag className="w-3 h-3" /> Category
                      </label>
                      <select
                        value={currentProject.category}
                        onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all appearance-none"
                      >
                        <option value="Web App">Web App</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="AI Solution">AI Solution</option>
                        <option value="Branding">Branding</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                      <ImageIcon className="w-3 h-3" /> Image URL
                    </label>
                    <input
                      type="text"
                      value={currentProject.image}
                      onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                      <Tag className="w-3 h-3" /> Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={currentProject.tags}
                      onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                      placeholder="React, Tailwind, Node.js"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                      Project Description
                    </label>
                    <textarea
                      value={currentProject.description}
                      onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all resize-none"
                      placeholder="Briefly describe the project and impact..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-6 rounded-xl font-bold text-gray-400 hover:text-gray-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      {isLoading ? "Saving..." : (
                        <div className="flex items-center gap-2">
                          <Save className="w-5 h-5" /> Save Project
                        </div>
                      )}
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
