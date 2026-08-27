"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getUserData } from '@/actions/auth';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const user = await getUserData();
      if (user) {
        const nameParts = (user.name || '').split(' ');
        setFormData(prev => ({
          ...prev,
          firstName: prev.firstName || nameParts[0] || '',
          lastName: prev.lastName || nameParts.slice(1).join(' ') || '',
          email: prev.email || user.email || '',
          address: prev.address || user.address || '',
        }));
      }
    }
    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          shippingAddress: formData.address,
          items: items,
        }),
      });

      const data = await res.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to initialize payment');
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black tracking-tight text-text-main">Secure Checkout</h1>
        </div>

        <div className="bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h3 className="text-2xl font-bold text-text-main mb-2">Shipping Information</h3>
            <p className="text-text-muted mb-8">Please provide your details to ensure smooth delivery.</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-text-main mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-bg-subtle border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-text-main mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-bg-subtle border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-text-main mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bg-subtle border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-bold text-text-main mb-2">Full Address</label>
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-bg-subtle border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-main"
                  placeholder="123 Premium St, Suite 100, City, Country"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col text-left">
                   <p className="text-text-muted font-medium">Total to pay:</p>
                   <p className="text-2xl font-black text-text-main">${totalPrice.toFixed(2)}</p>
                </div>
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg shadow-primary/20 text-surface bg-primary hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? 'Processing...' : 'Confirm & Pay'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}
