import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Quote, ArrowRight } from 'lucide-react';

const PortfolioCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full shadow-sm dark:shadow-none"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={project.mediaUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'} 
          alt={project.projectName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
          {(project.techStack || ['React', 'Node.js']).map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest rounded-full border border-cyan-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
            {project.projectName}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {project.clientFeedback && (
          <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border-l-4 border-cyan-500 flex flex-col gap-3 mb-6">
            <Quote className="w-5 h-5 text-cyan-500/30" />
            <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
              "{project.clientFeedback}"
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
            </div>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-500 transition-colors group/btn">
            View Case Study
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = ({ portfolio }) => {
  const defaultPortfolio = [
    { 
      projectName: 'Global FinTech Portal', 
      description: 'A high-performance financial dashboard for a major banking client with real-time AI analytics.',
      mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      techStack: ['React', 'D3.js', 'PostgreSQL', 'AI Engine'],
      clientFeedback: 'Shyamji Tech turned our complex data into a beautiful, functional platform. Truly professional.'
    },
    { 
      projectName: 'AI E-Commerce Suite', 
      description: 'Complete e-commerce ecosystem with AI-driven product recommendations and automated logistics.',
      mediaUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop',
      techStack: ['Next.js', 'Tailwind', 'Stripe', 'Python'],
      clientFeedback: 'Sales increased by 40% after implementing the AI recommendation engine built by Shyamji Tech.'
    },
    { 
      projectName: 'Smart City Dashboard', 
      description: 'Real-time city management platform for IoT-connected devices and traffic optimization.',
      mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Vue.js', 'Go', 'MQTT', 'InfluxDB'],
      clientFeedback: 'The most intuitive dashboard we have ever used for municipal data management.'
    },
  ];

  const data = portfolio && portfolio.length > 0 ? portfolio : defaultPortfolio;

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-cyan-500 font-bold tracking-widest uppercase text-sm mb-4"
            >
              <div className="w-12 h-1 bg-cyan-500" />
              Success Stories
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight transition-colors">
              A Glimpse of Our <br /> <span className="text-cyan-500">Masterpieces.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-6 text-lg leading-relaxed transition-colors">
              We've partnered with forward-thinking companies to build technology that doesn't just work—it inspires.
            </p>
          </div>
          <button className="px-8 py-4 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
            View All Projects
            <ArrowRight className="w-5 h-5 text-cyan-500" />
          </button>
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

export default Portfolio;
