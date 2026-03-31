"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "glass" | "bordered" | "default"
  padding?: "sm" | "md" | "lg" | "none"
}

export function Card({
  className,
  variant = "default",
  padding = "md",
  ...props
}: CardProps) {
  const variants = {
    glass: "glass backdrop-blur-xl border border-border/10",
    bordered: "bg-background border border-border/10 hover:border-border/30",
    default: "bg-card text-card-foreground shadow-sm border border-border/10",
  }

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-10",
    none: "p-0",
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    />
  )
}
