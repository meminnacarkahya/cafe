"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Promotion() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const title = settings.promotion_title || "İyi Yemek, Kaliteli Steak & Harika Mekan";
  const f1 = settings.promotion_feature_1 || "Günlük taze malzeme";
  const f2 = settings.promotion_feature_2 || "Ücretsiz teslimat (bölgeye göre)";
  const f3 = settings.promotion_feature_3 || "En iyi kalite ve lezzet";
  const features = [f1, f2, f3];
  const cta = settings.promotion_cta || "Rezervasyon Yap";
  const discountText = settings.promotion_discount_text || "%20 İndirim";
  const img = settings.promotion_image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80";

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            <ul className="mt-6 space-y-3 md:space-y-4">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent-dark shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#reservation"
              className="inline-flex items-center justify-center min-h-[44px] mt-6 md:mt-8 rounded-lg px-6 py-3 font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              {cta}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:col-span-1 order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-square">
              <div className="absolute -top-4 -right-4 md:-right-2 z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent border-4 border-primary flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm md:text-lg">{discountText}</span>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square w-full relative shadow-xl">
                <Image src={img} alt="Patatesli biftek" fill className="object-cover" sizes="(max-width: 640px) 280px, 400px" />
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:block lg:col-span-1" aria-hidden />
        </div>
      </div>
    </section>
  );
}
