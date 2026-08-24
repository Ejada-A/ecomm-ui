"use client";

import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="flex-1 bg-primary border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center gap-3 text-lg font-bold text-surface hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
    >
      <ShoppingBag className="w-5 h-5" />
      Add to Cart
    </button>
  );
}
