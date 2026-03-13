import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Calendar, Users, Database, Brain, Globe, Smartphone, Zap, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const ServiceCard = ({ service, index }) => {
  const { currency } = useCurrency();
  const price = currency === 'INR' ? service.priceINR : service.priceUSD;
  const symbol = currency === 'INR' ? '₹' : '$';

  const icons = {
    Bot: Bot,
    Calendar: Calendar,
    Users: Users,
    Database: Database,
    Brain: Brain,
    Globe: Globe,
    Smartphone: Smartphone,
    Zap: Zap,
  };

  const IconComponent = icons[service.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card glass-card-hover p-8 flex flex-col h-full gap-6 group"
    >
      <div className="w-12 h-12 glass-card flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
        <IconComponent size={24} />
      </div>

      <div>
        <h3 className="mb-2 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors">
          {service.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
          {service.description}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 flex items-end justify-between transition-colors">
        <div>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Starting at</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
            <span className="text-cyan-600 dark:text-cyan-500 mr-1">{symbol}</span>
            {price.toLocaleString()}
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-cyan-500 hover:text-cyan-400 group/btn transition-colors">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const Services = ({ services }) => {
  const defaultServices = [
    { name: 'AI Chatbot Development', icon: 'Bot', description: 'Custom AI chatbots designed for high-conversion sales and customer engagement.', priceINR: 25000, priceUSD: 299 },
    { name: 'AI Appointment Scheduling', icon: 'Calendar', description: 'Automated AI scheduling systems that manage your calendar efficiently.', priceINR: 15000, priceUSD: 199 },
    { name: 'AI Virtual Agents', icon: 'Users', description: 'Intelligent AI agents that act as your virtual team members.', priceINR: 50000, priceUSD: 599 },
    { name: 'AI Data Cleaning', icon: 'Database', description: 'Precise AI tools to clean, organize, and structure your business data.', priceINR: 10000, priceUSD: 149 },
    { name: 'AI Model Training', icon: 'Brain', description: 'Customized AI training services tailored to your specific industry needs.', priceINR: 100000, priceUSD: 1199 },
    { name: 'Custom Web Development', icon: 'Globe', description: 'Modern, high-performance websites built with the latest technologies.', priceINR: 35000, priceUSD: 449 },
    { name: 'Mobile App Development', icon: 'Smartphone', description: 'Premium mobile experiences for both iOS and Android platforms.', priceINR: 60000, priceUSD: 749 },
    { name: 'AI Automation Solutions', icon: 'Zap', description: 'End-to-end automation workflows that optimize your business processes.', priceINR: 40000, priceUSD: 499 },
  ];

  const data = services && services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="section-padding transition-colors duration-500">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-cyan-500 font-bold tracking-widest uppercase text-xs mb-4"
          >
            <div className="w-8 h-[2px] bg-cyan-500" />
            Our Expertise
          </motion.div>
          <h2 className="mb-6">
            High-End <span className="text-cyan-500">AI & Tech</span> <br /> Solutions for Innovators.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We help you turn complex ideas into functional, affordable, and high-performance products using the latest in Artificial Intelligence and Web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
