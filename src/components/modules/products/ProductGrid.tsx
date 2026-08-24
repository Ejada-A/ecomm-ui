/**
 * @file ProductGrid.tsx
 * 
 * TODO FOR BEGINNER:
 * 1. This component will fetch the products from our API (or accept them as props).
 * 2. Render a CSS Grid or Flexbox layout.
 * 3. Map over the products array and render the <ProductCard /> for each one.
 */

import React from 'react';
import ProductCard from './ProductCard';
import { IProduct } from '@/types';

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Map through products and render ProductCard */}
      {products.map(product => (
        <ProductCard key={product._id as string} product={product} />
      ))}
    </div>
  );
}
