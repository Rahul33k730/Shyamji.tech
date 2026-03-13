import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, User, Bot, Trash2, Calendar, Search, Filter } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const ChatLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, USER, AI

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/chatbot/logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(res.data);
    } catch (err) {
      console.error('Error fetching chat logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'ALL' ? true : log.sender === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.sessionId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Group logs by session for a better view
  const groupedLogs = filteredLogs.reduce((acc, log) => {
    if (!acc[log.sessionId]) acc[log.sessionId] = [];
    acc[log.sessionId].push(log);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">AI Chat Logs</h2>
          <p className="text-slate-500 text-sm font-medium">Monitor real-time AI conversations and user interactions.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search conversations..."
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
              <option value="USER">User</option>
              <option value="AI">AI</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="p-24 bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-lg">Retrieving Logs...</p>
          </div>
        ) : Object.keys(groupedLogs).length > 0 ? (
          Object.keys(groupedLogs).map((sessionId) => (
            <div key={sessionId} className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] group hover:border-slate-700 transition-all overflow-hidden relative">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-500">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Session ID</h4>
                    <p className="text-xs text-slate-500 font-mono mt-1">{sessionId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  {new Date(groupedLogs[sessionId][0].createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-custom">
                {groupedLogs[sessionId].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)).map((log) => (
                  <div key={log.id} className={`flex ${log.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] flex items-start gap-4 ${log.sender === 'USER' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${log.sender === 'USER' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                        {log.sender === 'USER' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm font-medium ${log.sender === 'USER' ? 'bg-cyan-500 text-slate-950 rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none'}`}>
                        {log.message}
                        <div className={`text-[8px] font-bold mt-2 uppercase tracking-widest opacity-50 ${log.sender === 'USER' ? 'text-slate-950' : 'text-slate-500'}`}>
                          {new Date(log.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-24 bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
            <MessageSquare className="w-20 h-20 text-slate-800" />
            <div>
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-lg mb-2">No Chat History</p>
              <p className="text-slate-600 text-sm font-medium">No conversation logs found in the database.</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
      `}</style>
    </div>
  );
};

export default ChatLogs;
