"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight,
  MousePointer2,
  Calendar,
  Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  BarElement,
  ArcElement
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  BarElement,
  ArcElement
);

const stats = [
  { name: "Total Visitors", value: "24,532", change: "+12.5%", trending: "up", icon: MousePointer2 },
  { name: "Total Leads", value: "1,245", change: "+8.2%", trending: "up", icon: Users },
  { name: "Chatbot Sessions", value: "842", change: "-2.4%", trending: "down", icon: MessageSquare },
  { name: "Conversion Rate", value: "5.1%", change: "+1.1%", trending: "up", icon: TrendingUp },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<{
    stats: any[],
    recentLeads: any[],
    conversionRate: string
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const result = await res.json();
      if (res.ok) {
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  const displayStats = data?.stats || [
    { name: "Total Visitors", value: "0", change: "0%", trending: "up", icon: MousePointer2 },
    { name: "Total Leads", value: "0", change: "0%", trending: "up", icon: Users },
    { name: "Chatbot Sessions", value: "0", change: "0%", trending: "up", icon: MessageSquare },
    { name: "Conversion Rate", value: "0%", change: "0%", trending: "up", icon: TrendingUp },
  ];

  // Add icons to the fetched stats
  const statsWithIcons = displayStats.map((s, i) => {
    const icons = [MousePointer2, Users, MessageSquare, TrendingUp];
    return { ...s, icon: icons[i] || MousePointer2 };
  });

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Visitors",
        data: [12000, 19000, 15000, 22000, 30000, 25000, 35000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Leads",
        data: [500, 800, 600, 1200, 1500, 1300, 1800],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Web Dev", "AI Solutions", "App Dev", "Consulting"],
    datasets: [
      {
        label: "Inquiries by Service",
        data: [450, 620, 310, 180],
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(139, 92, 246, 0.6)",
          "rgba(245, 158, 11, 0.6)",
        ],
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6b7280" } },
      y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6b7280" } },
    },
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsWithIcons.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card variant="glass" padding="md" className="border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-white/5">
                  <stat.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                  stat.trending === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
                )}>
                  {stat.trending === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-400 mb-1">{stat.name}</p>
              <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="glass" padding="lg" className="border-white/5 h-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              Growth Performance <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+24% YoY</span>
            </h3>
            <div className="h-[300px]">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </Card>
        </div>
        <div>
          <Card variant="glass" padding="lg" className="border-white/5 h-full">
            <h3 className="text-lg font-bold mb-6">Device Breakdown</h3>
            <div className="h-[200px] flex items-center justify-center">
              <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "bottom", labels: { color: "#9ca3af", font: { size: 10 } } } } }} />
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Direct Traffic</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Social Media</span>
                <span className="font-bold">32%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Referral</span>
                <span className="font-bold">23%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="glass" padding="lg" className="border-white/5">
          <h3 className="text-lg font-bold mb-6">Service Interest</h3>
          <div className="h-[250px]">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </Card>
        
        <Card variant="glass" padding="lg" className="border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Leads</h3>
            <button className="text-xs font-bold text-blue-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {(data?.recentLeads || []).map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                    {lead.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">{lead.service}</p>
                  <p className="text-[10px] text-gray-600">{lead.time}</p>
                </div>
              </div>
            ))}
            {(!data?.recentLeads || data.recentLeads.length === 0) && (
              <div className="text-center py-10 text-gray-500 text-sm italic">
                No recent leads found.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
