import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = ({ heroData }) => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    return scrollOpacity.onChange(v => setOpacity(v));
  }, [scrollOpacity]);

  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = typeof heroData?.floatingTaglines === 'string' 
    ? heroData.floatingTaglines.split(',').map(t => t.trim())
    : (heroData?.floatingTaglines || ['Innovate', 'Automate', 'Empower', 'Transform', 'Scale']);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [taglines.length]);

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 z-10 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#FFF5F7]'}`}
    >
      {/* Premium Animated Gradient Mesh Background */}
      <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-500 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#FFF5F7]'}`}>
        {/* Dark Mode Background Elements */}
        <div className={`absolute inset-0 bg-[#020617] transition-opacity duration-700 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
          {/* Animated Gradient Mesh Blobs */}
          <motion.div
            animate={{
              x: ['-20%', '10%', '-20%'],
              y: ['-10%', '20%', '-10%'],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-blue-900/40 blur-[150px] mix-blend-screen"
          />
          <motion.div
            animate={{
              x: ['20%', '-10%', '20%'],
              y: ['20%', '-10%', '20%'],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-cyan-900/30 blur-[150px] mix-blend-screen"
          />
          <motion.div
            animate={{
              x: ['-10%', '20%', '-10%'],
              y: ['30%', '10%', '30%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#00BFFF]/10 blur-[120px] mix-blend-screen"
          />
          <motion.div
            animate={{
              x: ['10%', '-20%', '10%'],
              y: ['-20%', '10%', '-20%'],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
            className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-[#6FFFE9]/10 blur-[120px] mix-blend-screen"
          />
          
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-[#020617]/40"></div>
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-[#020617]/80 opacity-50"></div>
        </div>

        {/* Light Mode Background Elements */}
        <div className={`absolute inset-0 bg-[#FFF5F7] transition-opacity duration-700 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFEBF0] blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFEBF0] blur-[120px] rounded-full"></div>
        </div>
        
        {/* Subtle noise texture for premium feel */}
        <div className={`absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-500 ${theme === 'dark' ? 'opacity-[0.05]' : 'opacity-[0.03]'}`} 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          style={{ opacity }}
          className="flex flex-col items-center gap-6"
        >
          {/* Animated Tagline Badge */}
          <motion.div
            key={taglineIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(0,191,255,0.1)] dark:shadow-[0_0_15px_rgba(0,191,255,0.2)]"
          >
            {taglines[taglineIndex]}
          </motion.div>

          {/* Mission Tagline */}
          <h1 className="leading-[1.1] text-slate-900 dark:text-white transition-colors duration-500">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block mb-2 text-2xl md:text-3xl font-medium text-cyan-600 dark:text-cyan-400 tracking-widest uppercase"
            >
              Shyamji Tech
            </motion.span>
            Turning Great Ideas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 dark:from-[#00BFFF] dark:via-[#6FFFE9] dark:to-blue-500 drop-shadow-[0_0_25px_rgba(0,191,255,0.1)] dark:drop-shadow-[0_0_25px_rgba(0,191,255,0.3)] transition-all duration-500">
              Into Reality.
            </span>
          </h1>

          <p className="max-w-2xl mt-4 text-slate-600 dark:text-slate-300 font-light text-lg transition-colors duration-500">
            Shyamji Tech is a premium innovation hub helping people build their ideas into high-end products through affordable and accessible technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4 rounded-full">
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4 rounded-full">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
