"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { Menu as MenuIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuData } from "@/app/MenuProvider";
import { getCategoriesByIds, type MenuData } from "@/lib/menu-types";

function useNavbarSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);
  return {
    logo: settings.navbar_logo || "Veluna",
    cta: settings.navbar_cta || "Rezervasyon",
  };
}

/** Menü en başta; açılır menüde sadece başlıklar, fiyat yok; her başlık detay sayfasına gider */
const navItems = [
  { label: "Menü", href: "#menu", hasDropdown: true },
  { label: "Anasayfa", href: "/", hasDropdown: false },
  { label: "Blog", href: "/blog", hasDropdown: false },
  { label: "İletişim", href: "/iletisim", hasDropdown: false },
  { label: "Sıkça Sorulan Sorular", href: "/sikca-sorulan-sorular", hasDropdown: false },
];

export default function Navbar() {
  const { logo, cta } = useNavbarSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const menuData = useMenuData();
  const [hoveredMainGroup, setHoveredMainGroup] = useState<MenuData["mainMenuGroups"][number] | null>(
    () => menuData.mainMenuGroups[0] ?? null
  );
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const [mobilePortalMounted, setMobilePortalMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobil menü açıkken body scroll kilidi
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Mobil menü açıldığında "Menü" bölümünü varsayılan açık yap ki kategoriler görünsün
  useEffect(() => {
    if (mobileOpen) setMobileMenuExpanded(true);
    else setMobileMenuExpanded(false);
  }, [mobileOpen]);

  // Portalı aç: menü açıldığında mount et; kapanış animasyonu bitince unmount et
  useEffect(() => {
    if (mobileOpen) setMobilePortalMounted(true);
  }, [mobileOpen]);
  const handleMobileDrawerCloseComplete = () => {
    if (!mobileOpen) setMobilePortalMounted(false);
  };

  const activeSubcategories = hoveredMainGroup
    ? getCategoriesByIds(hoveredMainGroup.categoryIds, menuData.menuCategories)
    : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Sol: Menü + Logo */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuDropdownOpen((o) => !o)}
                    className={`flex items-center gap-1.5 font-semibold transition-all py-2 px-1 rounded-lg text-sm lg:text-base relative ${
                      menuDropdownOpen
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`}
                    aria-expanded={!!menuDropdownOpen}
                    aria-haspopup="true"
                  >
                    Menü
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        menuDropdownOpen ? "rotate-180 text-primary" : "text-gray-500"
                      }`}
                    />
                    {menuDropdownOpen && (
                      <motion.div
                        layoutId="menu-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {menuDropdownOpen && (
                      <>
                        {/* Backdrop overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                          onClick={() => setMenuDropdownOpen(false)}
                        />
                        {/* Dropdown */}
                        <motion.div
                          initial={{ opacity: 0, y: -12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="fixed left-4 right-4 top-20 lg:absolute lg:left-0 lg:right-auto lg:top-full lg:pt-4 z-50 w-[calc(100vw-2rem)] lg:w-[min(95vw,1150px)]"
                        >
                          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200/50 overflow-hidden backdrop-blur-xl max-h-[calc(100vh-6rem)] lg:max-h-[82vh] flex flex-col">
                            <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
                              {/* Sol: Ana kategoriler */}
                              <div className="w-full lg:w-64 xl:w-72 shrink-0 bg-gradient-to-b from-gray-50 to-white border-b lg:border-b-0 lg:border-r border-gray-200/50 overflow-y-auto overscroll-contain flex flex-col">
                                <div className="p-3 lg:p-4 sticky top-0 bg-gradient-to-b from-gray-50 to-white border-b lg:border-b-0 border-gray-200/50 z-10 shrink-0">
                                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Kategoriler
                                  </h3>
                                </div>
                                <nav className="p-2 lg:p-3 space-y-1 flex-1">
                                  {menuData.mainMenuGroups.map((group) => {
                                    const isActive = hoveredMainGroup?.id === group.id;
                                    return (
                                      <button
                                        key={group.id}
                                        type="button"
                                        onMouseEnter={() => setHoveredMainGroup(group)}
                                        className={`w-full text-left px-3 py-2 lg:px-4 lg:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between gap-2 group ${
                                          isActive
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-gray-700 hover:bg-white hover:shadow-sm hover:text-primary"
                                        }`}
                                      >
                                        <span className="min-w-0 flex-1 break-words text-left">{group.name}</span>
                                        <ChevronRight
                                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                                            isActive
                                              ? "text-white/90 rotate-90"
                                              : "text-gray-400 group-hover:text-primary group-hover:translate-x-0.5"
                                          }`}
                                        />
                                      </button>
                                    );
                                  })}
                                </nav>
                              </div>
                              {/* Sağ: Alt kategoriler - yatay taşmada scroll */}
                              <div className="flex-1 min-w-0 overflow-y-auto overflow-x-auto overscroll-contain bg-white">
                                <div className="p-4 lg:p-5 xl:p-6 min-w-0">
                                  {activeSubcategories.length > 0 ? (
                                    <>
                                      <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4 px-1 sticky top-0 bg-white pb-2 z-10">
                                        {hoveredMainGroup?.name}
                                      </h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2.5 lg:gap-3">
                                        {activeSubcategories.map((sub) => (
                                          <Link
                                            key={sub.id}
                                            href={`/menu/${sub.id}`}
                                            onClick={() => setMenuDropdownOpen(false)}
                                            className="group relative px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-0.5 min-w-0"
                                          >
                                            <div className="flex items-center justify-between gap-2 min-w-0">
                                              <span className="text-xs lg:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors flex-1 min-w-0 break-words">
                                                {sub.name}
                                              </span>
                                              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                            {sub.note && (
                                              <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{sub.note}</p>
                                            )}
                                          </Link>
                                        ))}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex items-center justify-center h-full min-h-[200px] text-gray-400">
                                      <p className="text-sm">Kategori seçin</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight hover:text-primary transition-colors"
            aria-label={`${logo} - Ana sayfa`}
          >
            {logo}
          </Link>
        </div>

        {/* Mobilde sadece logo solda */}

        <Link
          href="/"
          className="md:hidden text-xl md:text-2xl font-bold text-gray-900 tracking-tight hover:text-primary transition-colors"
          aria-label={`${logo} - Ana sayfa`}
        >
          {logo}
        </Link>

        <ul className="hidden md:flex items-center gap-3 lg:gap-6">
          {navItems.filter((i) => !i.hasDropdown).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors text-sm lg:text-base"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">

          <Link
            href="#reservation"
            className="hidden sm:inline-flex items-center justify-center rounded-lg px-3 py-2 lg:px-4 text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            {cta}
          </Link>
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={!!mobileOpen}
              className="md:hidden min-w-[44px] min-h-[44px] p-2.5 -mr-1 text-gray-700 hover:text-primary touch-manipulation rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileOpen((prev) => !prev);
              }}
            >
              <MenuIcon className="w-6 h-6" aria-hidden />
            </button>
        </div>
      </nav>

      {/* Mobil menü: body'ye portal ile render, böylece stacking context / overflow sorunu olmaz */}
      {typeof document !== "undefined" &&
        mobilePortalMounted &&
        createPortal(
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: mobileOpen ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 z-[9998]"
              aria-hidden
              onClick={() => setMobileOpen(false)}
              style={{ touchAction: "none", pointerEvents: mobileOpen ? "auto" : "none" }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: mobileOpen ? 0 : "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={handleMobileDrawerCloseComplete}
              className="fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-sm bg-white shadow-2xl flex flex-col border-l border-gray-200 isolate"
              style={{ touchAction: "pan-y", pointerEvents: mobileOpen ? "auto" : "none" }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigasyon menüsü"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0 bg-white">
                <span className="font-bold text-lg text-gray-900">{logo}</span>
                <button
                  type="button"
                  aria-label="Menüyü kapat"
                  onClick={() => setMobileOpen(false)}
                  className="min-w-[44px] min-h-[44px] p-2 -mr-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl flex items-center justify-center touch-manipulation cursor-pointer transition-colors"
                >
                  <span className="text-2xl leading-none">×</span>
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white">
                <ul className="px-4 py-6 flex flex-col gap-2 list-none m-0">
                  {navItems.map((item) =>
                    item.hasDropdown ? (
                      <li key={item.href}>
                        <button
                          type="button"
                          onClick={() => setMobileMenuExpanded((e) => !e)}
                          className="flex items-center justify-between w-full min-h-[48px] py-3.5 px-4 rounded-xl text-gray-900 hover:text-primary hover:bg-gray-50 font-semibold text-left touch-manipulation transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${mobileMenuExpanded ? "rotate-180 text-primary" : "text-gray-400"}`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileMenuExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="py-2 space-y-3">
                                {menuData.mainMenuGroups.map((group) => {
                                  const subs = getCategoriesByIds(
                                    group.categoryIds,
                                    menuData.menuCategories
                                  );
                                  return (
                                    <div key={group.id} className="px-2">
                                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 px-2">
                                        {group.name}
                                      </p>
                                      <ul className="space-y-1 list-none m-0">
                                        {subs.map((cat) => (
                                          <li key={cat.id}>
                                            <Link
                                              href={`/menu/${cat.id}`}
                                              onClick={() => {
                                                setMobileOpen(false);
                                                setMobileMenuExpanded(false);
                                              }}
                                              className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 active:bg-primary/10 rounded-xl transition-colors touch-manipulation"
                                            >
                                              {cat.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block py-3.5 px-4 rounded-xl text-gray-900 hover:text-primary hover:bg-gray-50 font-semibold transition-colors touch-manipulation"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  )}
                  <li className="pt-4 mt-2 border-t border-gray-200">
                    <Link
                      href="#reservation"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center rounded-xl px-4 py-4 font-bold bg-primary text-white hover:bg-primary-hover active:scale-[0.98] transition-all shadow-lg shadow-primary/30 touch-manipulation"
                    >
                      {cta}
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>,
          document.body
        )}
    </header>
  );
}
