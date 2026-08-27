import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  let categories = [];
  
  try {
    const res = await fetch(`${productServiceUrl}/categories`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      categories = data.categories.filter((cat: any) => /^[a-zA-Z\s]+$/.test(cat.name));
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-text-main">Shop by Category</h1>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {categories.map((category: any) => (
              <Link key={category._id.toString()} href={`/products?category=${category.name.toLowerCase()}`} className="group">
                <div className="bg-surface p-8 rounded-3xl border border-border/50 shadow-sm group-hover:shadow-lg group-hover:border-primary/30 transition-all text-center h-full flex flex-col justify-center min-h-[200px]">
                  <h2 className="text-2xl font-black text-text-main capitalize group-hover:text-primary transition-colors">{category.name}</h2>
                  <p className="text-text-muted mt-2 group-hover:text-text-body transition-colors">Explore items &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-surface rounded-3xl border border-border/50 shadow-sm mt-10">
            <h3 className="text-lg font-bold text-text-main">No categories found</h3>
            <p className="mt-2 text-text-muted">Categories will appear here once added.</p>
          </div>
        )}

      </div>
    </div>
  );
}
