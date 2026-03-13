import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Image as ImageIcon, Smartphone, Info, Shield, Key } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const LogoSettings = () => {
  const [formData, setFormData] = useState({
    mainLogo: '',
    iconVersion: '',
    favicon: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/logo`);
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error('Error fetching logo:', err);
      }
    };
    fetchLogo();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.put(`${API_BASE_URL}/logo`, formData, config);
      setMessage('Settings updated successfully!');
    } catch (err) {
      console.error('Error updating logo:', err);
      setMessage('Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white">Logo & Site Settings</h2>
          <p className="text-slate-500 text-sm font-medium">Control your branding and core configurations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-4 bg-cyan-500 text-slate-950 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save All Changes'}
          <Save className="w-6 h-6" />
        </button>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-xl font-bold text-center border ${message.includes('successfully') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding Config */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col gap-6">
          <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-500" />
            Branding Configuration
          </h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Main Logo URL</label>
            <div className="relative">
              <input 
                required
                type="text" 
                placeholder="https://..."
                value={formData.mainLogo}
                onChange={(e) => setFormData({...formData, mainLogo: e.target.value})}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Icon Version (SVG/Small)</label>
            <div className="relative">
              <input 
                required
                type="text" 
                placeholder="https://..."
                value={formData.iconVersion}
                onChange={(e) => setFormData({...formData, iconVersion: e.target.value})}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Favicon URL</label>
            <div className="relative">
              <input 
                required
                type="text" 
                placeholder="https://..."
                value={formData.favicon}
                onChange={(e) => setFormData({...formData, favicon: e.target.value})}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 flex items-center justify-center font-bold text-[10px]">ICO</div>
            </div>
          </div>
        </div>

        {/* Security & System (Placeholder) */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col gap-6">
          <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-500" />
            System Status
          </h3>

          <div className="flex flex-col gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Database</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Connected (SQLite)</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Analytics</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Not Configured</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
            </div>

            <div className="p-6 bg-slate-950/50 border border-dashed border-slate-800 rounded-3xl mt-4 flex flex-col items-center justify-center text-center gap-4">
              <Info className="w-10 h-10 text-slate-800" />
              <p className="text-slate-600 text-xs font-medium italic">More system configurations like <br /> email SMTP, Cloudinary keys, and AI model <br /> selection will be manageable here soon.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogoSettings;
