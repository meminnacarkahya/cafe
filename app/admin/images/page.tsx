"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ImageRow {
  id: number;
  url: string;
  alt: string | null;
  type: string;
  created_at: string;
}

export default function AdminImagesPage() {
  const [list, setList] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [type, setType] = useState("general");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const load = () => {
    fetch("/api/images")
      .then(async (r) => {
        const j = await r.json().catch(() => null);
        if (!r.ok) {
          setMessage({ type: "err", text: (j && j.error) || "Yüklenemedi" });
          setList([]);
          return;
        }
        if (!Array.isArray(j)) {
          // defensive: ensure list is always an array
          setMessage({ type: "err", text: "Beklenmeyen cevap" });
          setList([]);
          return;
        }
        setList(j);
        setMessage(null);
      })
      .catch((err) => {
        const errorMsg = err instanceof Error ? err.message : "Yüklenemedi";
        setMessage({ 
          type: "err", 
          text: errorMsg.includes("fetch") || errorMsg.includes("network") 
            ? "Bağlantı hatası. Lütfen sayfayı yenileyin veya sunucunun çalıştığından emin olun." 
            : `Hata: ${errorMsg}` 
        });
        setList([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() && !file) return;
    setAdding(true);
    setMessage(null);
    try {
      let res: Response;
      if (file) {
        const form = new FormData();
        form.append("file", file);
        if (alt.trim()) form.append("alt", alt.trim());
        if (type) form.append("type", type);
        res = await fetch("/api/images", { method: "POST", body: form });
      } else {
        res = await fetch("/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim(), alt: alt.trim() || undefined, type }),
        });
      }
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Eklenemedi");
      setUrl("");
      setAlt("");
      setFile(null);
      setMessage({ type: "ok", text: "Görsel eklendi." });
      load();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Eklenemedi";
      setMessage({ 
        type: "err", 
        text: errorMsg.includes("fetch") || errorMsg.includes("network") 
          ? "Bağlantı hatası. Lütfen sayfayı yenileyin veya sunucunun çalıştığından emin olun." 
          : `Hata: ${errorMsg}` 
      });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu görseli silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/images?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error((j && j.error) || "Silinemedi");
      }
      load();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Silinemedi";
      setMessage({ 
        type: "err", 
        text: errorMsg.includes("fetch") || errorMsg.includes("network") 
          ? "Bağlantı hatası. Lütfen sayfayı yenileyin veya sunucunun çalıştığından emin olun." 
          : `Hata: ${errorMsg}` 
      });
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Görseller</h1>

      <form onSubmit={handleAdd} className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-4">Yeni görsel (URL)</h2>
        <div className="flex flex-wrap gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Görsel URL (veya dosya seçin)"
            aria-label="Görsel URL"
            className="flex-1 min-w-[200px] rounded-lg border border-gray-200 px-4 py-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
              aria-label="Görsel dosyası"
              className="rounded-lg"
            />
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Alt metin (opsiyonel)"
            aria-label="Alt metin"
            className="flex-1 min-w-[160px] rounded-lg border border-gray-200 px-4 py-2"
          />
          <select
            aria-label="Görsel tipi"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-2"
          >
            <option value="general">Genel</option>
            <option value="hero">Hero</option>
            <option value="category">Kategori</option>
            <option value="item">Ürün</option>
          </select>
          <button
            type="submit"
            disabled={adding || (!url.trim() && !file)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Ekle
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${message.type === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : list.length === 0 ? (
        <p className="text-gray-500">Henüz görsel yok. Yukarıdan URL ile ekleyebilirsiniz.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {list.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
            >
              <div className="aspect-square bg-gray-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt || ""}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23eee' width='100' height='100'/%3E%3Ctext x='50' y='50' fill='%23999' text-anchor='middle' dy='.3em' font-size='12'%3E?%3C/text%3E%3C/svg%3E";
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 text-xs text-gray-500 truncate" title={img.url}>
                {img.alt || img.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
