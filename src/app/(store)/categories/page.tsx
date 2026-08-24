import React from 'react';

// ============================================================================
// 🚀  BUILD THE CATEGORIES PAGE (Service-Based Architecture)
// ============================================================================
// 
// Welcome! Your goal is to build a page that shows all the product categories
// available in our store. Don't worry, it's easier than it looks!
// 
// Since our website is now service-based, you must fetch categories from the 
// Product Microservice over HTTP instead of accessing database models directly!
// 
// Follow these steps one by one:
// 
// STEP 1: FETCH THE CATEGORIES
// ----------------------------
// Make this page component an `async` function if it isn't already.
// Connect to the Product Microservice by resolving `PRODUCT_SERVICE_URL` from `process.env`.
// 
// Inside your component, right before the `return` statement:
// 
// const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
// let categories = [];
// try {
//   const res = await fetch(`${productServiceUrl}/categories`, { cache: 'no-store' });
//   const data = await res.json();
//   if (data.success) {
//     categories = data.categories;
//   }
// } catch (err) {
//   console.error(err);
// }
// 
// 
// STEP 2: RENDER THE UI
// ---------------------
// Now that you have the `categories` array, you need to display them!
// Use the `.map()` function to loop through the array and create a card for each one.
// 
// Replace the <div className="text-center">...</div> below with this grid:
// 
// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
//   {categories.map((category: any) => (
//     <div key={category._id.toString()} className="bg-surface p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-lg transition-all text-center">
//       <h2 className="text-2xl font-black text-text-main capitalize">{category.name}</h2>
//       <p className="text-text-muted mt-2">Explore items</p>
//     </div>
//   ))}
// </div>
// 

export default function CategoriesPage() {
  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-text-main">Shop by Category</h1>
        </div>

        {/* 
          YOUR CODE GOES HERE 
          Delete the div below and replace it with your mapped categories!
        */}
        <div className="text-center py-32 bg-surface rounded-3xl border border-border/50 shadow-sm mt-10">
          <h2 className="text-2xl font-bold text-text-main mb-4">🚧 Challenge In Progress 🚧</h2>
          <p className="text-text-muted">Follow the instructions in the code comments to build this page!</p>
        </div>

      </div>
    </div>
  );
}
