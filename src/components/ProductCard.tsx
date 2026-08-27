"use client";

import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const productId = product._id?.toString();
  const { addToCart } = useCart();

  // Rating fallback if not present
  const rating = product.rating || (4 + (parseInt(productId?.substring(productId.length - 2), 16) % 10) / 10).toFixed(1);
  const reviewsCount = product.reviewsCount || (10 + (parseInt(productId?.substring(productId.length - 3), 16) % 90));

  return (
    <Link href={`/products/${productId}`} className="group w-full flex flex-col cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-surface border border-border/40 shadow-xs transition-all duration-300">
        
        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 z-0 bg-bg-subtle/50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Circular Floating Quick Add Button (Expands Horizontally on Card Hover) */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex justify-end">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="h-9 w-full sm:w-9 sm:group-hover:w-full bg-surface text-text-main border border-border/60 shadow-md rounded-full flex items-center justify-center px-3 sm:p-0 sm:group-hover:px-3 sm:group-hover:bg-primary sm:group-hover:text-surface sm:group-hover:border-primary transition-all duration-300 ease-out overflow-hidden"
            title="Quick Add to Cart"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="max-w-xs opacity-100 ml-2 sm:max-w-0 sm:opacity-0 sm:ml-0 sm:group-hover:max-w-xs sm:group-hover:opacity-100 sm:group-hover:ml-2 whitespace-nowrap text-xs font-bold transition-all duration-300 ease-out overflow-hidden">
              Add to Cart
            </span>
          </button>
        </div>
      </div>

      {/* Content Container below image */}
      <div className="mt-2.5 flex flex-col px-0.5">

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold tracking-tight text-text-main uppercase line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Category / Subtitle */}
        <p className="text-[11px] sm:text-xs text-text-muted font-medium line-clamp-1 mt-0.5">
          {(product.categoryId as any)?.name || 'Regular Fit'}
        </p>

        {/* Price Row */}
        <div className="mt-1 flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-xs text-text-muted line-through font-medium">
              ${(product.oldPrice).toFixed(2)}
            </span>
          )}
          <span className="text-xs sm:text-sm font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Rating Row */}
        <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-text-muted">
          <Star className="w-3 h-3 fill-text-main text-text-main" />
          <span className="font-bold text-text-main">{rating}</span>
          <span>({reviewsCount})</span>
        </div>

      </div>
    </Link>
  );
}
