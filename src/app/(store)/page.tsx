import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  let products = [];
  
  try {
    const res = await fetch(`${productServiceUrl}/products`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      products = data.products.filter((p: any) => p.imageUrl && p.imageUrl.trim() !== '');
    }
  } catch (err) {
    console.error('Failed to fetch products on Home page:', err);
  }

  return (
    <div className="bg-bg-subtle min-h-screen">
      {/* Hero Section with Custom Image and Transparent Logo Overlay */}
      <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroTest.jpeg"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle dark gradient overlay to make the logo and text pop */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-10">
          <Image
            src="/ejada_logo_bilingual_white.png"
            alt="EjadaStore Transparent Logo"
            width={400}
            height={150}
            className="w-full max-w-xs md:max-w-md h-auto drop-shadow-2xl -mb-16 md:-mb-32"
            priority
          />
          
          <h2 className="text-xl sm:text-3xl font-bold tracking-[0.2em] text-surface uppercase drop-shadow-md">
            Cloud Departments Interns
          </h2>
          
          <div className="mt-8 flex items-center gap-x-6">
            <a href="#products" className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-surface shadow-lg hover:bg-primary-hover hover:scale-105 transition-all flex items-center gap-2 border border-surface/20">
              Shop Collection <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div id="products" className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-text-main sm:text-4xl">New Arrivals</h2>
            <p className="mt-2 text-text-body">The latest premium essentials.</p>
          </div>
          <a href="#" className="hidden sm:block text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            Browse all products &rarr;
          </a>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.slice(0, 10).map((product: any) => (
              <ProductCard key={product._id?.toString()} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-surface rounded-3xl border border-border/50 shadow-sm">
            <h3 className="text-lg font-bold text-text-main">No products found</h3>
            <p className="mt-2 text-text-muted max-w-md mx-auto">
              It looks like the store is empty. Please run the seed API to populate products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
