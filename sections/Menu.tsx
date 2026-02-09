"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionTitle from "@/ui/SectionTitle";
import { useMenuData } from "@/app/MenuProvider";
import { getCategoriesByIds, type MenuData } from "@/lib/menu-types";

const MENU_GROUP_PREFIX = "menu-group-";

function getMainGroupFromHash(
  mainMenuGroups: MenuData["mainMenuGroups"]
): MenuData["mainMenuGroups"][number] | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  if (!hash.startsWith(MENU_GROUP_PREFIX)) return null;
  const id = hash.slice(MENU_GROUP_PREFIX.length);
  return mainMenuGroups.find((g) => g.id === id) ?? null;
}

/** Ana sayfada sadece kategoriler; ürünler ve fiyatlar detay sayfasında */
export default function Menu() {
  const menuData = useMenuData();
  const [activeMainGroup, setActiveMainGroup] = useState<MenuData["mainMenuGroups"][number]>(() =>
    typeof window !== "undefined" && getMainGroupFromHash(menuData.mainMenuGroups)
      ? getMainGroupFromHash(menuData.mainMenuGroups)!
      : menuData.mainMenuGroups[0]
  );

  const subcategories = getCategoriesByIds(activeMainGroup.categoryIds, menuData.menuCategories);

  useEffect(() => {
    const group = getMainGroupFromHash(menuData.mainMenuGroups);
    if (group) setActiveMainGroup(group);
    const handler = () => {
      const g = getMainGroupFromHash(menuData.mainMenuGroups);
      if (g) setActiveMainGroup(g);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [menuData.mainMenuGroups]);

  return (
    <section id="menu" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="Menü" highlight="" className="mb-12 md:mb-16" />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-56 shrink-0">
            <nav
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              aria-label="Menü kategorileri"
            >
              {menuData.mainMenuGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setActiveMainGroup(group);
                    window.history.replaceState(
                      null,
                      "",
                      `#${MENU_GROUP_PREFIX}${group.id}`
                    );
                  }}
                  className={`w-full text-left px-4 py-3.5 min-h-[44px] text-sm font-medium transition-colors flex items-center justify-between border-b border-gray-50 last:border-0 touch-manipulation ${
                    activeMainGroup.id === group.id
                      ? "bg-primary text-white border-l-4 border-l-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {group.name}
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${activeMainGroup.id === group.id ? "text-white" : "text-gray-400"}`}
                  />
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            <motion.div
              key={activeMainGroup.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <p className="text-sm text-gray-500 mb-4">
                  Ürünleri ve fiyatları görmek için kategoriye tıklayın.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/menu/${sub.id}`}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-800 font-medium hover:bg-gray-50 hover:text-primary transition-colors group"
                    >
                      {sub.image ? (
                        <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sub.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}
                      <span className="flex-1 min-w-0 truncate">{sub.name}</span>
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
