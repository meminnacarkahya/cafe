"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  highlight,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
        {highlight && (
          <span className="relative inline-block ml-1">
            <span className="relative z-10">{highlight}</span>
            <span
              className="absolute bottom-1 left-0 w-full h-3 bg-accent -z-0"
              aria-hidden
            />
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-600 text-base md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
