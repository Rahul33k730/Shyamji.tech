import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Briefcase, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: '',
    priceINR: 0,
    priceUSD: 0,
    order: 0,
    showInMarquee: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/services`);
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services:', err);
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
        await axios.put(`${API_BASE_URL}/services/${editingId}`, formData, config);
        setMessage('Service updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/services`, formData, config);
        setMessage('Service created successfully!');
      }
      setFormData({
        name: '',
        icon: '',
        description: '',
        priceINR: 0,
        priceUSD: 0,
        order: 0,
        showInMarquee: true,
      });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      setMessage('Failed to save service.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      icon: service.icon,
      description: service.description,
      priceINR: service.priceINR,
      priceUSD: service.priceUSD,
      order: service.order,
      showInMarquee: service.showInMarquee,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${API_BASE_URL}/services/${id}`, config);
      fetchServices();
      setMessage('Service deleted successfully!');
    } catch (err) {
      console.error('Error deleting service:', err);
      setMessage('Failed to delete service.');
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white">Services Management</h2>
          <p className="text-slate-500 text-sm font-medium">Manage your tech offerings and pricing.</p>
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
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Service Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Icon Name (Lucide)</label>
              <input 
                required
                type="text" 
                placeholder="Code, Layout, Smartphone..."
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Description</label>
              <textarea 
                required
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Price (INR)</label>
                <input 
                  type="number" 
                  value={formData.priceINR}
                  onChange={(e) => setFormData({...formData, priceINR: parseFloat(e.target.value)})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Price (USD)</label>
                <input 
                  type="number" 
                  value={formData.priceUSD}
                  onChange={(e) => setFormData({...formData, priceUSD: parseFloat(e.target.value)})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex-grow flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Order</label>
                <input 
                  type="number" 
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox"
                  id="showInMarquee"
                  checked={formData.showInMarquee}
                  onChange={(e) => setFormData({...formData, showInMarquee: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="showInMarquee" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Marquee</label>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 p-4 bg-cyan-500 text-slate-950 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', icon: '', description: '', priceINR: 0, priceUSD: 0, order: 0, showInMarquee: true });
                }}
                className="p-4 bg-slate-800 text-slate-400 rounded-2xl font-bold hover:bg-slate-700 transition-all"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {services.length > 0 ? services.map((service) => (
            <div key={service.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between group hover:border-slate-700 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform shadow-lg">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">{service.name}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1 max-w-md">{service.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">₹{service.priceINR} / ${service.priceUSD}</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Order: {service.order}</span>
                    {service.showInMarquee && <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full">In Marquee</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(service)}
                  className="p-3 bg-slate-800 text-slate-400 hover:text-cyan-500 rounded-xl transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="p-3 bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-20 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4">
              <Briefcase className="w-16 h-16 text-slate-800" />
              <p className="text-slate-500 font-bold uppercase tracking-widest">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
