import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
const ITEMS_PER_PAGE = 15;

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string, page?: string }> }) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category?.toLowerCase();
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1', 10) || 1);
  
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  let products = [];
  let categories = [];
  
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${productServiceUrl}/products`, { cache: 'no-store' }),
      fetch(`${productServiceUrl}/categories`, { cache: 'no-store' })
    ]);
    
    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();
    
    if (productsData.success) {
      products = productsData.products.filter((p: any) => p.imageUrl && p.imageUrl.trim() !== '');
    }
    if (categoriesData.success) categories = categoriesData.categories;
  } catch (err) {
    console.error('Failed to fetch data:', err);
  }

  // Filter products locally based on category param
  const filteredProducts = currentCategory 
    ? products.filter((p: any) => p.categoryId?.name?.toLowerCase() === currentCategory)
    : products;

  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);
  
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Helper to construct pagination URLs while preserving category
  const getPageUrl = (pageNumber: number) => {
    if (currentCategory) {
      return `/products?category=${currentCategory}&page=${pageNumber}`;
    }
    return `/products?page=${pageNumber}`;
  };

  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-text-main">
              {currentCategory ? (
                <span className="capitalize">{currentCategory} Products</span>
              ) : (
                'All Products'
              )}
            </h1>
            <p className="mt-2 text-text-body">
              Showing {totalItems > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} products.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link 
            href="/products" 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
              !currentCategory 
                ? 'bg-primary text-surface shadow-primary/20 scale-105' 
                : 'bg-surface text-text-muted hover:text-primary hover:bg-badge-blue'
            }`}
          >
            All
          </Link>
          {categories.map((cat: any) => {
            const isSelected = currentCategory === cat.name.toLowerCase();
            return (
              <Link 
                key={cat._id.toString()}
                href={`/products?category=${cat.name.toLowerCase()}`}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm capitalize ${
                  isSelected 
                    ? 'bg-primary text-surface shadow-primary/20 scale-105' 
                    : 'bg-surface text-text-muted hover:text-primary hover:bg-badge-blue'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
              {paginatedProducts.map((product: any) => (
                <ProductCard key={product._id?.toString()} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                {validPage > 1 ? (
                  <Link 
                    href={getPageUrl(validPage - 1)}
                    className="p-2 rounded-xl bg-surface border border-border/50 text-text-main hover:bg-bg-subtle transition-colors shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Link>
                ) : (
                  <button disabled className="p-2 rounded-xl bg-surface/50 border border-border/30 text-text-muted cursor-not-allowed">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div className="flex items-center gap-2 px-4">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === validPage;
                    return (
                      <Link 
                        key={pageNum}
                        href={getPageUrl(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all shadow-sm ${
                          isCurrent 
                            ? 'bg-primary text-surface shadow-primary/20' 
                            : 'bg-surface border border-border/50 text-text-main hover:bg-bg-subtle'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>

                {validPage < totalPages ? (
                  <Link 
                    href={getPageUrl(validPage + 1)}
                    className="p-2 rounded-xl bg-surface border border-border/50 text-text-main hover:bg-bg-subtle transition-colors shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <button disabled className="p-2 rounded-xl bg-surface/50 border border-border/30 text-text-muted cursor-not-allowed">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-surface rounded-3xl border border-border/50 shadow-sm mt-10">
            <h3 className="text-lg font-bold text-text-main">No products found</h3>
            <p className="mt-2 text-text-muted">Check back soon for new arrivals in this category.</p>
            {currentCategory && (
              <Link href="/products" className="inline-block mt-4 text-primary font-semibold hover:underline">
                View all products &rarr;
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
