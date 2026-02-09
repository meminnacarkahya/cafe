# Veluna Coffee & Lounge Website

Bu Next.js ile geliştirilmiş modern bir kafe/restoran sitesidir. Admin paneli ile menü, içerik ve görselleri yönetebilirsiniz.

## Özellikler

- 🎨 Modern ve responsive tasarım
- 📱 Mobil uyumlu
- ⚡ Hızlı ve performanslı (Next.js 14)
- 🔐 Admin paneli (menü, içerik, görsel yönetimi)
- 💾 Kalıcı veri depolama (Upstash Redis)
- 📝 Dinamik menü yönetimi
- 🖼️ Görsel kütüphanesi
- ⚙️ Site içerik yönetimi

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

Admin panele `/admin` URL'inden ulaşabilirsiniz.

## Deploy on Vercel (Önerilen)

### 1. Upstash Redis Kurulumu (Kalıcı Veri Depolama)

Vercel'de dosya sistemi read-only olduğu için, admin panelden yapılan değişikliklerin kalıcı olması için **Upstash Redis** gereklidir:

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz → **Storage** tab
2. **Create Database** → **Upstash Redis** seçin (ücretsiz tier mevcut)
3. Database adı: `cafe-redis` (veya istediğiniz isim)
4. **Create** ile oluşturun
5. Environment variables otomatik projeye bağlanacak:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

**Not:** Redis olmadan da çalışır ama admin panelden yapılan değişiklikler kalıcı olmaz.

### 2. Deploy

1. GitHub'a pushlayın
2. [Vercel](https://vercel.com/new) → **Import Git Repository**
3. Projeyi seçin ve **Deploy**

## Deploy on Netlify

1. Projeyi GitHub/GitLab'a pushlayın
2. [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project** → reponuzu seçin
3. Build ayarları otomatik gelir (`netlify.toml`)
4. **Deploy site** ile yayına alın

**Not:** Netlify'da da kalıcı veri depolama için Upstash Redis entegrasyonu kurabilirsiniz.

## Admin Paneli

Admin panele `/admin` URL'inden erişebilirsiniz:

- **Menü Yönetimi** (`/admin/menu`): Kategoriler, ürünler ve grupları düzenleyin
- **İçerik Yönetimi** (`/admin/content`): Site metinlerini düzenleyin
- **Görsel Kütüphanesi** (`/admin/images`): Görselleri yükleyin ve yönetin

## Teknolojiler

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Upstash Redis (veri depolama)
- Lucide Icons

## Lisans

MIT
