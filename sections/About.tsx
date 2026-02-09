"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "@/ui/SectionTitle";
import { useEffect, useState } from "react";

export default function About() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const aboutText = settings.about_text ||
    "Kahve, yemek ve nargile keyfini bir arada sunan modern mekan. Veluna Coffee & Lounge, sosyal bir ortamda kahve, yemek ve nargile keyfini bir araya getiriyor. Konforlu atmosferiyle dinlendirici bir deneyim sunar. Herkes için uygun seçenekler mevcut.";
  const sectionTitle = settings.about_section_title || "Veluna Coffee";
  const reservationLabel = settings.about_reservation_label || "Rezervasyon";
  const reservationSub = settings.about_reservation_sub || "Hemen rezervasyon yapın";
  const phone = settings.about_phone || "+903120000000";
  const aboutImg1 = settings.about_image_1 || "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80";
  const aboutImg2 = settings.about_image_2 || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80";
  const aboutImg3 = settings.about_image_3 || "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=150&q=80";
  const aboutImg4 = settings.about_image_4 || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&q=80";

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={sectionTitle}
          highlight=""
          className="mb-12 md:mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] max-w-md relative shadow-lg">
              <Image
                src={aboutImg1}
                alt="Chef preparing food"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
            <div className="flex gap-4 mt-6 -ml-4 flex-wrap">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                <Image src={aboutImg2} alt="Chef" fill className="object-cover" sizes="96px" />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                <Image src={aboutImg3} alt="Dish" fill className="object-cover" sizes="96px" />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                <Image src={aboutImg4} alt="Restaurant" fill className="object-cover" sizes="96px" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">{aboutText}</p>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-3 mt-8 text-primary font-semibold hover:text-primary-hover transition-colors group"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-gray-900 font-bold text-lg">{reservationLabel}</span>
                <span className="text-sm text-gray-600">{reservationSub}</span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
