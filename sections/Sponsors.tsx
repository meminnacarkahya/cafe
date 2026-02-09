"use client";

import { motion } from "framer-motion";

const sponsors = [
  { name: "Partner 1", icon: "🐓" },
  { name: "Partner 2", icon: "🌱" },
  { name: "Partner 3", icon: "☀️" },
  { name: "Partner 4", icon: "⭐" },
  { name: "Partner 5", icon: "🍃" },
  { name: "Partner 6", icon: "◆" },
];

export default function Sponsors() {
  return (
    <section className="py-12 md:py-16 border-t border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-4xl md:text-5xl text-gray-400 hover:text-gray-600 transition-colors cursor-default"
              title={sponsor.name}
            >
              {sponsor.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
