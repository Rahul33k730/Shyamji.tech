"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { tile: "w-14 h-14", text: "text-2xl" },
    md: { tile: "w-20 h-20", text: "text-3xl" },
    lg: { tile: "w-32 h-32", text: "text-5xl" },
  };

  const currentSize = sizes[size];

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      {/* Logo Image */}
      <div 
        className={cn(
          "relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
          currentSize.tile
        )}
      >
        <Image 
          src="/logo3.jpeg" 
          alt="Shyamji Tech Logo" 
          fill 
          className="object-contain rounded-lg" 
          priority 
          placeholder="empty" 
        />
      </div>

      {/* Website Name */}
      <span className={cn(
        "font-black tracking-tight transition-colors duration-300",
        "text-blue-600 group-hover:text-blue-700",
        currentSize.text
      )}>
        Shyamji Tech
      </span>
    </div>
  );
}
