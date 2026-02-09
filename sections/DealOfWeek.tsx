"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck, Leaf, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const badgeIcons = [Truck, Leaf, Sparkles];

export default function DealOfWeek() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const badge = settings.deal_badge || "Haftanın Fırsatı";
  const title = settings.deal_title || "Tavuklu Soğanlı Burger";
  const desc = settings.deal_desc ||
    "Karamelize soğan, taze marul ve özel sosumuzla hazırlanan sulu tavuk köftesi. Sınırlı süre fırsatı.";
  const price = settings.deal_price || "299 ₺";
  const oldPrice = settings.deal_old_price || "349 ₺";
  const cta = settings.deal_cta || "Menüden Sipariş Ver";
  const days = settings.deal_timer_days || "10";
  const hrs = settings.deal_timer_hrs || "23";
  const mins = settings.deal_timer_mins || "45";
  const badge1 = settings.deal_badge_1 || "Ücretsiz Teslimat";
  const badge2 = settings.deal_badge_2 || "Sağlıklı Lezzet";
  const badge3 = settings.deal_badge_3 || "Taze Malzemeler";
  const badges = [
    { icon: Truck, label: badge1 },
    { icon: Leaf, label: badge2 },
    { icon: Sparkles, label: badge3 },
  ];
  const img = settings.deal_image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80";

  return (
    <section id="shop" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{badge}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 mb-6 max-w-md text-sm md:text-base">{desc}</p>

            <div className="inline-flex gap-2 p-3 bg-gray-200/80 rounded-lg font-mono text-sm md:text-base mb-6">
              <span className="font-bold text-gray-900">{days}</span>
              <span className="text-gray-600">GÜN</span>
              <span className="text-gray-400">:</span>
              <span className="font-bold text-gray-900">{hrs}</span>
              <span className="text-gray-600">SA</span>
              <span className="text-gray-400">:</span>
              <span className="font-bold text-gray-900">{mins}</span>
              <span className="text-gray-600">DK</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-bold text-primary">{price}</span>
              <span className="text-lg text-gray-400 line-through">{oldPrice}</span>
            </div>

            <Link
              href="#menu"
              className="inline-flex items-center justify-center min-h-[44px] rounded-lg px-6 py-3 font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              {cta}
            </Link>

            <div className="flex flex-wrap gap-4 mt-8">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-700">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/20 shrink-0">
                    <Icon className="w-4 h-4 text-accent-dark" />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[min(288px,85vw)] md:max-w-[384px] aspect-square">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xl">
                <Image src={img} alt={title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 384px" />
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2">
                {badges.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-accent/90 text-gray-900 px-2 py-1.5 md:px-3 md:py-2 rounded-lg shadow-md text-xs font-medium whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
