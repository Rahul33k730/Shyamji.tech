"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  tags: string
}

export function Products() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio")
        if (res.ok) {
          const data = await res.json()
          setProjects(data)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (!isLoading && projects.length === 0) {
    return null // Don't show the section if there are no projects
  }

  return (
    <section id="products" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label"
            >
              OUR PORTFOLIO
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              Transforming Ideas into <br className="hidden md:block" />
              Digital Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#6B7280] text-lg max-w-xl leading-relaxed"
            >
              We don't just build software; we architect the core engines of modern digital businesses for long-term success.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/#contact" 
              className="btn-outline group"
            >
              View All Projects <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1A56DB]/0 group-hover:bg-[#1A56DB]/5 transition-colors duration-300" />
                </div>
                
                <div className="p-8 lg:p-10">
                  <span className="text-[10px] font-bold text-[#1A56DB] bg-[#EFF6FF] px-2 py-1 rounded-md uppercase tracking-wider mb-4 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#111827] mb-4 group-hover:text-[#1A56DB] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <Link 
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-[#1A56DB] font-bold text-sm hover:gap-3 transition-all"
                  >
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
