import React from 'react';
import { motion } from 'framer-motion';
import { Video, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  const icons = {
    EditXpress: <Video className="w-12 h-12 text-primary-blue" />,
    Telehealth: <HeartPulse className="w-12 h-12 text-primary-blue" />,
  };

  const defaultFeatures = [
    'Feature 1: Advanced AI Integration',
    'Feature 2: Real-time Data Sync',
    'Feature 3: Scalable Architecture',
  ];

  return (
    <div className="card-premium grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
      {/* Image Side */}
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary-blue/10 dark:shadow-none">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col gap-8">
        <div className="w-16 h-16 glass-card flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          {icons[product.name] || <Video className="w-8 h-8 text-primary-blue" />}
        </div>

        <div>
          <h2 className="mb-4 text-navy-900 dark:text-white group-hover:text-primary-blue dark:group-hover:text-secondary-blue transition-colors">
            {product.name}
          </h2>
          <p className="text-lg text-slate-blue dark:text-slate-400">
            {product.description}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(product.features || defaultFeatures).map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-blue dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary-blue flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <button className="btn-primary w-fit px-8 py-4 flex items-center gap-2 text-lg">
          Learn More
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Products = ({ products }) => {
  const defaultProducts = [
    { 
      name: 'EditXpress', 
      description: 'The ultimate AI-powered video editing platform that makes professional editing accessible to everyone. Automate cuts, transitions, and effects with just one click.',
      features: ['AI Scene Detection', 'Auto-Captions', 'Smart Transitions', 'Cloud Export', 'Multi-user Collaboration'],
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Telehealth Platform', 
      description: 'A complete, secure, and futuristic telehealth solution connecting patients with top-tier healthcare providers. Integrated AI diagnosis support and real-time vitals monitoring.',
      features: ['HIPAA Compliant', 'AI Health Assistant', 'Video Consultations', 'Digital Prescription', 'Pharmacy Integration'],
      image: 'https://images.unsplash.com/photo-1576091160550-2173bdd99602?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  const data = products && products.length > 0 ? products : defaultProducts;

  return (
    <section id="products" className="section-padding relative overflow-hidden transition-colors duration-500">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-blue/5 blur-[150px] pointer-events-none" />

      <div className="container-custom">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:text-secondary-blue text-xs font-bold tracking-widest uppercase mb-6"
          >
            Built for the Future
          </motion.div>
          <h2 className="max-w-4xl mb-6">
            Premium <span className="text-primary-blue">Products</span> <br /> from Shyamji Tech.
          </h2>
          <p className="max-w-2xl text-lg text-slate-blue dark:text-slate-400">
            We don't just build for clients; we build for the future. Explore our own proprietary platforms that are changing the way people use technology.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {data.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
