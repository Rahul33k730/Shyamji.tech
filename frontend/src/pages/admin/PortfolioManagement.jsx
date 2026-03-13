import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Briefcase, Trash2, Edit2, Image as ImageIcon, Video, Star } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const PortfolioManagement = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    mediaUrl: '',
    mediaType: 'IMAGE',
    techStack: '',
    clientFeedback: '',
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/portfolio`);
      setPortfolio(res.data);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/portfolio/${editingId}`, formData, config);
        setMessage('Portfolio item updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/portfolio`, formData, config);
        setMessage('Portfolio item created successfully!');
      }
      setFormData({
        projectName: '',
        description: '',
        mediaUrl: '',
        mediaType: 'IMAGE',
        techStack: '',
        clientFeedback: '',
      });
      setEditingId(null);
      fetchPortfolio();
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setMessage('Failed to save portfolio item.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      projectName: item.projectName,
      description: item.description,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
      techStack: item.techStack,
      clientFeedback: item.clientFeedback || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;
    
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${API_BASE_URL}/portfolio/${id}`, config);
      fetchPortfolio();
      setMessage('Portfolio item deleted successfully!');
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      setMessage('Failed to delete portfolio item.');
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white">Portfolio Management</h2>
          <p className="text-slate-500 text-sm font-medium">Showcase your best tech projects.</p>
        </div>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-xl font-bold text-center border ${message.includes('successfully') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col gap-6 sticky top-8">
            <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-500" />
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Project Name</label>
              <input 
                required
                type="text" 
                value={formData.projectName}
                onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Media URL</label>
              <input 
                required
                type="text" 
                placeholder="https://..."
                value={formData.mediaUrl}
                onChange={(e) => setFormData({...formData, mediaUrl: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Media Type</label>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, mediaType: 'IMAGE'})}
                  className={`flex-grow p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold ${formData.mediaType === 'IMAGE' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  <ImageIcon className="w-5 h-5" /> Image
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, mediaType: 'VIDEO'})}
                  className={`flex-grow p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold ${formData.mediaType === 'VIDEO' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  <Video className="w-5 h-5" /> Video
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Description</label>
              <textarea 
                required
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Tech Stack (Comma-separated)</label>
              <textarea 
                required
                rows="2"
                placeholder="React, Node.js, AI..."
                value={formData.techStack}
                onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Client Feedback (Optional)</label>
              <textarea 
                rows="2"
                value={formData.clientFeedback}
                onChange={(e) => setFormData({...formData, clientFeedback: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 p-4 bg-cyan-500 text-slate-950 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ projectName: '', description: '', mediaUrl: '', mediaType: 'IMAGE', techStack: '', clientFeedback: '' });
                }}
                className="p-4 bg-slate-800 text-slate-400 rounded-2xl font-bold hover:bg-slate-700 transition-all"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          {portfolio.length > 0 ? portfolio.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={item.mediaUrl} alt={item.projectName} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                {item.mediaType === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-12 h-12 text-white/50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-3 bg-slate-950/80 backdrop-blur-md text-cyan-400 rounded-xl hover:scale-110 transition-transform"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-3 bg-slate-950/80 backdrop-blur-md text-red-400 rounded-xl hover:scale-110 transition-transform"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-black text-white">{item.projectName}</h4>
                <p className="text-sm text-slate-500 mt-3 line-clamp-2 font-medium">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {item.techStack.split(',').map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                {item.clientFeedback && (
                  <div className="mt-6 p-4 bg-slate-950 border-l-2 border-cyan-500 rounded-r-2xl italic text-xs text-slate-400 leading-relaxed">
                    <Star className="w-3 h-3 text-cyan-500 mb-2" fill="currentColor" />
                    "{item.clientFeedback}"
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="col-span-full p-24 bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
              <Briefcase className="w-20 h-20 text-slate-800" />
              <div>
                <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-lg mb-2">Portfolio Empty</p>
                <p className="text-slate-600 text-sm font-medium">Add your first project showcase.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;
