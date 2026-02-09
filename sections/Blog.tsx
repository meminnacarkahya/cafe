"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/ui/Card";
import SectionTitle from "@/ui/SectionTitle";
import { useEffect, useState } from "react";

const defaultPosts = [
  { title: "Hayalindeki Akşam Menüleri", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80", author: "Veluna", date: "22 Ara 2024" },
  { title: "7/24 Hizmet Anlayışı", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80", author: "Veluna", date: "20 Ara 2024" },
  { title: "Her Gün Taze Malzemeler", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80", author: "Veluna", date: "18 Ara 2024" },
];

export default function Blog() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((j) => setSettings(j || {}))
      .catch(() => {});
  }, []);

  const titlePart = settings.blog_title ?? "Son ";
  const highlightPart = settings.blog_highlight ?? "Haberler";
  const posts = [1, 2, 3].map((i) => ({
    id: String(i),
    title: settings[`blog_${i}_title`] || defaultPosts[i - 1].title,
    image: settings[`blog_${i}_image`] || defaultPosts[i - 1].image,
    author: settings[`blog_${i}_author`] || defaultPosts[i - 1].author,
    date: settings[`blog_${i}_date`] || defaultPosts[i - 1].date,
  }));

  return (
    <section id="blog" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={titlePart} highlight={highlightPart} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="block h-full group">
                <Card className="overflow-hidden h-full flex flex-col transition-shadow group-hover:shadow-lg">
                  <div className="aspect-video relative shrink-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 350px"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                      <User className="w-4 h-4 shrink-0" aria-hidden />
                      {post.author} / {post.date}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
