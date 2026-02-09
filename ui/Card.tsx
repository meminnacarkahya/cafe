"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`
        rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden
        transition-shadow duration-200
        ${hover ? "hover:shadow-lg" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
