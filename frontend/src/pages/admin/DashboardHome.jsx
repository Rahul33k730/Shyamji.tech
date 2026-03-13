import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, MessageSquare, Briefcase, Box, TrendingUp, MapPin } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex items-center gap-6 group hover:border-cyan-500/30 transition-all">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 transition-transform ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-white mt-1">{value}</p>
    </div>
  </div>
);

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    serviceInquiries: 0,
    chatbotConversations: 0,
    recentMessages: [],
    servicesCount: 0,
    productsCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/dashboard/stats`);
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Visitors" 
          value={stats.totalVisitors} 
          color="bg-cyan-500/10 border-cyan-500/20 text-cyan-500" 
        />
        <StatCard 
          icon={Mail} 
          label="Inquiries" 
          value={stats.serviceInquiries} 
          color="bg-blue-500/10 border-blue-500/20 text-blue-500" 
        />
        <StatCard 
          icon={MessageSquare} 
          label="AI Chatbot Logs" 
          value={stats.chatbotConversations} 
          color="bg-purple-500/10 border-purple-500/20 text-purple-500" 
        />
        <StatCard 
          icon={Briefcase} 
          label="Live Services" 
          value={stats.servicesCount} 
          color="bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white">Recent Inquiries</h3>
            <button className="text-xs font-bold text-cyan-500 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {stats.recentMessages.length > 0 ? stats.recentMessages.map((msg) => (
              <div key={msg.id} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {msg.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{msg.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{msg.service}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${msg.status === 'UNREAD' ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' : 'bg-slate-800 text-slate-500'}`}>
                  {msg.status}
                </div>
              </div>
            )) : (
              <p className="text-slate-500 text-sm font-medium py-10 text-center italic">No recent inquiries yet.</p>
            )}
          </div>
        </div>

        {/* Visitor Locations (Placeholder) */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white">Audience Growth</h3>
            <TrendingUp className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="h-64 flex flex-col items-center justify-center text-center gap-4">
            <MapPin className="w-12 h-12 text-slate-800" />
            <p className="text-slate-500 text-sm font-medium italic">Integration with Google Analytics <br /> and custom tracking is coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
