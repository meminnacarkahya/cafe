import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getMenuData, getCategoryById } from "@/lib/menu-loader";

export async function generateStaticParams() {
  const { menuCategories } = await getMenuData();
  return menuCategories.map((cat) => ({ categoryId: cat.id }));
}

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function MenuCategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const { menuCategories } = await getMenuData();
  const category = getCategoryById(categoryId, menuCategories);
  if (!category) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <Link
          href="/#menu"
          className="inline-flex items-center gap-1 text-primary font-medium hover:underline mb-8 min-h-[44px] items-center touch-manipulation"
        >
          <ChevronLeft className="w-4 h-4" />
          Menüye dön
        </Link>

        <header className="mb-8">
          {category.image && (
            <div className="relative w-full aspect-[21/9] max-h-64 rounded-2xl overflow-hidden bg-gray-200 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            {category.name}
          </h1>
          {category.note && (
            <p className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl">
              {category.note}
            </p>
          )}
        </header>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {category.items.map((item) => (
              <li
                key={item.name}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5 px-6 md:px-8"
              >
                <div className="flex gap-4 min-w-0 flex-1">
                  {item.image && (
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="text-gray-900 font-medium">
                      {item.name}
                    </span>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-primary font-semibold whitespace-nowrap sm:pl-4">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
