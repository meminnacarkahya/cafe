import { getSettingsFromDb } from "@/lib/db";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import ContactContent from "./ContactContent";

export const metadata = {
  title: "İletişim - Veluna Coffee & Lounge",
  description: "Veluna Coffee & Lounge iletişim bilgileri ve sıkça sorulan sorular.",
};

export default async function IletisimPage() {
  const settings = await getSettingsFromDb();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <ContactContent initialSettings={settings} />
      </main>
      <Footer />
    </>
  );
}
