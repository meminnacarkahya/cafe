"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [images, setImages] = useState<{ url: string; alt?: string }[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {})
    ;
    fetch("/api/images?type=hero")
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j)) {
          setImages(
            j.map((it: unknown) => {
              const o = it as { url: string; alt?: string };
              return { url: o.url, alt: o.alt };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  const prefix = settings.hero_title_prefix || "Mükemmel";
  const line1 = settings.hero_title_line1 || "BİR ATMOSFER";
  const line2 = settings.hero_title_line2 || "DENEYİMİ";
  const subtitle = settings.hero_subtitle ||
    "Veluna Coffee & Lounge, lezzetli yemek-kahve ve keyifli bir atmosfer sunuyor. Arkadaşlarınızla buluşmak için ideal bir mekan.";
  const img1 = settings.hero_image_1 || images[0]?.url || "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80";
  const img2 = settings.hero_image_2 || images[1]?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";
  const img3 = settings.hero_image_3 || images[2]?.url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80";
  const ctaLine = settings.hero_cta_line || "★ Yorumlara Bakın";

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30 pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-12 md:pb-24"
    >
      {/* Decorative shapes */}
      <div
        className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-0"
        aria-hidden
      />
      <div
        className="absolute bottom-20 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-0"
        aria-hidden
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {prefix}{" "}
              <span className="relative inline-block">
                <span className="relative z-10">{line1}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-accent -z-0" />
              </span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10">{line2}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-accent -z-0" />
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg">{subtitle}</p>
            <p className="mt-3 text-primary font-medium">{ctaLine}</p>

         
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] relative shadow-lg">
                <Image
                  src={img1}
                  alt={images[0]?.alt || "Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 0px, 200px"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] relative shadow-lg mt-8">
                <Image
                  src={img2}
                  alt={images[1]?.alt || "Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 0px, 200px"
                />
              </div>
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl hidden xl:block">
              <Image
                src={img3}
                alt={images[2]?.alt || "Image"}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
