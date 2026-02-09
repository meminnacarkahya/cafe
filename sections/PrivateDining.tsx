"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const defaultImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80",
];

export default function PrivateDining() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const title = settings.private_title || "Özel Yemek ve Etkinlikler";
  const desc = settings.private_desc ||
    "Doğum günü, nişan, iş yemeği veya özel davetleriniz için Veluna'nın ayrıcalıklı alanlarını kullanabilirsiniz. Kahve ve lezzet eşliğinde kapalı ve açık mekan seçeneklerimizle, misafirlerinize unutulmaz bir deneyim sunuyoruz. Rezervasyon ve kapasite için bizimle iletişime geçebilirsiniz.";
  const galleryImages = [
    settings.private_image_1 || defaultImages[0],
    settings.private_image_2 || defaultImages[1],
    settings.private_image_3 || defaultImages[2],
    settings.private_image_4 || defaultImages[3],
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 md:gap-4"
          >
            {galleryImages.map((src, i) => (
              <div key={src + i} className="rounded-xl overflow-hidden aspect-square relative shadow-md">
                <Image
                  src={src}
                  alt={`Özel yemek ve etkinlik alanı ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-gray-600 leading-relaxed max-w-xl">{desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
