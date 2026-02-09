"use client";

import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, Image as ImageIcon, FileText, LogOut, ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated, logout, getUser } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const user = getUser();

  useEffect(() => {
    setMounted(true);
    // Skip auth check on login page
    if (pathname !== "/admin/login" && !isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  // Don't check auth on login page
  if (pathname === "/admin/login") {
    return children;
  }

  if (!mounted || !isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h1 className="font-bold text-xl text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-600">Veluna Cafe</p>
          {user && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">Hoş geldin,</p>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          )}
        </div>
        
        <nav className="p-2 flex-1">
          <Link
            href="/admin"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pathname === "/admin"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-primary"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Panel
          </Link>
          <Link
            href="/admin/menu"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pathname === "/admin/menu"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-primary"
            }`}
          >
            <UtensilsCrossed className="w-5 h-5" />
            Menü
          </Link>
          <Link
            href="/admin/content"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pathname === "/admin/content"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-primary"
            }`}
          >
            <FileText className="w-5 h-5" />
            Metin & Görseller
          </Link>
          <Link
            href="/admin/images"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pathname === "/admin/images"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-primary"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Görsel Kütüphanesi
          </Link>
        </nav>

        <div className="p-4 space-y-2 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            Siteye Dön
          </Link>
        </div>
      </aside>
      
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
