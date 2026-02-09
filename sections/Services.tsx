"use client";

import { Coffee, UtensilsCrossed, Users } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/ui/Card";
import { useEffect, useState } from "react";

const icons = [Coffee, UtensilsCrossed, Users];

const defaultServices = [
  {
    title: "Veluna Kahvaltı Seçenekleri",
    description:
      "Farklı kahvaltı çeşitlerimizle damak tadınıza hitap ediyoruz. Siz değerli misafirlerimiz için özel olarak seçilmiş, taze ve kaliteli içeriklerle hazırlanan kahvaltımızı sunuyoruz.",
  },
  {
    title: "Lezzetli Yemekler",
    description:
      "Zengin menümüzle her damak zevkine uygun yemekler sunuyoruz. Taze malzemelerle hazırlanan, özenle seçilmiş yemeklerimizle keyifli bir deneyim yaşatıyoruz.",
  },
  {
    title: "Sosyal Ortam",
    description:
      "Arkadaşlarınızla keyifli vakit geçirebileceğiniz bir mekan. Modern tasarımı ve rahat atmosferiyle, sosyal buluşmalarınız için ideal bir ortam sunuyor.",
  },
];

export default function Services() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const sectionTitle = settings.services_title || "Kahve, yemek ve nargile keyfini bir arada sunan modern mekan.";
  const services = [
    {
      title: settings.services_1_title || defaultServices[0].title,
      description: settings.services_1_desc || defaultServices[0].description,
    },
    {
      title: settings.services_2_title || defaultServices[1].title,
      description: settings.services_2_desc || defaultServices[1].description,
    },
    {
      title: settings.services_3_title || defaultServices[2].title,
      description: settings.services_3_desc || defaultServices[2].description,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-16">
          {sectionTitle}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 md:p-8 h-full text-center">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 text-accent-dark mb-4">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </Card>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
