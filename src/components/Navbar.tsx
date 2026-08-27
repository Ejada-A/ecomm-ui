"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { logoutUser } from '@/actions/auth';

interface NavbarProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

export default function Navbar({ isLoggedIn = false, isAdmin = false }: NavbarProps) {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glassmorphism transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-text-muted hover:text-text-main transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center group">
              <Image 
                src="/logoTransparent.png" 
                alt="EjadaStore Logo" 
                width={150} 
                height={50} 
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                priority
              />
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
            {isAdmin && (
              <Link href="/admin" className="text-primary hover:bg-primary hover:text-surface px-4 py-2 rounded-full text-sm font-bold transition-all border border-primary">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {isLoggedIn ? (
              <form action={logoutUser}>
                <button type="submit" className="text-text-muted hover:text-red-500 transition-colors p-2 flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:block text-sm font-bold">Sign Out</span>
                </button>
              </form>
            ) : (
              <Link href="/login" className="text-text-muted hover:text-primary transition-colors p-2">
                <User className="h-5 w-5" />
              </Link>
            )}
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
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border/50 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 text-text-body hover:text-primary hover:bg-bg-subtle rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block px-3 py-2 text-text-body hover:text-primary hover:bg-bg-subtle rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link 
              href="/categories" 
              className="block px-3 py-2 text-text-body hover:text-primary hover:bg-bg-subtle rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            {isAdmin && (
              <Link 
                href="/admin" 
                className="block px-3 py-2 text-primary font-bold hover:bg-primary hover:text-surface rounded-md text-base transition-colors border border-primary/30 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
