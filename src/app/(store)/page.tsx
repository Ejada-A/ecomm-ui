import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  let products = [];
  
  try {
    const res = await fetch(`${productServiceUrl}/products`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      products = data.products;
    }
  } catch (err) {
    console.error('Failed to fetch products on Home page:', err);
  }

  return (
    <div className="bg-bg-subtle min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-badge-blue to-surface -z-10" />
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-surface shadow-xl shadow-primary/5 ring-1 ring-border/20 sm:-mr-80 lg:-mr-96" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-text-main leading-[1.1]">
              Elevate Your <span className="text-primary">Lifestyle</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-body leading-relaxed max-w-xl">
              Discover a curated collection of premium products designed to enhance your everyday experience. Quality meets aesthetics.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a href="#products" className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-surface shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-105 transition-all flex items-center gap-2">
                Shop Collection <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-text-main hover:text-primary transition-colors">
                View Lookbook <span aria-hidden="true">→</span>
              </a>
            </div>
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
