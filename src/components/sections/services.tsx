"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Globe, Laptop, Rocket, Shield, Terminal } from "lucide-react"

export function Services() {
  const [servicesData, setServicesData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServicesData(data.filter((s: any) => s.status === "active"));
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const iconMap: any = {
    Brain, Globe, Laptop, Rocket, Shield, Terminal
  };

  const initialServices = [
    {
      id: "1",
      name: "AI Model Training",
      description: "Customized AI training services tailored to your specific industry needs.",
      price: "₹100,000",
      category: "AI & Automation",
      icon: "Brain",
      status: "active",
    },
    {
      id: "2",
      name: "Custom Web Development",
      description: "High-performance custom websites built with modern technologies like React and Next.js.",
      price: "₹35,000",
      category: "Web Development",
      icon: "Globe",
      status: "active",
    },
    {
      id: "3",
      name: "Mobile App Development",
      description: "Native and cross-platform mobile applications designed for seamless user experiences.",
      price: "₹60,000",
      category: "Mobile Apps",
      icon: "Smartphone",
      status: "active",
    },
    {
      id: "4",
      name: "AI Automation Solutions",
      description: "Automate your business workflows with intelligent AI-driven automation systems.",
      price: "₹40,000",
      category: "AI & Automation",
      icon: "Zap",
      status: "active",
    },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-left mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[36px] font-heading font-semibold mb-6 tracking-tight text-primary"
          >
            Engineering Excellence for <br />
            <span className="gradient-text">Global Innovators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-secondary text-[16px] max-w-2xl leading-[1.6] font-normal"
          >
            We deploy industrial-grade AI, cloud-native architectures, and mission-critical software systems designed for infinite scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {(loading || servicesData.length === 0 ? initialServices : servicesData).map((service, i) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="glass" padding="lg" className="h-full group hover:border-[#1ab8ff]/40 transition-all duration-300 flex flex-col hover:translate-x-[5px] glow-card hover:shadow-[0_0_30px_rgba(26,184,255,0.1)]">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-[#1ab8ff]/10`}>
                    <Icon className={`w-6 h-6 text-[#1ab8ff]`} />
                  </div>
                  <h3 className="text-[20px] font-heading font-semibold mb-3 tracking-tight text-primary">{service.name}</h3>
                  <p className="card-description mb-8 flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-border/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="badge text-muted mb-1">Starting at</span>
                      <span className="stat-number text-xl text-primary">{service.price}</span>
                    </div>
                    <Button className="bg-foreground/5 text-primary border border-border/10 hover:border-[#1ab8ff]/50 btn-text py-2 px-4 rounded-lg">
                      Learn More →
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
