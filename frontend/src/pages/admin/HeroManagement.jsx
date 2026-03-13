import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Video, Plus, X, Globe } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const HeroManagement = () => {
  const [formData, setFormData] = useState({
    backgroundUrl: '',
    backgroundType: 'IMAGE',
    missionTagline: '',
    floatingTaglines: [],
    cta1Text: '',
    cta1Link: '',
    cta2Text: '',
    cta2Link: '',
  });
  const [newTagline, setNewTagline] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/hero`);
        setFormData({ ...res.data, floatingTaglines: res.data.floatingTaglines.split(',').map(t => t.trim()) });
      } catch (err) {
        console.error('Error fetching hero:', err);
      }
    };
    fetchHero();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.put(`${API_BASE_URL}/hero`, { ...formData, floatingTaglines: formData.floatingTaglines.join(', ') });
      setMessage('Hero section updated successfully!');
    } catch (err) {
      console.error('Error updating hero:', err);
      setMessage('Failed to update hero section.');
    } finally {
      setLoading(false);
    }
  };

  const addTagline = () => {
    if (newTagline.trim()) {
      setFormData({ ...formData, floatingTaglines: [...formData.floatingTaglines, newTagline] });
      setNewTagline('');
    }
  };

  const removeTagline = (index) => {
    setFormData({ ...formData, floatingTaglines: formData.floatingTaglines.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white">Hero Management</h2>
          <p className="text-slate-500 text-sm font-medium">Control the first impression of your website.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-4 bg-cyan-500 text-slate-950 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
          <Save className="w-6 h-6" />
        </button>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-xl font-bold text-center border ${message.includes('successfully') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Background Config */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col gap-6">
          <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-500" />
            Background Configuration
          </h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Background Type</label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, backgroundType: 'IMAGE'})}
                className={`flex-grow p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold ${formData.backgroundType === 'IMAGE' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
              >
                <ImageIcon className="w-5 h-5" /> Image
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, backgroundType: 'VIDEO'})}
                className={`flex-grow p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold ${formData.backgroundType === 'VIDEO' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
              >
                <Video className="w-5 h-5" /> Video
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Background URL</label>
            <input 
              required
              type="text" 
              placeholder="https://..."
              value={formData.backgroundUrl}
              onChange={(e) => setFormData({...formData, backgroundUrl: e.target.value})}
              className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Mission Tagline</label>
            <input 
              required
              type="text" 
              placeholder="Turning Great Ideas Into Reality."
              value={formData.missionTagline}
              onChange={(e) => setFormData({...formData, missionTagline: e.target.value})}
              className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Floating Taglines */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col gap-6">
          <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-500" />
            Floating Taglines
          </h3>

          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="New tagline..."
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              className="flex-grow p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <button 
              type="button"
              onClick={addTagline}
              className="p-4 bg-slate-800 border border-slate-700 rounded-2xl text-cyan-500 hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {formData.floatingTaglines.map((tag, i) => (
              <div key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-sm font-bold text-slate-300">
                {tag}
                <button type="button" onClick={() => removeTagline(i)} className="text-slate-600 hover:text-red-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col gap-6 col-span-1 lg:col-span-2">
          <h3 className="text-xl font-black text-white mb-2">Call to Action Buttons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-black text-cyan-500 uppercase tracking-widest">Button 1 (Primary)</p>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Label</label>
                <input 
                  type="text" 
                  value={formData.cta1Text}
                  onChange={(e) => setFormData({...formData, cta1Text: e.target.value})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Link</label>
                <input 
                  type="text" 
                  value={formData.cta1Link}
                  onChange={(e) => setFormData({...formData, cta1Link: e.target.value})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-black text-cyan-500 uppercase tracking-widest">Button 2 (Secondary)</p>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Label</label>
                <input 
                  type="text" 
                  value={formData.cta2Text}
                  onChange={(e) => setFormData({...formData, cta2Text: e.target.value})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Link</label>
                <input 
                  type="text" 
                  value={formData.cta2Link}
                  onChange={(e) => setFormData({...formData, cta2Link: e.target.value})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroManagement;
