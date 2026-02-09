"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type Props = { initialSettings: Record<string, string> };

export default function SSSContent({ initialSettings }: Props) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings || {});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j && typeof j === "object" && !("error" in j)) {
          setSettings(j as Record<string, string>);
        }
      })
      .catch(() => {});
  }, []);

  const pageTitle = settings.sss_page_title || "Sıkça Sorulan Sorular";
  const pageIntro = settings.sss_page_intro || "Merak ettiklerinizin cevaplarını aşağıda bulabilirsiniz. Başka sorularınız için iletişim sayfamızdan bize ulaşabilirsiniz.";
  const faqs = [1, 2, 3, 4, 5, 6]
    .map((i) => ({
      question: (settings[`faq_${i}_question`] || "").trim(),
      answer: (settings[`faq_${i}_answer`] || "").trim(),
    }))
    .filter((faq) => faq.question && faq.answer);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <header className="max-w-3xl mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {pageTitle}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {pageIntro}{" "}
          <Link href="/iletisim" className="text-primary font-semibold hover:underline">İletişim sayfası</Link>ndan bize ulaşabilirsiniz.
        </p>
      </header>

      {faqs.length > 0 ? (
        <ul className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </ul>
      ) : (
        <p className="max-w-3xl text-gray-500">Henüz soru eklenmemiş.</p>
      )}

      <div className="mt-16 pt-12 border-t border-gray-200 text-center max-w-3xl">
        <Link
          href="/iletisim"
          className="inline-flex items-center justify-center min-h-[48px] rounded-xl px-8 py-3 font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
        >
          İletişime Geç
        </Link>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-2xl bg-white border border-gray-200/80 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 shrink-0 text-primary" />
        ) : (
          <ChevronDown className="w-5 h-5 shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4 pt-0">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </li>
  );
}
