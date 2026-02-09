import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";
import { getSettingsFromDb } from "@/lib/db";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

const VALID_IDS = ["1", "2", "3"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!VALID_IDS.includes(id)) return { title: "Yazı bulunamadı" };
  const settings = await getSettingsFromDb();
  const title = settings[`blog_${id}_title`] || "Blog";
  return { title: `${title} - Veluna Coffee & Lounge` };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!VALID_IDS.includes(id)) notFound();

  const settings = await getSettingsFromDb();
  const title = settings[`blog_${id}_title`];
  if (!title) notFound();

  const image = settings[`blog_${id}_image`] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";
  const author = settings[`blog_${id}_author`] || "Veluna";
  const date = settings[`blog_${id}_date`] || "";
  const content = settings[`blog_${id}_content`] || "";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <article className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Bloga dön
          </Link>

          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4 shrink-0" aria-hidden />
              {author}
              {date && ` · ${date}`}
            </p>
          </header>

          <div className="rounded-2xl overflow-hidden aspect-video relative bg-gray-200 mb-8">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>

          {content ? (
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: content
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            <p className="text-gray-500 italic">Bu yazı için henüz içerik eklenmemiş.</p>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
