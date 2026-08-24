"use client";

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-text-main mb-10">Your Cart</h1>
          
          <div className="bg-surface rounded-3xl p-12 sm:p-20 text-center border border-border/50 shadow-sm flex flex-col items-center justify-center">
            <div className="bg-badge-blue p-6 rounded-full text-primary mb-6">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-text-main mb-4">It's empty in here</h2>
            <p className="text-text-body mb-10 text-lg max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Let's find some premium items for you.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-surface bg-primary hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight text-text-main mb-10">Your Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-8">
            <ul className="border-t border-border/50 divide-y divide-border/50">
              {items.map((item) => (
                <li key={item._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 rounded-2xl object-contain object-center sm:w-32 sm:h-32 bg-surface p-2 border border-border/50"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-bold text-text-main">
                            <Link href={`/products/${item._id}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-text-muted">Premium Collection</p>
                        <p className="mt-2 text-xl font-black text-text-main">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center gap-4">
                        <div className="flex items-center border border-border/50 rounded-lg bg-surface">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-semibold text-text-main">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute top-0 right-0 sm:top-auto sm:right-auto">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="-m-2 p-2 inline-flex text-text-muted hover:text-red-500 transition-colors"
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <section className="mt-16 bg-surface rounded-3xl px-6 py-8 sm:p-10 lg:p-12 lg:mt-0 lg:col-span-4 border border-border/50 shadow-sm">
            <h2 className="text-2xl font-bold text-text-main">Order summary</h2>

            <dl className="mt-8 space-y-6 text-sm font-medium text-text-body">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="text-text-main font-semibold">${totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-6">
                <dt className="text-base font-bold text-text-main">Order total</dt>
                <dd className="text-2xl font-black text-text-main">${totalPrice.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                href="/checkout"
                className="w-full bg-primary border border-transparent rounded-2xl shadow-lg shadow-primary/20 py-4 px-4 text-base font-bold text-surface hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center transition-all hover:-translate-y-1"
              >
                Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
