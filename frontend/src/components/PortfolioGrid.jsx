import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Quote, ArrowRight } from 'lucide-react';

const PortfolioCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card glass-card-hover group flex flex-col h-full overflow-hidden transition-colors duration-300"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={project.mediaUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'} 
          alt={project.projectName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 dark:opacity-80"
        />
        <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2">
          {(project.techStack || ['React', 'Tailwind']).slice(0, 2).map((tech, i) => (
            <span key={i} className="px-2.5 py-1 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest rounded-lg border border-slate-200 dark:border-white/10 shadow-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="mb-2 group-hover:text-cyan-500 transition-colors">
            {project.projectName}
          </h3>
          <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
        </div>

        {project.clientFeedback && (
          <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-xl border-l-2 border-cyan-500 flex flex-col gap-2 mb-6">
            <p className="text-xs italic text-slate-600 dark:text-slate-300 line-clamp-2">
              "{project.clientFeedback}"
            </p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-yellow-500 fill-yellow-500" />)}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors group/btn">
            View Case Study
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioGrid = ({ portfolio }) => {
  const defaultPortfolio = [
    { 
      projectName: 'Global FinTech Portal', 
      description: 'A high-performance financial dashboard for a major banking client with real-time AI analytics.',
      mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      techStack: ['React', 'D3.js', 'PostgreSQL'],
      clientFeedback: 'Shyamji Tech turned our complex data into a beautiful, functional platform. Truly professional.'
    },
    { 
      projectName: 'AI E-Commerce Suite', 
      description: 'Complete e-commerce ecosystem with AI-driven product recommendations and automated logistics.',
      mediaUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop',
      techStack: ['Next.js', 'Tailwind', 'Python'],
      clientFeedback: 'Sales increased by 40% after implementing the AI recommendation engine.'
    },
    { 
      projectName: 'Smart City Dashboard', 
      description: 'Real-time city management platform for IoT-connected devices and traffic optimization.',
      mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Vue.js', 'Go', 'MQTT'],
      clientFeedback: 'The most intuitive dashboard we have ever used for municipal data management.'
    },
  ];

  const data = portfolio && portfolio.length > 0 ? portfolio : defaultPortfolio;

  return (
    <section id="portfolio" className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container-custom">
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-cyan-500 font-bold tracking-widest uppercase text-xs mb-4"
          >
            <div className="w-8 h-[2px] bg-cyan-500" />
            Our Portfolio
          </motion.div>
          <h2 className="mb-6">
            A Glimpse of Our <span className="text-cyan-500">Masterpieces.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We've partnered with forward-thinking companies to build technology that doesn't just work—it inspires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((project, index) => (
            <PortfolioCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
