"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const menuLinks = [
  { label: "Ana Sayfa", href: "#home" },
  { label: "Menü", href: "#menu" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const brand = settings.footer_brand || "Veluna Coffee";
  const tagline = settings.footer_tagline || "Kahve, yemek ve nargile keyfini bir arada sunan modern mekan.";
  const newsletterTitle = settings.footer_newsletter_title || "Newsletter";
  const copyright = settings.footer_copyright || "© 2025 Veluna Coffee & Lounge. Powered by FK.";
  const privacyUrl = settings.footer_privacy_url || "#";
  const termsUrl = settings.footer_terms_url || "#";

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="#home" className="text-xl font-bold text-white hover:text-primary transition-colors">
              {brand}
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">{tagline}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">Menü</h3>
            <ul className="space-y-1">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block py-2 hover:text-white hover:text-primary transition-colors touch-manipulation">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <h3 className="text-white font-semibold mb-4">{newsletterTitle}</h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 sm:gap-2" noValidate>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                aria-label="Bülten e-posta"
                className="flex-1 min-w-0 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-hover transition-colors shrink-0 min-h-[44px] touch-manipulation"
              >
                Abone Ol
              </button>
            </form>
            <div className="flex gap-3 mt-4 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors touch-manipulation"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-500"
        >
          <span>{copyright}</span>
          <span className="hidden sm:inline">•</span>
          <Link href={privacyUrl} className="hover:text-white transition-colors">Gizlilik Politikası</Link>
          <span className="hidden sm:inline">•</span>
          <Link href={termsUrl} className="hover:text-white transition-colors">Şartlar ve Koşullar</Link>
          <span className="hidden sm:inline">•</span>
          <Link href="/admin/menu" className="hover:text-white transition-colors">Menü Yönetimi</Link>
        </motion.div>
      </div>
    </footer>
  );
}
