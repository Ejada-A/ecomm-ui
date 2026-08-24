"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="fixed w-full z-50 glassmorphism transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-text-muted hover:text-text-main transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
              <span className="bg-primary text-surface px-2 py-1 rounded-lg">E</span>jadaStore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="text-text-body hover:text-primary hover:bg-badge-blue px-4 py-2 rounded-full text-sm font-semibold transition-all">
              Home
            </Link>
            <Link href="/products" className="text-text-body hover:text-primary hover:bg-badge-blue px-4 py-2 rounded-full text-sm font-semibold transition-all">
              Shop All
            </Link>
            <Link href="/categories" className="text-text-body hover:text-primary hover:bg-badge-blue px-4 py-2 rounded-full text-sm font-semibold transition-all">
              Categories
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <button className="text-text-muted hover:text-primary transition-colors p-2 hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/login" className="text-text-muted hover:text-primary transition-colors p-2">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-text-muted hover:text-primary transition-colors p-2 relative group">
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute 0 right-0 bg-primary text-surface text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-surface translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
