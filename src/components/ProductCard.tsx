"use client";

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const productId = product._id?.toString();
  const { addToCart } = useCart();

  return (
    <div className="group w-full flex flex-col cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-bg-subtle shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Top Badges */}
        <div className="absolute top-5 inset-x-5 flex items-start justify-between z-20">
          <div className="flex flex-col gap-2">
            {product.stock > 0 && product.stock <= 5 && (
              <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                Low Stock
              </span>
            )}
            <span className="bg-surface/80 backdrop-blur-md text-text-main border border-border/50 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              New
            </span>
          </div>
        </div>

        {/* Product Image */}
        <Link href={`/products/${productId}`} className="absolute inset-0 flex items-center justify-center p-8 z-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
          />
        </Link>
        
        {/* Quick Add Button overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-surface/90 backdrop-blur-xl border border-white/20 text-text-main font-bold py-3.5 px-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="mt-6 flex flex-col px-2">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/products/${productId}`} className="flex-1">
            <h3 className="text-lg font-bold text-text-main line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-lg font-bold text-text-main shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-sm text-text-muted">
          <span>{(product.categoryId as any)?.name || 'Premium Series'}</span>
          <Link 
            href={`/products/${productId}`} 
            className="flex items-center gap-1 font-semibold hover:text-primary transition-colors opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300"
          >
            Details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
