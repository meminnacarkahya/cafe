import { getSettingsFromDb } from "@/lib/db";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import SSSContent from "./SSSContent";

export const metadata = {
  title: "Sıkça Sorulan Sorular - Veluna Coffee & Lounge",
  description: "Veluna Coffee & Lounge sıkça sorulan sorular ve cevapları.",
};

export const dynamic = "force-dynamic";

export default async function SikcaSorulanSorularPage() {
  const settings = await getSettingsFromDb();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <SSSContent initialSettings={settings} />
      </main>
      <Footer />
    </>
  );
}
