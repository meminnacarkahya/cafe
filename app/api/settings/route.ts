import { NextResponse } from "next/server";
import { getSettingsFromDb, setSettingsToDb } from "@/lib/db";

const SSS_DEFAULTS: Record<string, string> = {
  sss_page_title: "Sıkça Sorulan Sorular",
  sss_page_intro: "Merak ettiklerinizin cevaplarını aşağıda bulabilirsiniz. Başka sorularınız için iletişim sayfamızdan bize ulaşabilirsiniz.",
  faq_1_question: "İletişim bilgilerinizi nereden bulabilirim?",
  faq_1_answer: "İletişim bilgilerine web sitemizin alt kısmındaki 'İletişim' bölümünden ulaşabilirsiniz. Ayrıca sosyal medya hesaplarımızdan da bize ulaşabilirsiniz.",
  faq_2_question: "Rezervasyon için nasıl iletişime geçebilirim?",
  faq_2_answer: "Müşteri hizmetlerimizle iletişime geçmek için 05019421314 nolu telefon numaramızı arayabilir veya info@velunalounge.com.tr e-posta adresimize yazabilirsiniz. Size en kısa sürede geri dönüş yapacağız.",
  faq_3_question: "Restoranınızın çalışma saatleri nedir?",
  faq_3_answer: "Restoranımız her gün 09:00 – 02:00 saatleri arasında açıktır. Özel günlerde çalışma saatlerimiz değişiklik gösterebilir.",
  faq_4_question: "Rezervasyon yapmam gerekiyor mu?",
  faq_4_answer: "Rezervasyon yapmanız önerilir, özellikle yoğun saatlerde. Rezervasyon için telefon veya web sitemiz üzerinden form doldurarak bize ulaşabilirsiniz.",
  faq_5_question: "",
  faq_5_answer: "",
  faq_6_question: "",
  faq_6_answer: "",
};

export async function GET() {
  try {
    const settings = await getSettingsFromDb();
    const merged = { ...SSS_DEFAULTS, ...settings };
    return NextResponse.json(merged);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ayarlar alınamadı" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // accept { key, value } or { settings: { k: v } }
    if (body && body.settings && typeof body.settings === "object") {
      // normalize values to strings
      const normalized: Record<string, string> = {};
      for (const k of Object.keys(body.settings)) normalized[k] = String(body.settings[k]);
      await setSettingsToDb(normalized);
      return NextResponse.json({ ok: true });
    }
    if (body && typeof body.key === "string") {
      await setSettingsToDb({ [body.key]: String(body.value ?? "") });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Ayar kaydedilemedi: ${msg}` }, { status: 500 });
  }
}
