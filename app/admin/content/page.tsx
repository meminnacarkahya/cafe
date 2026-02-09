"use client";

import { useEffect, useState } from "react";
import { Save, ChevronDown, ChevronUp } from "lucide-react";

const DEFAULT_KEYS: Record<string, string> = {
  hero_title_prefix: "Mükemmel",
  hero_title_line1: "BİR ATMOSFER",
  hero_title_line2: "DENEYİMİ",
  hero_subtitle:
    "Veluna Coffee & Lounge, lezzetli yemek-kahve ve keyifli bir atmosfer sunuyor. Arkadaşlarınızla buluşmak için ideal bir mekan.",
  hero_image_1: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
  hero_image_2: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  hero_image_3: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80",
  hero_cta_line: "★ Yorumlara Bakın",

  about_section_title: "Veluna Coffee",
  about_text:
    "Kahve, yemek ve nargile keyfini bir arada sunan modern mekan. Veluna Coffee & Lounge, sosyal bir ortamda kahve, yemek ve nargile keyfini bir araya getiriyor. Konforlu atmosferiyle dinlendirici bir deneyim sunar. Herkes için uygun seçenekler mevcut.",
  about_reservation_label: "Rezervasyon",
  about_reservation_sub: "Hemen rezervasyon yapın",
  about_phone: "+903120000000",
  about_image_1: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80",
  about_image_2: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80",
  about_image_3: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=150&q=80",
  about_image_4: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&q=80",

  services_title: "Kahve, yemek ve nargile keyfini bir arada sunan modern mekan.",
  services_1_title: "Veluna Kahvaltı Seçenekleri",
  services_1_desc:
    "Farklı kahvaltı çeşitlerimizle damak tadınıza hitap ediyoruz. Siz değerli misafirlerimiz için özel olarak seçilmiş, taze ve kaliteli içeriklerle hazırlanan kahvaltımızı sunuyoruz.",
  services_2_title: "Lezzetli Yemekler",
  services_2_desc:
    "Zengin menümüzle her damak zevkine uygun yemekler sunuyoruz. Taze malzemelerle hazırlanan, özenle seçilmiş yemeklerimizle keyifli bir deneyim yaşatıyoruz.",
  services_3_title: "Sosyal Ortam",
  services_3_desc:
    "Arkadaşlarınızla keyifli vakit geçirebileceğiniz bir mekan. Modern tasarımı ve rahat atmosferiyle, sosyal buluşmalarınız için ideal bir ortam sunuyor.",

  testimonials_title: "Müşteri Yorumları",
  testimonial_1_name: "Zeynep Arslan",
  testimonial_1_title: "Mükemmel Hizmet",
  testimonial_1_text:
    "Veluna Lounge'da aldığım hizmetten çok memnun kaldım. Personel çok güler yüzlü ve yardımseverdi.",
  testimonial_2_name: "Ahmet Yılmaz",
  testimonial_2_title: "Kahve Keyfi",
  testimonial_2_text:
    "Kahve çeşitleri gerçekten çok zengin. Her damak zevkine uygun bir şey bulmak mümkün. Kesinlikle tavsiye ederim!",
  testimonial_3_name: "Ömer GÜL",
  testimonial_3_title: "Nargile Keyfi",
  testimonial_3_text:
    "Batıkent de nargile ye geldim, hizmet ve ortam çok ideal, ilk fırsatta kahvaltı ve yemeğe de geleceğim.",
  testimonial_4_name: "Elif Demir",
  testimonial_4_title: "Harika bir deneyim!",
  testimonial_4_text:
    "Veluna Cafe'de geçirdiğim zaman harikaydı. Kahveleri mükemmel, ortamı ise çok rahat. Kesinlikle tekrar geleceğim!",
  testimonial_5_name: "Mehmet Can",
  testimonial_5_title: "Sosyal bir mekan!",
  testimonial_5_text:
    "Arkadaşlarımla birlikte Veluna Coffee'de harika bir akşam geçirdik. Nargile ve yemekler çok lezzetliydi.",
  testimonial_6_name: "Vedat ÇOBAN",
  testimonial_6_title: "Mutlaka Tavsiye Ederim",
  testimonial_6_text:
    "Batıkent Andora İş Merkezinde Veluna Cafe Lounge'da oğlumla kahvaltı yaptık ve çok memnun kaldık. Mekan sahibi Osman Bey ve ekip, güler yüz ve hızlı servis için teşekkürler.",

  feature_title: "Huzur Dolu Bir Kahve Deneyimi Yaşayın",
  feature_desc:
    "Veluna Coffee & Lounge'da, kahve, yemek ve nargile keyfini bir arada bulacaksınız. Sizi bekleyen lezzetler ve rahat bir atmosferle tanışın!",
  feature_cta: "Hemen Rezervasyon Yap",
  feature_image_1: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80",
  feature_image_2: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80",
  feature_image_3: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&q=80",

  footer_brand: "Veluna Coffee",
  footer_tagline: "Kahve, yemek ve nargile keyfini bir arada sunan modern mekan.",
  footer_newsletter_title: "Newsletter",
  footer_copyright: "© 2025 Veluna Coffee & Lounge. Powered by FK.",
  footer_privacy_url: "#",
  footer_terms_url: "#",

  deal_badge: "Haftanın Fırsatı",
  deal_title: "Tavuklu Soğanlı Burger",
  deal_desc: "Karamelize soğan, taze marul ve özel sosumuzla hazırlanan sulu tavuk köftesi. Sınırlı süre fırsatı.",
  deal_price: "299 ₺",
  deal_old_price: "349 ₺",
  deal_cta: "Menüden Sipariş Ver",
  deal_timer_days: "10",
  deal_timer_hrs: "23",
  deal_timer_mins: "45",
  deal_badge_1: "Ücretsiz Teslimat",
  deal_badge_2: "Sağlıklı Lezzet",
  deal_badge_3: "Taze Malzemeler",
  deal_image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",

  promotion_title: "İyi Yemek, Kaliteli Steak & Harika Mekan",
  promotion_feature_1: "Günlük taze malzeme",
  promotion_feature_2: "Ücretsiz teslimat (bölgeye göre)",
  promotion_feature_3: "En iyi kalite ve lezzet",
  promotion_cta: "Rezervasyon Yap",
  promotion_discount_text: "%20 İndirim",
  promotion_image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80",

  blog_title: "Son",
  blog_highlight: "Haberler",
  blog_1_title: "Hayalindeki Akşam Menüleri",
  blog_1_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
  blog_1_author: "Veluna",
  blog_1_date: "22 Ara 2024",
  blog_2_title: "7/24 Hizmet Anlayışı",
  blog_2_image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
  blog_2_author: "Veluna",
  blog_2_date: "20 Ara 2024",
  blog_3_title: "Her Gün Taze Malzemeler",
  blog_3_image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80",
  blog_3_author: "Veluna",
  blog_3_date: "18 Ara 2024",
  blog_1_content: "",
  blog_2_content: "",
  blog_3_content: "",

  reservation_title: "Hemen Rezervasyon Yap",
  reservation_desc: "Sizi bekleyen eşsiz lezzetler ve keyifli anlar için hemen harekete geçin!",
  reservation_address: "Batıkent Andora İş Merkezi, Ankara",
  reservation_phone: "+90 (312) 000 00 00",
  reservation_email: "info@velunalounge.com.tr",
  reservation_button: "Rezervasyon Yap",

  private_title: "Özel Yemek ve Etkinlikler",
  private_desc:
    "Doğum günü, nişan, iş yemeği veya özel davetleriniz için Veluna'nın ayrıcalıklı alanlarını kullanabilirsiniz. Kahve ve lezzet eşliğinde kapalı ve açık mekan seçeneklerimizle, misafirlerinize unutulmaz bir deneyim sunuyoruz. Rezervasyon ve kapasite için bizimle iletişime geçebilirsiniz.",
  private_image_1: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
  private_image_2: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
  private_image_3: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
  private_image_4: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80",

  contact_page_title: "Bize Ulaşın",
  contact_page_intro:
    "Sorularınız için bizimle iletişime geçmekten çekinmeyin. Her türlü soru ve öneriniz için buradayız. Müşteri memnuniyetine önem veriyoruz.",
  contact_working_hours: "Her gün 09:00 – 02:00",

  sss_page_title: "Sıkça Sorulan Sorular",
  sss_page_intro:
    "Merak ettiklerinizin cevaplarını aşağıda bulabilirsiniz. Başka sorularınız için iletişim sayfamızdan bize ulaşabilirsiniz.",

  faq_1_question: "İletişim bilgilerinizi nereden bulabilirim?",
  faq_1_answer:
    "İletişim bilgilerine web sitemizin alt kısmındaki 'İletişim' bölümünden ulaşabilirsiniz. Ayrıca sosyal medya hesaplarımızdan da bize ulaşabilirsiniz.",
  faq_2_question: "Rezervasyon için nasıl iletişime geçebilirim?",
  faq_2_answer:
    "Müşteri hizmetlerimizle iletişime geçmek için 05019421314 nolu telefon numaramızı arayabilir veya info@velunalounge.com.tr e-posta adresimize yazabilirsiniz. Size en kısa sürede geri dönüş yapacağız.",
  faq_3_question: "Restoranınızın çalışma saatleri nedir?",
  faq_3_answer:
    "Restoranımız her gün 09:00 – 02:00 saatleri arasında açıktır. Özel günlerde çalışma saatlerimiz değişiklik gösterebilir.",
  faq_4_question: "Rezervasyon yapmam gerekiyor mu?",
  faq_4_answer:
    "Rezervasyon yapmanız önerilir, özellikle yoğun saatlerde. Rezervasyon için telefon veya web sitemiz üzerinden form doldurarak bize ulaşabilirsiniz.",
  faq_5_question: "",
  faq_5_answer: "",
  faq_6_question: "",
  faq_6_answer: "",

  navbar_logo: "Veluna",
  navbar_cta: "Rezervasyon",
};

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  rows,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          id={id}
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50"
      >
        {title}
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {open && <div className="px-6 pb-6 pt-0 border-t border-gray-100">{children}</div>}
    </div>
  );
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then(async (r) => {
        if (!r.ok) {
          const j = await r.json().catch(() => null);
          throw new Error((j && j.error) || "Ayarlar yüklenemedi");
        }
        const j = await r.json();
        setValues({ ...DEFAULT_KEYS, ...(j || {}) });
        setMessage(null);
      })
      .catch((err) => {
        const errorMsg = err instanceof Error ? err.message : "Ayarlar yüklenemedi";
        setMessage({ 
          type: "err", 
          text: errorMsg.includes("fetch") || errorMsg.includes("network") 
            ? "Bağlantı hatası. Lütfen sayfayı yenileyin veya sunucunun çalıştığından emin olun." 
            : `Hata: ${errorMsg}` 
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const v = (key: string) => values[key] ?? DEFAULT_KEYS[key] ?? "";
  const set = (key: string, val: string) => setValues((s) => ({ ...s, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: values }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Kaydedilemedi");
      setMessage({ type: "ok", text: "Tüm içerik kaydedildi. Siteyi yenileyerek görebilirsiniz." });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Kaydedilemedi";
      setMessage({ 
        type: "err", 
        text: errorMsg.includes("fetch") || errorMsg.includes("network") 
          ? "Bağlantı hatası. Lütfen sayfayı yenileyin veya sunucunun çalıştığından emin olun." 
          : `Hata: ${errorMsg}` 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Metin & Görseller</h1>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${message.type === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <Section title="Hero (Üst banner)" defaultOpen>
        <Field label="Başlık öncesi metin" id="hero_title_prefix" value={v("hero_title_prefix")} onChange={(x) => set("hero_title_prefix", x)} placeholder="Örn: Mükemmel" />
        <Field label="Başlık satır 1 (vurgulu)" id="hero_title_line1" value={v("hero_title_line1")} onChange={(x) => set("hero_title_line1", x)} placeholder="Örn: BİR ATMOSFER" />
        <Field label="Başlık satır 2 (vurgulu)" id="hero_title_line2" value={v("hero_title_line2")} onChange={(x) => set("hero_title_line2", x)} placeholder="Örn: DENEYİMİ" />
        <Field label="Alt metin" id="hero_subtitle" value={v("hero_subtitle")} onChange={(x) => set("hero_subtitle", x)} rows={3} />
        <Field label="Başlık altı kısa metin" id="hero_cta_line" value={v("hero_cta_line")} onChange={(x) => set("hero_cta_line", x)} placeholder="Örn: ★ Yorumlara Bakın" />
        <Field label="Görsel 1 URL" id="hero_image_1" value={v("hero_image_1")} onChange={(x) => set("hero_image_1", x)} placeholder="https://..." />
        <Field label="Görsel 2 URL" id="hero_image_2" value={v("hero_image_2")} onChange={(x) => set("hero_image_2", x)} />
        <Field label="Görsel 3 URL (küçük daire)" id="hero_image_3" value={v("hero_image_3")} onChange={(x) => set("hero_image_3", x)} />
      </Section>

      <Section title="Hakkımızda">
        <Field label="Bölüm başlığı" id="about_section_title" value={v("about_section_title")} onChange={(x) => set("about_section_title", x)} />
        <Field label="Açıklama metni" id="about_text" value={v("about_text")} onChange={(x) => set("about_text", x)} rows={5} />
        <Field label="Rezervasyon buton üst satır" id="about_reservation_label" value={v("about_reservation_label")} onChange={(x) => set("about_reservation_label", x)} />
        <Field label="Rezervasyon buton alt satır" id="about_reservation_sub" value={v("about_reservation_sub")} onChange={(x) => set("about_reservation_sub", x)} />
        <Field label="Telefon (tel: linki)" id="about_phone" value={v("about_phone")} onChange={(x) => set("about_phone", x)} placeholder="+903120000000" />
        <Field label="Ana görsel URL" id="about_image_1" value={v("about_image_1")} onChange={(x) => set("about_image_1", x)} />
        <Field label="Küçük görsel 1" id="about_image_2" value={v("about_image_2")} onChange={(x) => set("about_image_2", x)} />
        <Field label="Küçük görsel 2" id="about_image_3" value={v("about_image_3")} onChange={(x) => set("about_image_3", x)} />
        <Field label="Küçük görsel 3" id="about_image_4" value={v("about_image_4")} onChange={(x) => set("about_image_4", x)} />
      </Section>

      <Section title="Hizmetler (3 kart)">
        <Field label="Bölüm başlığı" id="services_title" value={v("services_title")} onChange={(x) => set("services_title", x)} rows={2} />
        <Field label="Kart 1 başlık" id="services_1_title" value={v("services_1_title")} onChange={(x) => set("services_1_title", x)} />
        <Field label="Kart 1 açıklama" id="services_1_desc" value={v("services_1_desc")} onChange={(x) => set("services_1_desc", x)} rows={2} />
        <Field label="Kart 2 başlık" id="services_2_title" value={v("services_2_title")} onChange={(x) => set("services_2_title", x)} />
        <Field label="Kart 2 açıklama" id="services_2_desc" value={v("services_2_desc")} onChange={(x) => set("services_2_desc", x)} rows={2} />
        <Field label="Kart 3 başlık" id="services_3_title" value={v("services_3_title")} onChange={(x) => set("services_3_title", x)} />
        <Field label="Kart 3 açıklama" id="services_3_desc" value={v("services_3_desc")} onChange={(x) => set("services_3_desc", x)} rows={2} />
      </Section>

      <Section title="Müşteri Yorumları (6 yorum)">
        <Field label="Bölüm başlığı" id="testimonials_title" value={v("testimonials_title")} onChange={(x) => set("testimonials_title", x)} />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Yorum {i}</p>
            <Field label="İsim" id={`t${i}_name`} value={v(`testimonial_${i}_name`)} onChange={(x) => set(`testimonial_${i}_name`, x)} />
            <Field label="Başlık" id={`t${i}_title`} value={v(`testimonial_${i}_title`)} onChange={(x) => set(`testimonial_${i}_title`, x)} />
            <Field label="Yorum metni" id={`t${i}_text`} value={v(`testimonial_${i}_text`)} onChange={(x) => set(`testimonial_${i}_text`, x)} rows={3} />
          </div>
        ))}
      </Section>

      <Section title="Kırmızı banner (Huzur dolu...)">
        <Field label="Başlık" id="feature_title" value={v("feature_title")} onChange={(x) => set("feature_title", x)} />
        <Field label="Açıklama" id="feature_desc" value={v("feature_desc")} onChange={(x) => set("feature_desc", x)} rows={3} />
        <Field label="Buton metni" id="feature_cta" value={v("feature_cta")} onChange={(x) => set("feature_cta", x)} />
        <Field label="Görsel 1 URL" id="feature_image_1" value={v("feature_image_1")} onChange={(x) => set("feature_image_1", x)} />
        <Field label="Görsel 2 URL" id="feature_image_2" value={v("feature_image_2")} onChange={(x) => set("feature_image_2", x)} />
        <Field label="Görsel 3 URL" id="feature_image_3" value={v("feature_image_3")} onChange={(x) => set("feature_image_3", x)} />
      </Section>

      <Section title="Footer">
        <Field label="Marka adı" id="footer_brand" value={v("footer_brand")} onChange={(x) => set("footer_brand", x)} />
        <Field label="Kısa açıklama" id="footer_tagline" value={v("footer_tagline")} onChange={(x) => set("footer_tagline", x)} rows={2} />
        <Field label="Newsletter başlığı" id="footer_newsletter_title" value={v("footer_newsletter_title")} onChange={(x) => set("footer_newsletter_title", x)} />
        <Field label="Telif metni" id="footer_copyright" value={v("footer_copyright")} onChange={(x) => set("footer_copyright", x)} />
        <Field label="Gizlilik URL" id="footer_privacy_url" value={v("footer_privacy_url")} onChange={(x) => set("footer_privacy_url", x)} />
        <Field label="Şartlar URL" id="footer_terms_url" value={v("footer_terms_url")} onChange={(x) => set("footer_terms_url", x)} />
      </Section>

      <Section title="Haftanın Fırsatı">
        <Field label="Rozet metni" id="deal_badge" value={v("deal_badge")} onChange={(x) => set("deal_badge", x)} />
        <Field label="Başlık" id="deal_title" value={v("deal_title")} onChange={(x) => set("deal_title", x)} />
        <Field label="Açıklama" id="deal_desc" value={v("deal_desc")} onChange={(x) => set("deal_desc", x)} rows={2} />
        <Field label="Fiyat" id="deal_price" value={v("deal_price")} onChange={(x) => set("deal_price", x)} />
        <Field label="Eski fiyat (üstü çizili)" id="deal_old_price" value={v("deal_old_price")} onChange={(x) => set("deal_old_price", x)} />
        <Field label="Buton metni" id="deal_cta" value={v("deal_cta")} onChange={(x) => set("deal_cta", x)} />
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Field label="Geri sayım Gün" id="deal_timer_days" value={v("deal_timer_days")} onChange={(x) => set("deal_timer_days", x)} />
          <Field label="Saat" id="deal_timer_hrs" value={v("deal_timer_hrs")} onChange={(x) => set("deal_timer_hrs", x)} />
          <Field label="Dakika" id="deal_timer_mins" value={v("deal_timer_mins")} onChange={(x) => set("deal_timer_mins", x)} />
        </div>
        <Field label="Rozet 1" id="deal_badge_1" value={v("deal_badge_1")} onChange={(x) => set("deal_badge_1", x)} />
        <Field label="Rozet 2" id="deal_badge_2" value={v("deal_badge_2")} onChange={(x) => set("deal_badge_2", x)} />
        <Field label="Rozet 3" id="deal_badge_3" value={v("deal_badge_3")} onChange={(x) => set("deal_badge_3", x)} />
        <Field label="Ürün görseli URL" id="deal_image" value={v("deal_image")} onChange={(x) => set("deal_image", x)} />
      </Section>

      <Section title="Promosyon (Steak alanı)">
        <Field label="Başlık" id="promotion_title" value={v("promotion_title")} onChange={(x) => set("promotion_title", x)} />
        <Field label="Özellik 1" id="promotion_feature_1" value={v("promotion_feature_1")} onChange={(x) => set("promotion_feature_1", x)} />
        <Field label="Özellik 2" id="promotion_feature_2" value={v("promotion_feature_2")} onChange={(x) => set("promotion_feature_2", x)} />
        <Field label="Özellik 3" id="promotion_feature_3" value={v("promotion_feature_3")} onChange={(x) => set("promotion_feature_3", x)} />
        <Field label="Buton metni" id="promotion_cta" value={v("promotion_cta")} onChange={(x) => set("promotion_cta", x)} />
        <Field label="İndirim etiketi" id="promotion_discount_text" value={v("promotion_discount_text")} onChange={(x) => set("promotion_discount_text", x)} />
        <Field label="Görsel URL" id="promotion_image" value={v("promotion_image")} onChange={(x) => set("promotion_image", x)} />
      </Section>

      <Section title="Blog (Son Haberler)">
        <Field label="Başlık (vurgusuz)" id="blog_title" value={v("blog_title")} onChange={(x) => set("blog_title", x)} />
        <Field label="Başlık vurgulu kısım" id="blog_highlight" value={v("blog_highlight")} onChange={(x) => set("blog_highlight", x)} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Yazı {i}</p>
            <Field label="Başlık" id={`blog_${i}_title`} value={v(`blog_${i}_title`)} onChange={(x) => set(`blog_${i}_title`, x)} />
            <Field label="Görsel URL" id={`blog_${i}_image`} value={v(`blog_${i}_image`)} onChange={(x) => set(`blog_${i}_image`, x)} />
            <Field label="Yazar" id={`blog_${i}_author`} value={v(`blog_${i}_author`)} onChange={(x) => set(`blog_${i}_author`, x)} />
            <Field label="Tarih" id={`blog_${i}_date`} value={v(`blog_${i}_date`)} onChange={(x) => set(`blog_${i}_date`, x)} />
            <Field label="İçerik (detay sayfasında gösterilir)" id={`blog_${i}_content`} value={v(`blog_${i}_content`)} onChange={(x) => set(`blog_${i}_content`, x)} rows={4} placeholder="Opsiyonel" />
          </div>
        ))}
      </Section>

      <Section title="İletişim sayfası & SSS">
        <Field label="İletişim sayfası başlığı" id="contact_page_title" value={v("contact_page_title")} onChange={(x) => set("contact_page_title", x)} />
        <Field label="İletişim sayfası giriş metni" id="contact_page_intro" value={v("contact_page_intro")} onChange={(x) => set("contact_page_intro", x)} rows={3} />
        <Field label="Çalışma saatleri" id="contact_working_hours" value={v("contact_working_hours")} onChange={(x) => set("contact_working_hours", x)} placeholder="Örn: Her gün 09:00 – 02:00" />
        <p className="text-sm font-semibold text-gray-700 mt-8 mb-2">Sıkça Sorulan Sorular sayfası</p>
        <Field label="SSS sayfa başlığı" id="sss_page_title" value={v("sss_page_title")} onChange={(x) => set("sss_page_title", x)} />
        <Field label="SSS sayfa giriş metni" id="sss_page_intro" value={v("sss_page_intro")} onChange={(x) => set("sss_page_intro", x)} rows={2} />
        <p className="text-sm font-medium text-gray-600 mt-6 mb-2">Soru-cevaplar (en fazla 6, panelden düzenlenir)</p>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-2">Soru {i}</p>
            <Field label="Soru" id={`faq_${i}_question`} value={v(`faq_${i}_question`)} onChange={(x) => set(`faq_${i}_question`, x)} placeholder="Boş bırakırsanız gösterilmez" />
            <Field label="Cevap" id={`faq_${i}_answer`} value={v(`faq_${i}_answer`)} onChange={(x) => set(`faq_${i}_answer`, x)} rows={3} />
          </div>
        ))}
      </Section>

      <Section title="Rezervasyon & İletişim">
        <Field label="Başlık" id="reservation_title" value={v("reservation_title")} onChange={(x) => set("reservation_title", x)} />
        <Field label="Açıklama" id="reservation_desc" value={v("reservation_desc")} onChange={(x) => set("reservation_desc", x)} rows={2} />
        <Field label="Adres" id="reservation_address" value={v("reservation_address")} onChange={(x) => set("reservation_address", x)} />
        <Field label="Telefon" id="reservation_phone" value={v("reservation_phone")} onChange={(x) => set("reservation_phone", x)} />
        <Field label="E-posta" id="reservation_email" value={v("reservation_email")} onChange={(x) => set("reservation_email", x)} />
        <Field label="Form buton metni" id="reservation_button" value={v("reservation_button")} onChange={(x) => set("reservation_button", x)} />
      </Section>

      <Section title="Özel Yemek ve Etkinlikler">
        <Field label="Başlık" id="private_title" value={v("private_title")} onChange={(x) => set("private_title", x)} />
        <Field label="Açıklama" id="private_desc" value={v("private_desc")} onChange={(x) => set("private_desc", x)} rows={4} />
        <Field label="Görsel 1" id="private_image_1" value={v("private_image_1")} onChange={(x) => set("private_image_1", x)} />
        <Field label="Görsel 2" id="private_image_2" value={v("private_image_2")} onChange={(x) => set("private_image_2", x)} />
        <Field label="Görsel 3" id="private_image_3" value={v("private_image_3")} onChange={(x) => set("private_image_3", x)} />
        <Field label="Görsel 4" id="private_image_4" value={v("private_image_4")} onChange={(x) => set("private_image_4", x)} />
      </Section>

      <Section title="Navbar">
        <Field label="Logo metni" id="navbar_logo" value={v("navbar_logo")} onChange={(x) => set("navbar_logo", x)} />
        <Field label="Sağ üst buton metni" id="navbar_cta" value={v("navbar_cta")} onChange={(x) => set("navbar_cta", x)} />
      </Section>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Tümünü Kaydet
        </button>
        <button type="button" onClick={() => window.open("/", "_blank")} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          Siteyi aç
        </button>
      </div>
    </div>
  );
}
