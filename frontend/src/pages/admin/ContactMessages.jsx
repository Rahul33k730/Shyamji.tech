import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Trash2, CheckCircle, Clock, Archive, Filter, Search } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL'); // ALL, UNREAD, READ, ARCHIVED
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/contact/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = filter === 'ALL' ? true : msg.status === filter;
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Contact Messages</h2>
          <p className="text-slate-500 text-sm font-medium">Review and manage your incoming tech inquiries.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 pr-2">
            <Filter className="w-4 h-4 text-cyan-500 ml-2" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-slate-400 text-xs font-black uppercase tracking-widest focus:outline-none cursor-pointer"
            >
              <option value="ALL">All</option>
              <option value="UNREAD">Unread</option>
              <option value="READ">Read</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="p-24 bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-lg">Loading Inquiries...</p>
          </div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <motion.div 
              layout
              key={msg.id} 
              className={`p-8 bg-slate-900 border rounded-[2.5rem] transition-all group relative overflow-hidden ${msg.status === 'UNREAD' ? 'border-cyan-500/30 bg-slate-900/80 shadow-[0_0_40px_rgba(6,182,212,0.05)]' : 'border-slate-800 hover:border-slate-700'}`}
            >
              {msg.status === 'UNREAD' && <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>}
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center font-black text-2xl text-cyan-500 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-center border ${msg.status === 'UNREAD' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                    {msg.status}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-xl font-black text-white">{msg.name}</h4>
                      <p className="text-cyan-500 text-xs font-black uppercase tracking-[0.15em] mt-1">{msg.service}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800">
                      <Clock className="w-4 h-4" />
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-slate-400 hover:border-cyan-500/30 hover:text-white transition-all group/link">
                      <Mail className="w-5 h-5 text-cyan-500 group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{msg.email}</span>
                    </a>
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-slate-400 hover:border-cyan-500/30 hover:text-white transition-all group/link">
                      <Phone className="w-5 h-5 text-cyan-500 group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{msg.phone}</span>
                    </a>
                  </div>

                  <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-3xl relative">
                    <MessageSquare className="absolute -top-3 -left-3 w-8 h-8 text-slate-800/50" fill="currentColor" />
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-8 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    {msg.status !== 'READ' && (
                      <button 
                        onClick={() => updateStatus(msg.id, 'READ')}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-500 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest"
                      >
                        <CheckCircle className="w-4 h-4" /> Mark Read
                      </button>
                    )}
                    {msg.status !== 'ARCHIVED' && (
                      <button 
                        onClick={() => updateStatus(msg.id, 'ARCHIVED')}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white rounded-2xl transition-all font-bold text-xs uppercase tracking-widest"
                      >
                        <Archive className="w-4 h-4" /> Archive
                      </button>
                    )}
                    <button 
                      className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-24 bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
            <Mail className="w-20 h-20 text-slate-800" />
            <div>
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-lg mb-2">Inbox Empty</p>
              <p className="text-slate-600 text-sm font-medium">No messages found matching your criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
