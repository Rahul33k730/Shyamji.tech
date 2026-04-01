"use client"

import * as React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Globe, Smartphone, Brain, Database } from "lucide-react"

const cyclingWords = [
  "Smart Tech",
  "Elite Web Apps",
  "AI-Driven Growth",
  "Next-Gen Apps",
  "Scalable Systems"
];

function Counter({ value, target, suffix = "", delay = 1.4 }: { value: number, target: number, suffix?: string, delay?: number }) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const frames = 55;
    const increment = end / frames;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, duration / frames);
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [target, delay]);

  return <span className="stat-number">{count}{suffix}</span>;
}

export function Hero() {
  const [wordIndex, setWordIndex] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2800);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x = 0; y = 0; size = 0; speedY = 0; color = ""; opacity = 0; angle = 0;
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + 10;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#1ab8ff' : '#00e5a0';
        this.opacity = 0;
        this.angle = Math.random() * Math.PI * 2;
      }
      update() {
        this.y -= this.speedY;
        this.angle += 0.01;
        this.opacity = (Math.sin(this.angle) + 1) / 2 * 0.3;
        if (this.y < -10) this.init();
      }
      draw() {
        ctx!.globalAlpha = resolvedTheme === 'light' ? this.opacity * 0.5 : this.opacity;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < 130; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  const fadeUp: Variants = {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[100px] pb-[60px] px-[5%] overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />
      <div className="absolute inset-0 -z-10 hero-grid pointer-events-none" />
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#1ab8ff] rounded-full blur-[110px] opacity-[0.05] dark:opacity-[0.12] -z-10 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: -4.5 }}
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#00e5a0] rounded-full blur-[110px] opacity-[0.05] dark:opacity-[0.12] -z-10 pointer-events-none" 
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-[100px] items-center">
          {/* Left Column */}
          <div className="max-w-[750px]">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Zap className="w-4 h-4 text-[#1ab8ff]" />
              <span className="badge gradient-text">ENGINEERING THE DIGITAL FRONTIER</span>
            </motion.div>

            <motion.h1
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
              className="mb-8 text-primary leading-[1.1] sm:leading-[1.02] flex flex-col"
            >
              <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">Building the Future</span>
              <span className="flex items-center gap-[0.3em] whitespace-nowrap overflow-visible mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                <span>of</span>
                <span className="relative inline-flex min-w-[8ch] sm:min-w-[12ch] lg:min-w-[15ch] h-[1.2em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 10, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="gradient-text absolute left-0 whitespace-nowrap py-1"
                    >
                      {cyclingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="text-secondary text-[1.15rem] mb-12 max-w-[600px] font-light leading-[1.7] tracking-tight"
            >
              We engineer high-performance digital infrastructure for the next generation of startups. From AI-driven automation to scalable enterprise platforms, we turn complex technical challenges into seamless reality.
            </motion.p>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.65 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-20"
            >
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#1ab8ff] to-[#00e5a0] text-[#080a0e] btn-text h-12 px-8 rounded-xl hover:-translate-y-0.5 transition-transform hover:shadow-[0_8px_40px_rgba(26,184,255,0.35)] border-none group">
                Get Started <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border/10 hover:border-[#1ab8ff] btn-text h-12 px-8 rounded-xl text-primary bg-transparent">
                View Services →
              </Button>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="space-y-6"
            >
              <p className="badge text-secondary">PARTNERING WITH GLOBAL INNOVATORS</p>
              <div className="grid grid-cols-3 gap-6 sm:gap-12">
                <div className="space-y-1">
                  <Counter value={0} target={50} suffix="+" />
                  <p className="card-description text-[10px] sm:text-xs">Platforms Deployed</p>
                </div>
                <div className="space-y-1">
                  <Counter value={0} target={98} suffix="%" />
                  <p className="card-description text-[10px] sm:text-xs">Success Rate</p>
                </div>
                <div className="space-y-1">
                  <Counter value={0} target={3} suffix="x" />
                  <p className="card-description text-[10px] sm:text-xs">Velocity Index</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="relative flex lg:flex flex-col gap-6 mt-12 lg:mt-0">
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative p-6 sm:p-8 glass rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl z-20"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <div className="badge text-secondary mb-1">CURRENTLY BUILDING</div>
                  <h3 className="text-xl font-bold text-primary">Client Dashboard v2.4</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#00e5a0]/10 border border-[#00e5a0]/20 rounded-full text-[#00e5a0] text-[10px] font-bold">
                  <div className="w-1.5 h-1.5 bg-[#00e5a0] rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Service Rows */}
              <div className="space-y-4">
                {[
                  { icon: Globe, label: "Web Development", desc: "React, Next.js, full-stack apps", badge: "Popular", bColor: "#1ab8ff" },
                  { icon: Smartphone, label: "Mobile Apps", desc: "iOS, Android, React Native", badge: "New", bColor: "#00e5a0" },
                  { icon: Brain, label: "AI & Automation", desc: "GPT integrations, data pipelines", badge: "Hot", bColor: "#f43f5e" },
                  { icon: Database, label: "Data Engineering", desc: "Cleaning, ETL & analytics", badge: "Fast", bColor: "#8b5cf6" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 border border-border/5 hover:bg-foreground/10 transition-colors group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-bold text-primary">{item.label}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.bColor}20`, color: item.bColor }}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Row Mini Cards */}
            <div className="grid grid-cols-2 gap-6 px-2">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -1.2 }}
                className="p-6 glass rounded-3xl shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1ab8ff]/10 flex items-center justify-center text-[#1ab8ff]">⚡</div>
                  <div className="stat-number text-lg text-primary">14d</div>
                </div>
                <p className="card-description text-[10px]">Avg. MVP Delivery</p>
                <div className="text-[10px] text-[#00e5a0] font-bold mt-1">↑ 2x faster</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -3.2 }}
                className="p-6 glass rounded-3xl shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00e5a0]/10 flex items-center justify-center text-[#00e5a0]">🚀</div>
                  <div className="stat-number text-lg text-primary">∞</div>
                </div>
                <p className="card-description text-[10px]">Ideas We Can Build</p>
                <div className="text-[10px] text-secondary font-bold mt-1">Any Stack</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
