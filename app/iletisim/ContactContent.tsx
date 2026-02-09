"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

type Props = { initialSettings: Record<string, string> };

export default function ContactContent({ initialSettings }: Props) {
  const settings = initialSettings || {};
  const title = settings.contact_page_title || "Bize Ulaşın";
  const intro = settings.contact_page_intro ||
    "Sorularınız için bizimle iletişime geçmekten çekinmeyin. Her türlü soru ve öneriniz için buradayız.";
  const address = settings.reservation_address || "Batıkent Andora İş Merkezi, Ankara";
  const phone = settings.reservation_phone || "+90 (312) 000 00 00";
  const email = settings.reservation_email || "info@velunalounge.com.tr";
  const workingHours = settings.contact_working_hours || "Her gün 09:00 – 02:00";
  const telHref = `tel:${(phone || "").replace(/\s/g, "")}`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <header className="max-w-3xl mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">{intro}</p>
      </header>

      <section className="mb-16 md:mb-20" aria-labelledby="contact-info-heading">
        <h2 id="contact-info-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          İletişim Bilgileri
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Veluna+Coffee+Ankara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <MapPin className="w-6 h-6" />
            </span>
            <div>
              <span className="block font-semibold text-gray-900 mb-1">Adres</span>
              <span className="text-gray-600">{address}</span>
            </div>
          </a>
          <a
            href={telHref}
            className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <Phone className="w-6 h-6" />
            </span>
            <div>
              <span className="block font-semibold text-gray-900 mb-1">Rezervasyon</span>
              <span className="text-gray-600">{phone}</span>
            </div>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <Mail className="w-6 h-6" />
            </span>
            <div>
              <span className="block font-semibold text-gray-900 mb-1">E-posta</span>
              <span className="text-gray-600 break-all">{email}</span>
            </div>
          </a>
        </div>
        <div className="mt-6 flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-200/80">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
            <Clock className="w-6 h-6" />
          </span>
          <div>
            <span className="block font-semibold text-gray-900 mb-1">Çalışma saatleri</span>
            <span className="text-gray-600">{workingHours}</span>
          </div>
        </div>
      </section>

      <section className="mb-16 md:mb-20" aria-labelledby="map-heading">
        <h2 id="map-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Haritada Bul
        </h2>
        <div className="rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm">
          <iframe
            title="Veluna Coffee Ankara konumu"
            src="https://www.google.com/maps?q=Veluna+Coffee+Ankara&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full block"
          />
          <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-gray-600 text-sm">{address}</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Veluna+Coffee+Ankara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
            >
              <MapPin className="w-4 h-4" />
              Google Maps&apos;te aç
            </a>
          </div>
        </div>
      </section>

      <div className="mt-16 pt-12 border-t border-gray-200 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/#reservation"
          className="inline-flex items-center justify-center min-h-[48px] rounded-xl px-8 py-3 font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
        >
          Rezervasyon Yap
        </Link>
        <Link
          href="/sikca-sorulan-sorular"
          className="inline-flex items-center justify-center min-h-[48px] rounded-xl px-8 py-3 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Sıkça Sorulan Sorular
        </Link>
      </div>
    </div>
  );
}
