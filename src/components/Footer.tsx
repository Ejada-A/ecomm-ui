"use client";

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

const shopLinks = [
  { label: 'Men', href: '/products?category=men' },
  { label: 'Women', href: '/products?category=women' },
  { label: 'Accessories', href: '/products?category=accessories' },
  { label: 'Sale', href: '/products?sale=true' },
];

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Returns', href: '/returns' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [categories, setCategories] = useState<{name: string, _id: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:5002';
        const res = await fetch(`${url}/categories`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch categories for footer:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#031083] text-white mt-auto pt-12 pb-6 border-t border-[#031083]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Social Links (Preserved from Ejada styles) */}
        <div className="flex justify-center items-center gap-12 text-sm font-bold tracking-widest uppercase mb-16">
          <a href="https://www.facebook.com/ejada.systems" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
            Facebook
          </a>
          <span className="text-white/30">/</span>
          <a href="https://x.com/ejada_systems" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
            Platform X
          </a>
          <span className="text-white/30">/</span>
          <a href="https://www.linkedin.com/company/ejada/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
            LinkedIn
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-20 border-t border-white/10 pt-16">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <a href="https://www.ejada.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Image 
                src="/ejada_logo_bilingual_white.png" 
                alt="Ejada Logo" 
                width={160} 
                height={55} 
                className="w-40 h-auto object-contain hover:opacity-80 transition-opacity"
              />
            </a>
            <p className="text-white/90 text-sm leading-relaxed max-w-xs font-medium">
              Considered essentials for a modern wardrobe — thoughtfully sourced,
              built to last, delivered with care.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-green-400 font-bold uppercase tracking-widest text-sm mb-4">Shop</h3>
            <ul className="space-y-3">
              {categories.length > 0 ? categories.map((cat) => (
                <li key={cat._id.toString()}>
                  <Link href={`/products?category=${cat.name.toLowerCase()}`} className="text-white/90 hover:text-green-400 font-medium transition-colors text-sm capitalize">
                    {cat.name}
                  </Link>
                </li>
              )) : shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/90 hover:text-green-400 font-medium transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-green-400 font-bold uppercase tracking-widest text-sm mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/90 hover:text-green-400 font-medium transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-green-400 font-bold uppercase tracking-widest text-sm mb-4">Stay in the loop</h3>
            <p className="text-white/90 text-sm mb-4 font-medium">
              New arrivals and members-only offers, straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-full pl-4 pr-11 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-shadow"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-green-400 text-[#031083] h-8 w-8 rounded-full flex items-center justify-center hover:bg-green-300 transition-colors"
              >
                {subscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 font-bold mt-2">Thanks — you're on the list.</p>
            )}
          </div>
        </div>

        {/* Bottom Section (Preserved from Ejada styles) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-white/80">
          <p>
            &copy; 2026EJADA SYSTEMS All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 uppercase tracking-wider">
            <a href="#" className="hover:text-green-400 transition-colors">Anti-Bribery and Corruption Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Whistleblowing Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Secure Usage Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
