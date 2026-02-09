import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function MenuCategoryNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <p className="text-gray-600 mb-6">Bu menü kategorisi bulunamadı.</p>
      <Link
        href="/#menu"
        className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Menüye dön
      </Link>
    </div>
  );
}
