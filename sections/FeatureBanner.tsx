"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FeatureBanner() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const title = settings.feature_title || "Huzur Dolu Bir Kahve Deneyimi Yaşayın";
  const desc = settings.feature_desc ||
    "Veluna Coffee & Lounge'da, kahve, yemek ve nargile keyfini bir arada bulacaksınız. Sizi bekleyen lezzetler ve rahat bir atmosferle tanışın!";
  const cta = settings.feature_cta || "Hemen Rezervasyon Yap";
  const img1 = settings.feature_image_1 || "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80";
  const img2 = settings.feature_image_2 || "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80";
  const img3 = settings.feature_image_3 || "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&q=80";

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{title}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl">{desc}</p>
            <a
              href="#reservation"
              className="inline-flex items-center justify-center min-h-[44px] rounded-lg px-6 py-3 font-semibold bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary transition-colors touch-manipulation"
            >
              {cta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end gap-2 sm:gap-4"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 relative shadow-xl shrink-0">
              <Image src={img1} alt="Çorba" fill className="object-cover" sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px" />
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 relative shadow-xl self-end shrink-0">
              <Image src={img2} alt="Pasta" fill className="object-cover" sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px" />
            </div>
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/30 relative shadow-xl self-center -ml-2 sm:-ml-4 shrink-0">
              <Image src={img3} alt="Tatlı" fill className="object-cover" sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
