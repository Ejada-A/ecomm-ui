/**
 * @file ProductCard.tsx
 * 
 * TODO FOR BEGINNER:
 * 1. This component receives a `product` prop of type IProduct (see src/types/product.types.ts).
 * 2. Return a visually appealing card (using plain divs with Tailwind classes) that displays:
 *    - The product image (`product.imageUrl`)
 *    - The product name (`product.name`)
 *    - The price, formatted as currency (`product.price`)
 *    - A button to "Add to Cart" that calls `useCart().addItem({ ... })`.
 * 3. Use the CSS variables configured in `tailwind.config.js` (e.g. `text-brand-navy`, `bg-brand-blue`).
 */

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // Handle Add to Cart logic
  const handleAddToCart = () => {
    addItem({
      productId: product._id as string,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    alert('Added to cart!');
  };

  return (
    <div className="border border-neutral-border rounded p-4 flex flex-col gap-2">
      {/* TODO: Build the beautiful UI using Tailwind classes here! */}
      <h3 className="font-bold text-brand-navy">{product.name}</h3>
      <p className="text-neutral-body">${product.price.toFixed(2)}</p>
      
      <button 
        onClick={handleAddToCart}
        className="mt-auto bg-brand-blue hover:bg-brand-navy text-white py-2 px-4 rounded transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
