"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Plus, Trash2, Download } from "lucide-react";
import type { MenuData } from "@/lib/menu-types";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminMenuPage() {
  const [data, setData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then(async (r) => {
        if (!r.ok) {
          const j = await r.json().catch(() => null);
          throw new Error((j && j.error) || "Menü yüklenemedi");
        }
        const d = await r.json();
        setData(d);
        setMessage(null);
      })
      .catch((err) => {
        const errorMsg = err instanceof Error ? err.message : "Menü yüklenemedi";
        setMessage({ 
          type: "err", 
          text: errorMsg.includes("fetch") || errorMsg.includes("network") 
            ? "Bağlantı hatası. Lütfen sayfayı yenileyin veya sunucunun çalıştığından emin olun." 
            : `Hata: ${errorMsg}` 
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Kayıt başarısız");
      setMessage({ type: "ok", text: "Menü kaydedildi. Sayfayı yenileyerek görebilirsiniz." });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Kayıt başarısız";
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

  const addCategory = () => {
    if (!data) return;
    const id = slugify(`yeni-kategori-${data.menuCategories.length + 1}`);
    setData({
      ...data,
      menuCategories: [
        ...data.menuCategories,
        { id, name: "Yeni Kategori", items: [], note: "", image: undefined },
      ],
    });
  };

  const addItem = (catIndex: number) => {
    if (!data) return;
    const cats = [...data.menuCategories];
    cats[catIndex] = {
      ...cats[catIndex],
      items: [...cats[catIndex].items, { name: "", price: "", image: undefined }],
    };
    setData({ ...data, menuCategories: cats });
  };

  const removeItem = (catIndex: number, itemIndex: number) => {
    if (!data) return;
    const cats = [...data.menuCategories];
    cats[catIndex].items = cats[catIndex].items.filter((_, i) => i !== itemIndex);
    setData({ ...data, menuCategories: cats });
  };

  const updateCategory = (catIndex: number, field: string, value: string) => {
    if (!data) return;
    const cats = [...data.menuCategories];
    if (field === "id") (cats[catIndex] as { id: string }).id = value;
    else if (field === "name") cats[catIndex].name = value;
    else if (field === "note") cats[catIndex].note = value;
    else if (field === "image") cats[catIndex].image = value || undefined;
    setData({ ...data, menuCategories: cats });
  };

  const updateItem = (catIndex: number, itemIndex: number, field: string, value: string) => {
    if (!data) return;
    const cats = [...data.menuCategories];
    const item = cats[catIndex].items[itemIndex];
    if (field === "name") item.name = value;
    else if (field === "price") item.price = value;
    else if (field === "description") item.description = value;
    else if (field === "image") item.image = value || undefined;
    setData({ ...data, menuCategories: cats });
  };

  const addMainGroup = () => {
    if (!data) return;
    const id = `grup-${data.mainMenuGroups.length + 1}`;
    setData({
      ...data,
      mainMenuGroups: [
        ...data.mainMenuGroups,
        { id, name: "Yeni Grup", categoryIds: [] },
      ],
    });
  };

  const updateMainGroup = (
    idx: number,
    field: "name" | "categoryIds",
    value: string
  ): void => {
    if (!data) return;
    const groups = [...data.mainMenuGroups];
    if (field === "name") groups[idx].name = value;
    else groups[idx].categoryIds = value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];
    setData({ ...data, mainMenuGroups: groups });
  };

  const downloadJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "menu.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary font-medium hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Siteye dön
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Menü Yönetimi</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={downloadJson}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              JSON İndir
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${message.type === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message.text}
          </div>
        )}

        {/* Ana gruplar */}
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ana Gruplar</h2>
          {data.mainMenuGroups.map((g, idx) => (
            <div key={g.id} className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={g.name}
                onChange={(e) => updateMainGroup(idx, "name", e.target.value)}
                placeholder="Grup adı"
                className="flex-1 min-w-[200px] rounded border border-gray-200 px-3 py-2"
              />
              <input
                type="text"
                value={g.categoryIds.join(", ")}
                onChange={(e) => updateMainGroup(idx, "categoryIds", e.target.value)}
                placeholder="Kategori id'leri (virgülle)"
                className="flex-1 min-w-[200px] rounded border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMainGroup}
            className="inline-flex items-center gap-1 text-primary font-medium"
          >
            <Plus className="w-4 h-4" /> Ana grup ekle
          </button>
        </section>

        {/* Kategoriler ve ürünler */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Kategoriler ve Ürünler</h2>
          <button
            type="button"
            onClick={addCategory}
            className="inline-flex items-center gap-1 text-primary font-medium mb-6"
          >
            <Plus className="w-4 h-4" /> Kategori ekle
          </button>

          <div className="space-y-8">
            {data.menuCategories.map((cat, catIndex) => (
              <div key={cat.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <input
                    type="text"
                    value={cat.id}
                    onChange={(e) => updateCategory(catIndex, "id", e.target.value)}
                    placeholder="Kategori id (URL’de görünür)"
                    className="rounded border border-gray-200 px-3 py-2 text-sm font-mono"
                  />
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => updateCategory(catIndex, "name", e.target.value)}
                    placeholder="Kategori adı"
                    className="rounded border border-gray-200 px-3 py-2"
                  />
                  <input
                    type="text"
                    value={cat.note ?? ""}
                    onChange={(e) => updateCategory(catIndex, "note", e.target.value)}
                    placeholder="Not (opsiyonel)"
                    className="rounded border border-gray-200 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={cat.image ?? ""}
                    onChange={(e) => updateCategory(catIndex, "image", e.target.value)}
                    placeholder="Kategori görsel URL"
                    className="rounded border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">Ürünler</p>
                <ul className="space-y-2">
                  {cat.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex flex-wrap gap-2 items-center">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(catIndex, itemIndex, "name", e.target.value)}
                        placeholder="Ürün adı"
                        className="flex-1 min-w-[120px] rounded border border-gray-200 px-3 py-1.5 text-sm"
                      />
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => updateItem(catIndex, itemIndex, "price", e.target.value)}
                        placeholder="Fiyat"
                        className="w-24 rounded border border-gray-200 px-3 py-1.5 text-sm"
                      />
                      <input
                        type="text"
                        value={item.description ?? ""}
                        onChange={(e) =>
                          updateItem(catIndex, itemIndex, "description", e.target.value)
                        }
                        placeholder="Açıklama (opsiyonel)"
                        className="flex-1 min-w-[120px] rounded border border-gray-200 px-3 py-1.5 text-sm"
                      />
                      <input
                        type="text"
                        value={item.image ?? ""}
                        onChange={(e) => updateItem(catIndex, itemIndex, "image", e.target.value)}
                        placeholder="Görsel URL"
                        className="flex-1 min-w-[100px] rounded border border-gray-200 px-3 py-1.5 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(catIndex, itemIndex)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        aria-label="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => addItem(catIndex)}
                  className="mt-2 text-sm text-primary font-medium"
                >
                  + Ürün ekle
                </button>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-sm text-gray-500">
          Kaydettiğiniz menü <strong>data/menu.json</strong> dosyasına yazılır. Sunucuda dosya
          yazma izni yoksa &quot;JSON İndir&quot; ile indirip projede <strong>data/menu.json</strong>
          olarak kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
}
