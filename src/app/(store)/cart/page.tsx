"use client";

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-bg-subtle min-h-screen pt-24 sm:pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-surface rounded-3xl p-8 sm:p-14 border border-border/40 shadow-xs flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-badge-blue rounded-full text-primary flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-2">Your cart is empty</h2>
            <p className="text-text-muted text-sm max-w-sm mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-md text-surface bg-primary hover:bg-primary-hover transition-all"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-subtle min-h-screen pt-24 sm:pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-text-main">Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})</h1>
          <Link href="/products" className="text-xs sm:text-sm font-semibold text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-start">
          
          {/* Cart Item List */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ul className="divide-y divide-border/40">
              {items.map((item) => (
                <li key={item._id} className="py-4 sm:py-6 flex gap-4 items-center">
                  
                  {/* Compact Product Image */}
                  <Link href={`/products/${item._id}`} className="shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl object-contain bg-surface p-1.5 border border-border/40"
                    />
                  </Link>

                  {/* Details Container */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/products/${item._id}`} className="text-xs sm:text-base font-bold text-text-main truncate hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-text-muted hover:text-red-500 p-1 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] sm:text-xs text-text-muted font-medium mt-0.5">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity Stepper & Subtotal Row */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-border/60 rounded-lg bg-surface h-8">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2.5 h-full text-text-muted hover:text-text-main flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-text-main min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2.5 h-full text-text-muted hover:text-text-main flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-text-main">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Minimal Shopify Order Summary */}
          <section className="mt-8 lg:mt-0 lg:col-span-5 xl:col-span-4 bg-surface rounded-2xl p-5 sm:p-6 border border-border/40 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-text-main mb-4 border-b border-border/40 pb-3">Order Summary</h2>

            <div className="space-y-3 text-xs sm:text-sm text-text-body font-medium">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text-main font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Shipping</span>
                <span className="text-success font-semibold text-xs">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/40 pt-3">
                <span className="text-sm sm:text-base font-bold text-text-main">Total</span>
                <span className="text-base sm:text-lg font-black text-text-main">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/checkout"
                className="w-full bg-primary text-surface font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-primary-hover transition-all flex items-center justify-center text-sm gap-2"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
