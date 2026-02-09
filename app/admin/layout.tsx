import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, Image as ImageIcon, FileText } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-56 bg-white border-r border-gray-200 shrink-0">
        <div className="p-4 border-b border-gray-100">
          <Link href="/" className="font-bold text-gray-900">
            Veluna Panel
          </Link>
        </div>
        <nav className="p-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <LayoutDashboard className="w-5 h-5" />
            Panel
          </Link>
          <Link
            href="/admin/menu"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <UtensilsCrossed className="w-5 h-5" />
            Menü
          </Link>
          <Link
            href="/admin/content"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <FileText className="w-5 h-5" />
            Metin & Görseller
          </Link>
          <Link
            href="/admin/images"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <ImageIcon className="w-5 h-5" />
            Görsel Kütüphanesi
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
