import React from 'react';

// ============================================================================
// 🚀 BEGINNER CHALLENGE: BUILD THE ALL PRODUCTS PAGE (Service-Based)
// ============================================================================
// 
// Welcome! Your goal is to build a page that displays every single product 
// in our store using the beautiful ProductCard component we already built.
// 
// Since our website is now service-based, you must fetch products from the 
// Product Microservice over HTTP instead of accessing database models directly!
// 
// Follow these simple steps:
// 
// STEP 1: IMPORT YOUR TOOLS
// -------------------------
// You need the card component to display products.
// Uncomment these imports:
// 
// // import ProductCard from '@/components/ProductCard';
// 
// 
// STEP 2: FETCH THE PRODUCTS
// --------------------------
// Make your component async by changing the definition to:
// `export default async function ProductsPage() {`
// 
// Connect to the Product Microservice by resolving `PRODUCT_SERVICE_URL` from `process.env`.
// Then, right before the `return` statement, fetch the products:
// 
// const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
// let products = [];
// try {
//   const res = await fetch(`${productServiceUrl}/products`, { cache: 'no-store' });
//   const data = await res.json();
//   if (data.success) {
//     products = data.products;
//   }
// } catch (err) {
//   console.error(err);
// }
// 
// 
// STEP 3: RENDER THE GRID
// -----------------------
// Now you have a `products` array! You need to loop over it using `.map()` 
// and render a `<ProductCard />` for every item.
// 
// Replace the placeholder <div> below with this beautiful CSS grid:
// 
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
//   {products.map((product: any) => (
//     <ProductCard key={product._id?.toString()} product={product} />
//   ))}
// </div>
// 

export default function ProductsPage() {
  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-text-main">All Products</h1>
            <p className="mt-2 text-text-body">Browse our entire premium collection.</p>
          </div>
        </div>

        {/* 
          YOUR CODE GOES HERE 
          Delete the div below and replace it with your mapped ProductCards!
        */}
        <div className="text-center py-32 bg-surface rounded-3xl border border-border/50 shadow-sm mt-10">
          <h2 className="text-2xl font-bold text-text-main mb-4">🚧 Challenge In Progress 🚧</h2>
          <p className="text-text-muted">Open `apps/frontend/src/app/(store)/products/page.tsx` and follow the instructions to build this page!</p>
        </div>

      </div>
    </div>
  );
}
