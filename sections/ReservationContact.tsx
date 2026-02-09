"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/ui/Button";
import { useEffect, useState } from "react";

export default function ReservationContact() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const title = settings.reservation_title || "Hemen Rezervasyon Yap";
  const desc = settings.reservation_desc ||
    "Sizi bekleyen eşsiz lezzetler ve keyifli anlar için hemen harekete geçin!";
  const address = settings.reservation_address || "Batıkent Andora İş Merkezi, Ankara";
  const phone = settings.reservation_phone || "+90 (312) 000 00 00";
  const email = settings.reservation_email || "info@velunalounge.com.tr";
  const buttonText = settings.reservation_button || "Rezervasyon Yap";
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section
      id="reservation"
      className="py-16 md:py-24 bg-white border-t border-gray-100"
      aria-labelledby="reservation-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 id="reservation-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center md:text-left">
          {title}
        </h2>
        <p className="text-gray-600 mb-12 text-center md:text-left max-w-2xl">{desc}</p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 text-gray-700 hover:text-primary transition-colors group"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-primary group-hover:bg-primary/10 shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-semibold text-gray-900 mb-1">Adres</span>
                {address}
              </span>
            </a>
            <a href={telHref} className="flex items-start gap-4 text-gray-700 hover:text-primary transition-colors group">
              <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-primary group-hover:bg-primary/10 shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-semibold text-gray-900 mb-1">Telefon</span>
                {phone}
              </span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-start gap-4 text-gray-700 hover:text-primary transition-colors group"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-primary group-hover:bg-primary/10 shrink-0">
                <Mail className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-semibold text-gray-900 mb-1">E-posta</span>
                {email}
              </span>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            noValidate
          >
            <input
              type="text"
              placeholder="Ad Soyad"
              aria-label="Ad Soyad"
              className="rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="tel"
              placeholder="Telefon"
              aria-label="Telefon numarası"
              className="rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="number"
              placeholder="Kişi sayısı"
              aria-label="Kişi sayısı"
              min={1}
              max={20}
              className="rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="time"
              aria-label="Saat"
              className="rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="date"
              aria-label="Tarih"
              className="rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary" className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                {buttonText}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
