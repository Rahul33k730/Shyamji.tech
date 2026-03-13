import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Mail, 
  Globe, 
  LogOut, 
  Menu, 
  X,
  Box,
  Monitor
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import DashboardHome from './admin/DashboardHome';
import HeroManagement from './admin/HeroManagement';
import ServiceManagement from './admin/ServiceManagement';
import ProductManagement from './admin/ProductManagement';
import PortfolioManagement from './admin/PortfolioManagement';
import ContactMessages from './admin/ContactMessages';
import ChatLogs from './admin/ChatLogs';
import LogoSettings from './admin/LogoSettings';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link 
    to={path} 
    onClick={onClick}
    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${active ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-slate-950' : 'text-cyan-500 group-hover:scale-110 transition-transform'}`} />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Monitor, label: 'Hero Section', path: '/admin/hero' },
    { icon: Briefcase, label: 'Services', path: '/admin/services' },
    { icon: Box, label: 'Products', path: '/admin/products' },
    { icon: ImageIcon, label: 'Portfolio', path: '/admin/portfolio' },
    { icon: Mail, label: 'Messages', path: '/admin/messages' },
    { icon: MessageSquare, label: 'Chat Logs', path: '/admin/chats' },
    { icon: Globe, label: 'Logo & Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xl">S</div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Admin<span className="text-cyan-500">Panel</span></h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shyamji Tech</p>
            </div>
          </div>

          <nav className="flex-grow flex flex-col gap-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.path}
                {...item}
                active={location.pathname === item.path}
              />
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="flex items-center gap-4 px-4 mb-6">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-cyan-500 font-bold border border-slate-700">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{user?.username}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all group font-bold text-sm"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-white">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white">Welcome back, {user?.username}!</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">You have full access</p>
            </div>
            <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
              <Settings className="w-6 h-6 text-cyan-500 animate-spin-slow" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/hero" element={<HeroManagement />} />
            <Route path="/services" element={<ServiceManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/portfolio" element={<PortfolioManagement />} />
            <Route path="/messages" element={<ContactMessages />} />
            <Route path="/chats" element={<ChatLogs />} />
            <Route path="/settings" element={<LogoSettings />} />
          </Routes>
        </div>
      </main>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
