import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currency, toggleCurrency } = useCurrency();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Products', href: '/#products' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'py-4 bg-[#000000]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'py-4 bg-bg-primary/90 backdrop-blur-xl border-b border-bg-secondary shadow-2xl'
        : 'py-6 bg-transparent'
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-secondary-blue rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-primary-blue/20 group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-navy-900 dark:text-white">
            Shyamji <span className="text-primary-blue">Tech</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 pr-8 border-r border-bg-secondary dark:border-white/10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-blue/70 dark:text-slate-400 hover:text-primary-blue dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-bg-secondary dark:hover:bg-white/5 transition-colors text-slate-blue/70 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={toggleCurrency}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-bg-secondary dark:border-white/10 text-xs font-bold text-slate-blue/70 dark:text-slate-400 hover:bg-bg-secondary dark:hover:bg-white/5 hover:text-navy-900 dark:hover:text-white transition-all"
            >
              <Globe size={14} className="text-primary-blue" />
              {currency}
            </button>

            {user ? (
              <Link to="/admin" className="btn-secondary py-2 px-4 flex items-center gap-2 text-sm">
                <LayoutDashboard size={16} className="text-primary-blue" />
                Dashboard
              </Link>
            ) : (
              <a href="#contact" className="btn-primary py-2 px-5 text-sm">
                Get a Quote
              </a>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-blue/70 dark:text-slate-400"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-navy-900 dark:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-surface/95 dark:bg-[#050505]/95 backdrop-blur-2xl border-b border-bg-secondary dark:border-white/5 py-8 px-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-slate-blue dark:text-slate-300 hover:text-primary-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 pt-4 border-t border-bg-secondary dark:border-white/5">
              <button 
                onClick={toggleCurrency}
                className="flex items-center justify-between p-4 rounded-xl bg-bg-primary dark:bg-white/5 text-navy-900 dark:text-white"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Globe size={18} className="text-primary-blue" />
                  Currency
                </span>
                <span className="font-bold">{currency}</span>
              </button>
              <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full py-4 text-center">Get a Quote</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
