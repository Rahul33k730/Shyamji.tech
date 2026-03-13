import React from 'react';
import { motion } from 'framer-motion';

const ServicesMarquee = ({ services }) => {
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
    <div className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-6 overflow-hidden relative transition-colors">
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
