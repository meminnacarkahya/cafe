import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Panel</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/menu"
          className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-gray-900 mb-1">Menü</h2>
          <p className="text-sm text-gray-500">Kategorileri ve ürünleri düzenleyin.</p>
        </Link>
        <Link
          href="/admin/images"
          className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-gray-900 mb-1">Görseller</h2>
          <p className="text-sm text-gray-500">Medya kütüphanesi ve görsel URL’leri.</p>
        </Link>
        <Link
          href="/admin/content"
          className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-gray-900 mb-1">İçerik</h2>
          <p className="text-sm text-gray-500">Site metinlerini düzenleyin (Hero, About vb.).</p>
        </Link>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Veriler SQLite veritabanında (<code className="bg-gray-100 px-1 rounded">data/cafe.db</code>) tutulur.
      </p>
    </div>
  );
}
