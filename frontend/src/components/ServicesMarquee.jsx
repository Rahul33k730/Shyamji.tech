import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ServicesMarquee = ({ services }) => {
  const { theme } = useTheme();
  const marqueeServices = services?.filter(s => s.showInMarquee) || [
    'AI Chatbot for Sales',
    'AI Appointment Scheduler',
    'AI Virtual Agents',
    'AI Data Cleaning',
    'AI Model Training',
    'Web Development',
    'Mobile App Development',
    'AI Automation Solutions',
  ];

  const marqueeContent = [...marqueeServices, ...marqueeServices]; // Duplicate for seamless loop

  return (
    <div className={`border-y py-6 overflow-hidden relative transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#030a21] border-white/5' : 'bg-[#E0F2FE] border-[#E0F2FE]'
    }`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-custom {
          animation: marquee 40s linear infinite;
        }
      `}</style>
      <div className="flex items-center gap-12 whitespace-nowrap animate-marquee-custom">
        {marqueeContent.map((service, index) => (
          <div key={index} className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-slate-400 dark:text-slate-400 group-hover:text-cyan-500 transition-colors uppercase italic">
              {typeof service === 'string' ? service : service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesMarquee;
