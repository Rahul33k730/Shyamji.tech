"use client";

import React, { useState } from "react";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Save, 
  Mail, 
  Lock, 
  Smartphone,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tabs = [
    { id: "profile", name: "Admin Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "general", name: "General Settings", icon: Globe },
  ];

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-500" />
            System Settings
          </h1>
          <p className="text-gray-400 mt-1">Configure your admin dashboard and site preferences.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-6 flex items-center gap-2 font-bold"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation */}
        <div className="md:w-64 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-black" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {showSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <p className="text-sm font-bold tracking-tight">Settings updated successfully!</p>
            </div>
          )}

          <Card variant="glass" className="p-8 border-white/5 bg-white/[0.02]">
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-emerald-500 p-1">
                      <div className="w-full h-full rounded-[20px] bg-[#0f0f0f] flex items-center justify-center overflow-hidden">
                        <User className="w-10 h-10 text-gray-700 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-xl border-4 border-[#0a0a0a] hover:scale-110 transition-transform">
                      <Smartphone className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Administrator Profile</h3>
                    <p className="text-sm text-gray-500">Update your account details and public information.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type="email"
                        defaultValue="admin@shyamji.tech"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Bio / Role Description</label>
                    <textarea
                      rows={3}
                      defaultValue="Lead Administrator at Shyamji Tech Solutions. Managing system-wide configurations and data integrity."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <div className="pb-8 border-b border-white/5">
                  <h3 className="text-xl font-bold text-white">Security Settings</h3>
                  <p className="text-sm text-gray-500">Manage your password and authentication preferences.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-400 mb-1">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Enable 2FA to add an extra layer of security to your account. This will require a code from your mobile device to log in.
                    </p>
                    <Button variant="ghost" size="sm" className="mt-3 text-blue-400 hover:bg-blue-400/10 p-0 h-auto">
                      Enable 2FA Now →
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                <div className="pb-8 border-b border-white/5">
                  <h3 className="text-xl font-bold text-white">Notifications</h3>
                  <p className="text-sm text-gray-500">Decide which activities you want to be notified about.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "New Lead Inquiries", desc: "Receive an email when a new lead is submitted.", enabled: true },
                    { title: "Chatbot Sessions", desc: "Get notified when someone starts a chat.", enabled: false },
                    { title: "System Updates", desc: "Notifications about system maintenance and updates.", enabled: true },
                    { title: "Security Alerts", desc: "Immediate alerts for login attempts and password changes.", enabled: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all">
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <div className={cn(
                        "w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300",
                        item.enabled ? "bg-blue-600" : "bg-white/10"
                      )}>
                        <div className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                          item.enabled ? "left-7" : "left-1"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
