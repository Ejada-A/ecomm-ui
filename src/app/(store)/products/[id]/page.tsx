import React from 'react';
// import { notFound } from 'next/navigation';
// import { Star, ShieldCheck, Truck } from 'lucide-react';
// import AddToCartButton from '@/components/AddToCartButton';

// ============================================================================
//  CHALLENGE: BUILD THE PRODUCT DETAILS PAGE (Service-Based Architecture)
// ============================================================================
// 
// Welcome! Your colleague has assigned this page to you. Your goal is to build 
// the individual product page so customers can see the details of a single 
// product and add it to their cart.
// 
// Since our website is now service-based, you must fetch product details from 
// the Product Microservice over HTTP instead of accessing database models directly!
//
// Follow these simple steps carefully:
// 
// STEP 1: IMPORT YOUR TOOLS
// -------------------------
// Uncomment the imports at the top of this file:
// - `notFound` from `next/navigation`
// - `Star`, `ShieldCheck`, `Truck` from `lucide-react`
// - `AddToCartButton` from `@/components/AddToCartButton`
// 
// 
// STEP 2: FETCH THE PRODUCT FROM THE SERVICE
// ------------------------------------------
// Since this is a dynamic route (`[id]`), Next.js passes the `id` in the `params` object.
// In Next.js 15, `params` is a Promise, so we must `await` it first!
// 
// Get the `PRODUCT_SERVICE_URL` from `process.env` (defaulting to 'http://localhost:5002').
// Inside your component, right before the return statement, fetch the product over HTTP:
// 
// const resolvedParams = await params;
// const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
// 
// let product = null;
// try {
//   const res = await fetch(`${productServiceUrl}/products/${resolvedParams.id}`, { cache: 'no-store' });
//   const data = await res.json();
//   if (data.success) {
//     product = data.product;
//   }
// } catch (err) {
//   console.error(err);
// }
// 
// if (!product) {
//   notFound();
// }
// 
// 
// STEP 3: RENDER THE UI
// ---------------------
// Now replace the placeholder <div> below with a beautiful product layout.
// Make sure to uncomment the code block properly when copying it!
// 
// <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 mt-10">
//   {/* Image Gallery */}
//   <div className="flex flex-col-reverse lg:flex-row gap-4">
//     <div className="w-full bg-surface rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm flex items-center justify-center relative group">
//       <img
//         src={product.imageUrl}
//         alt={product.name}
//         className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
//       />
//     </div>
//   </div>
// 
//   {/* Product Info */}
//   <div className="mt-10 px-4 sm:px-0 lg:mt-0">
//     <div className="flex items-center gap-4 mb-4">
//       <span className="bg-badge-green text-success text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-success/20">
//         In Stock
//       </span>
//       <div className="flex items-center text-amber-400">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} className="w-4 h-4 fill-current" />
//         ))}
//       </div>
//     </div>
// 
//     <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-main leading-tight">
//       {product.name}
//     </h1>
// 
//     <div className="mt-6 flex items-end gap-4">
//       <p className="text-4xl font-black text-primary">${product.price.toFixed(2)}</p>
//     </div>
// 
//     <p className="mt-6 text-text-body leading-relaxed">
//       {product.description || "Indulge in the finest quality and modern style. Designed to suit your daily lifestyle with unmatched craftsmanship and comfort."}
//     </p>
// 
//     <div className="mt-10 flex flex-col sm:flex-row gap-4">
//       <AddToCartButton product={product} />
//     </div>
// 
//     <div className="mt-8 border-t border-border/50 pt-8 space-y-4">
//       <div className="flex items-center gap-3 text-text-body">
//         <Truck className="w-5 h-5 text-primary" />
//         <span className="font-semibold text-sm">Free shipping on orders over $150</span>
//       </div>
//       <div className="flex items-center gap-3 text-text-body">
//         <ShieldCheck className="w-5 h-5 text-primary" />
//         <span className="font-semibold text-sm">Secure checkout and 2-year warranty</span>
//       </div>
//     </div>
//   </div>
// </div>
// 

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params if you use them here! (e.g. const resolvedParams = await params;)

  return (
    <div className="bg-bg-subtle min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 
          YOUR CODE GOES HERE 
          Delete the div below and replace it with the Product UI snippet from the instructions!
        */}
        <div className="text-center py-32 bg-surface rounded-3xl border border-border/50 shadow-sm mt-10">
          <h2 className="text-2xl font-bold text-text-main mb-4">🚧 Challenge In Progress 🚧</h2>
          <p className="text-text-muted">Open `apps/frontend/src/app/(store)/products/[id]/page.tsx` and follow the instructions to build this page!</p>
        </div>

      </div>
    </div>
  );
}
