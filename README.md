This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

1. Projeyi GitHub/GitLab’a pushlayın.
2. [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project** → reponuzu seçin.
3. Build ayarları otomatik gelir (`netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** Netlify Next.js eklentisi ayarlar.
4. **Deploy site** ile yayına alın.

**Menü güncellemesi:** Netlify’da sunucu dosya sistemi kalıcı değildir. Menüyü siteden değiştirip “Kaydet” yaptığınızda değişiklik bir sonraki deploy’da kalıcı olmaz. Kalıcı yapmak için: **Menü Yönetimi** → **JSON İndir** → indirdiğiniz `menu.json` dosyasını projede `data/menu.json` olarak koyup tekrar deploy edin.

## Deploy on Vercel

[Vercel](https://vercel.com/new) ile de deploy edebilirsiniz. [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
