import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 pt-20 pb-10 transition-colors duration-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                Shyamji <span className="text-cyan-500">Tech</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Empowering innovators with high-end, affordable AI and tech solutions. We turn your visionary ideas into digital reality.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass-card flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:border-cyan-500/30 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
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
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Subscribe to get the latest tech insights and updates.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="input-field pr-12 text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-500 text-slate-950 rounded-lg flex items-center justify-center hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
            © {currentYear} Shyamji Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs text-slate-500 dark:text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Systems Operational
            </div>
            <p>Designed with ❤️ for Innovators</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
