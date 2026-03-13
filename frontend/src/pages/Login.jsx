import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
      login(res.data.user, res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-2xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <ShieldCheck className="w-10 h-10 text-cyan-500" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Admin Portal</h2>
          <p className="text-slate-500 text-sm font-medium">Access your dashboard to manage Shyamji Tech content.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Username</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input 
                required
                type="text" 
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-slate-950/50 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Password</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-slate-950/50 border border-slate-800 rounded-2xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-700"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="group relative mt-4 overflow-hidden p-5 bg-cyan-500 text-slate-950 rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? 'Verifying...' : 'Login'}
            {!loading && <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
          Secured by Shyamji Tech AI
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
