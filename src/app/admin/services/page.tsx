"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Brain,
  Globe,
  Laptop,
  Rocket,
  Shield,
  Terminal,
  Save,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const icons = [
  { name: "Brain", icon: Brain },
  { name: "Globe", icon: Globe },
  { name: "Laptop", icon: Laptop },
  { name: "Rocket", icon: Rocket },
  { name: "Shield", icon: Shield },
  { name: "Terminal", icon: Terminal },
];

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  icon: string;
  status: string;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({
    name: "",
    description: "",
    price: "",
    category: "",
    icon: "Brain",
    status: "active"
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = currentService.id ? `/api/services/${currentService.id}` : "/api/services";
      const method = currentService.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentService),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
        setCurrentService({
          name: "",
          description: "",
          price: "",
          category: "",
          icon: "Brain",
          status: "active"
        });
      }
    } catch (error) {
      console.error("Failed to save service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconObj = icons.find(i => i.name === iconName);
    const IconComp = iconObj ? iconObj.icon : Brain;
    return <IconComp className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#111827]">Services Management</h1>
          <p className="text-gray-500 mt-1">Manage the services offered on your website.</p>
        </div>
        <Button onClick={() => { setCurrentService({}); setIsModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && services.length === 0 ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card variant="glass" padding="lg" className="h-48 bg-white border-gray-100 shadow-sm" />
            </div>
          ))
        ) : services.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            No services found. Add your first service above.
          </div>
        ) : (
          services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glass" padding="lg" className="bg-white border-gray-200 group hover:border-blue-500/20 transition-all h-full relative shadow-sm">
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setCurrentService(service); setIsModalOpen(true); }}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    {getIconComponent(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-[#111827]">{service.name}</h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">{service.category}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-6 h-12 overflow-hidden line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <span className="text-xl font-black text-[#111827]">{service.price}</span>
                  <div className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    service.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {service.status === "active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {service.status}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl my-auto"
            >
              <Card variant="glass" padding="lg" className="bg-white border-gray-200 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black tracking-tight text-[#111827]">
                    {currentService.id ? "Edit Service" : "Add New Service"}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Service Name</label>
                      <input
                        type="text"
                        value={currentService.name}
                        onChange={(e) => setCurrentService({...currentService, name: e.target.value})}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="e.g. AI Solutions"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Price</label>
                      <input
                        type="text"
                        value={currentService.price}
                        onChange={(e) => setCurrentService({...currentService, price: e.target.value})}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="e.g. $9,999"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                      <input
                        type="text"
                        value={currentService.category}
                        onChange={(e) => setCurrentService({...currentService, category: e.target.value})}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="e.g. AI & ML"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Status</label>
                      <select
                        value={currentService.status}
                        onChange={(e) => setCurrentService({...currentService, status: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all appearance-none"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                    <textarea
                      value={currentService.description}
                      onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all resize-none"
                      placeholder="Describe the service..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Icon</label>
                    <div className="flex flex-wrap gap-4">
                      {icons.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setCurrentService({...currentService, icon: item.name})}
                          className={cn(
                            "p-3 rounded-xl border transition-all",
                            currentService.icon === item.name 
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                              : "bg-gray-50 border-gray-100 text-gray-400 hover:border-blue-500/20"
                          )}
                        >
                          <item.icon className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin border-t-white" />
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> {currentService.id ? "Update" : "Create"} Service
                        </>
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

function Loader2({ className }: { className?: string }) {
  return <div className={cn("w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin", className)} />;
}
