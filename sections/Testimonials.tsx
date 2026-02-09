"use client";

import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "@/ui/Card";

const defaultReviews = [
  { name: "Zeynep Arslan", title: "Mükemmel Hizmet", text: "Veluna Lounge'da aldığım hizmetten çok memnun kaldım. Personel çok güler yüzlü ve yardımseverdi." },
  { name: "Ahmet Yılmaz", title: "Kahve Keyfi", text: "Kahve çeşitleri gerçekten çok zengin. Her damak zevkine uygun bir şey bulmak mümkün. Kesinlikle tavsiye ederim!" },
  { name: "Ömer GÜL", title: "Nargile Keyfi", text: "Batıkent de nargile ye geldim, hizmet ve ortam çok ideal, ilk fırsatta kahvaltı ve yemeğe de geleceğim." },
  { name: "Elif Demir", title: "Harika bir deneyim!", text: "Veluna Cafe'de geçirdiğim zaman harikaydı. Kahveleri mükemmel, ortamı ise çok rahat. Kesinlikle tekrar geleceğim!" },
  { name: "Mehmet Can", title: "Sosyal bir mekan!", text: "Arkadaşlarımla birlikte Veluna Coffee'de harika bir akşam geçirdik. Nargile ve yemekler çok lezzetliydi." },
  { name: "Vedat ÇOBAN", title: "Mutlaka Tavsiye Ederim", text: "Batıkent Andora İş Merkezinde Veluna Cafe Lounge'da oğlumla kahvaltı yaptık ve çok memnun kaldık." },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="5 yıldız">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const reviews = [1, 2, 3, 4, 5, 6].map((i) => ({
    name: settings[`testimonial_${i}_name`] || defaultReviews[i - 1].name,
    title: settings[`testimonial_${i}_title`] || defaultReviews[i - 1].title,
    text: settings[`testimonial_${i}_text`] || defaultReviews[i - 1].text,
  }));

  const sectionTitle = settings.testimonials_title || "Müşteri Yorumları";

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [reviews]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-carousel-card]")?.getBoundingClientRect().width ?? 0;
    const gap = 24;
    el.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{sectionTitle}</h2>
          <div className="flex items-center justify-center gap-2 text-accent mt-3">
            <StarRating />
          </div>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors touch-manipulation"
              aria-label="Önceki yorumlar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors touch-manipulation"
              aria-label="Sonraki yorumlar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-2 -mx-1 scrollbar-hide"
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                data-carousel-card
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <Card className="p-6 md:p-8 h-full flex flex-col min-h-[220px]">
                  <StarRating />
                  <h3 className="text-lg font-bold text-gray-900 mt-4 mb-1">{review.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1 mt-2">{review.text}</p>
                  <p className="text-gray-700 font-semibold mt-4">{review.name}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
