import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Box, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

import API_BASE_URL from '../../config/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    features: '',
    learnMore: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
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
        await axios.put(`${API_BASE_URL}/products/${editingId}`, formData, config);
        setMessage('Product updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/products`, formData, config);
        setMessage('Product created successfully!');
      }
      setFormData({
        name: '',
        image: '',
        description: '',
        features: '',
        learnMore: '',
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      setMessage('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      image: product.image,
      description: product.description,
      features: product.features,
      learnMore: product.learnMore,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`, config);
      fetchProducts();
      setMessage('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
      setMessage('Failed to delete product.');
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white">Products Management</h2>
          <p className="text-slate-500 text-sm font-medium">Manage your tech products and solutions.</p>
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
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Product Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Image URL</label>
              <input 
                required
                type="text" 
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
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
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Features (Comma-separated)</label>
              <textarea 
                required
                rows="2"
                placeholder="AI Integration, Scalable, Secure..."
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Learn More Link</label>
              <input 
                required
                type="text" 
                placeholder="https://..."
                value={formData.learnMore}
                onChange={(e) => setFormData({...formData, learnMore: e.target.value})}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 p-4 bg-cyan-500 text-slate-950 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', image: '', description: '', features: '', learnMore: '' });
                }}
                className="p-4 bg-slate-800 text-slate-400 rounded-2xl font-bold hover:bg-slate-700 transition-all"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {products.length > 0 ? products.map((product) => (
            <div key={product.id} className="p-6 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex items-center justify-between group hover:border-slate-700 transition-all overflow-hidden relative">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-black text-white">{product.name}</h4>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 max-w-lg font-medium">{product.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {product.features.split(',').map((feat, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                        {feat.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pr-2">
                <button 
                  onClick={() => handleEdit(product)}
                  className="p-4 bg-slate-800 text-slate-400 hover:text-cyan-500 rounded-2xl transition-all hover:scale-110 shadow-lg"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-4 bg-slate-800 text-slate-400 hover:text-red-500 rounded-2xl transition-all hover:scale-110 shadow-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-24 bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
              <Box className="w-20 h-20 text-slate-800" />
              <div>
                <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-lg mb-2">Inventory Empty</p>
                <p className="text-slate-600 text-sm font-medium">Add your first product to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
