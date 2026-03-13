import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Services', href: '/#services' },
      { name: 'Products', href: '/#products' },
      { name: 'Portfolio', href: '/#portfolio' },
    ],
    Services: [
      { name: 'AI Chatbots', href: '/#services' },
      { name: 'Web Dev', href: '/#services' },
      { name: 'App Dev', href: '/#services' },
      { name: 'Automation', href: '/#services' },
    ],
    Support: [
      { name: 'Contact', href: '/#contact' },
      { name: 'Admin Login', href: '/admin-login' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ]
  };

  return (
    <footer className={`border-t pt-20 pb-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#000000] border-white/5' : 'bg-bg-secondary border-bg-secondary'
    }`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-secondary-blue rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-primary-blue/20 group-hover:scale-110 transition-transform">
                S
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-navy-900'}`}>
                Shyamji <span className="text-primary-blue">Tech</span>
              </span>
            </Link>
            <p className={`max-w-xs text-sm leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-blue'}`}>
              Empowering innovators with high-end, affordable AI and tech solutions. We turn your visionary ideas into digital reality.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className={`w-10 h-10 border rounded-xl flex items-center justify-center transition-all duration-500 ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:text-secondary-blue' : 'bg-surface border-bg-secondary text-slate-blue hover:text-primary-blue'
                }`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className={`font-bold mb-6 text-sm uppercase tracking-widest transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-navy-900'}`}>{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className={`text-sm transition-colors duration-500 flex items-center gap-1 group ${
                        theme === 'dark' ? 'text-slate-400 hover:text-secondary-blue' : 'text-slate-blue hover:text-primary-blue'
                      }`}>
                        {link.name}
                        {link.href.startsWith('http') && <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter/Contact Column */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-widest transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-navy-900'}`}>Newsletter</h4>
            <p className={`text-sm transition-colors duration-500 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-blue'}`}>Subscribe to get the latest tech insights and updates.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-500 ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-secondary-blue' : 'bg-bg-primary border-bg-secondary text-navy-900 placeholder:text-slate-blue/50 focus:border-primary-blue'
                }`}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-blue text-white rounded-lg flex items-center justify-center hover:bg-secondary-blue transition-colors shadow-lg shadow-primary-blue/20">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-500 ${
          theme === 'dark' ? 'border-white/5' : 'border-bg-secondary'
        }`}>
          <p className={`text-xs font-medium transition-colors duration-500 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-blue/60'}`}>
            © {currentYear} Shyamji Tech. All rights reserved.
          </p>
          <div className={`flex items-center gap-8 text-xs font-medium transition-colors duration-500 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-blue/60'}`}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
