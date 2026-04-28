"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Save,
  X,
  FileSpreadsheet,
  Upload,
  Check,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string; // JSON string
  popular: boolean;
  order: number;
}

export default function PricingManagement() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentPlan, setCurrentPlan] = useState<Partial<PricingPlan>>({
    name: "",
    price: "",
    description: "",
    features: "[]",
    popular: false,
    order: 0
  });

  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/pricing");
      const data = await res.json();
      setPlans(data);
    } catch (error) {
      console.error("Failed to fetch pricing plans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = currentPlan.id ? `/api/pricing/${currentPlan.id}` : "/api/pricing";
      const method = currentPlan.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPlan),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchPlans();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save pricing plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/pricing/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPlans();
      }
    } catch (error) {
      console.error("Failed to delete pricing plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/pricing/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Pricing plans uploaded successfully!");
        fetchPlans();
      } else {
        const error = await res.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setCurrentPlan({
      name: "",
      price: "",
      description: "",
      features: "[]",
      popular: false,
      order: plans.length
    });
    setFeatureInput("");
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const features = JSON.parse(currentPlan.features || "[]");
    const updatedFeatures = [...features, featureInput.trim()];
    setCurrentPlan({ ...currentPlan, features: JSON.stringify(updatedFeatures) });
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    const features = JSON.parse(currentPlan.features || "[]");
    const updatedFeatures = features.filter((_: any, i: number) => i !== index);
    setCurrentPlan({ ...currentPlan, features: JSON.stringify(updatedFeatures) });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#111827]">Pricing Management</h1>
          <p className="text-gray-500 mt-1">Manage the pricing plans or upload an Excel sheet.</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".xlsx, .xls, .csv"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            variant="outline"
            className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 text-[#111827]"
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin border-t-blue-600" /> : <Upload className="w-4 h-4" />}
            Upload Excel
          </Button>
          <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add New Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && plans.length === 0 ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card variant="glass" padding="lg" className="h-64 bg-white border-gray-100" />
            </div>
          ))
        ) : plans.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No pricing plans found. Add one or upload an Excel sheet.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glass" padding="lg" className={cn(
                "bg-white border-gray-200 group hover:border-blue-500/20 transition-all h-full relative flex flex-col shadow-sm",
                plan.popular && "ring-2 ring-blue-500/50"
              )}>
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setCurrentPlan(plan); setIsModalOpen(true); }}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold tracking-tight text-[#111827]">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-[#111827]">{plan.price}</div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{plan.description}</p>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  {JSON.parse(plan.features || "[]").slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-600">
                      <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {JSON.parse(plan.features || "[]").length > 4 && (
                    <p className="text-[10px] text-gray-400 ml-5">+{JSON.parse(plan.features || "[]").length - 4} more features</p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Order: {plan.order}</span>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Excel Info Card */}
      <Card variant="glass" padding="md" className="bg-blue-50 border-blue-100">
        <div className="flex gap-4">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600 h-fit">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-1">Excel Upload Guide</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upload an Excel file with the following columns: <span className="text-blue-600 font-semibold">name, price, description, features, popular, order</span>. 
              Features should be separated by commas. Existing plans will be replaced.
            </p>
          </div>
        </div>
      </Card>

      {/* Plan Modal */}
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
                    {currentPlan.id ? "Edit Pricing Plan" : "Add New Plan"}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Plan Name</label>
                      <input
                        type="text"
                        value={currentPlan.name}
                        onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="e.g. Starter"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Price Display</label>
                      <input
                        type="text"
                        value={currentPlan.price}
                        onChange={(e) => setCurrentPlan({...currentPlan, price: e.target.value})}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="e.g. ₹24,999"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                    <textarea
                      value={currentPlan.description}
                      onChange={(e) => setCurrentPlan({...currentPlan, description: e.target.value})}
                      required
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all resize-none"
                      placeholder="Short description of the plan..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Display Order</label>
                      <input
                        type="number"
                        value={currentPlan.order}
                        onChange={(e) => setCurrentPlan({...currentPlan, order: parseInt(e.target.value) || 0})}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Options</label>
                      <div className="flex items-center gap-3 h-[46px]">
                        <button
                          type="button"
                          onClick={() => setCurrentPlan({...currentPlan, popular: !currentPlan.popular})}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-xs font-bold",
                            currentPlan.popular 
                              ? "bg-blue-600 border-blue-600 text-white" 
                              : "bg-gray-50 border-gray-200 text-gray-400"
                          )}
                        >
                          {currentPlan.popular ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          Popular Plan
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Features</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500/50 text-[#111827] outline-none transition-all"
                        placeholder="Add a feature..."
                      />
                      <Button type="button" onClick={addFeature} className="bg-blue-600 text-white hover:bg-blue-700">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(currentPlan.features || "[]").map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700 font-medium">
                          <span>{feature}</span>
                          <button type="button" onClick={() => removeFeature(idx)} className="text-blue-400 hover:text-red-500 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin border-t-white" />
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> {currentPlan.id ? "Update" : "Create"} Plan
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
