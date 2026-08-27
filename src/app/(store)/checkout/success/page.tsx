"use client";

import { useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const hasProcessedRef = useRef(false);
  
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (hasProcessedRef.current) return;
    
    if (sessionId) {
      hasProcessedRef.current = true;
      clearCart();
      
      // The backend (/api/orders/confirm) verifies this session with Stripe
      // before marking the order as paid.
      fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, sessionId })
      }).catch(console.error);
    } else {
      // If someone just types /checkout/success manually, redirect them
      router.push('/');
    }
  }, [sessionId, orderId, clearCart, router]);

  if (!sessionId) return null;

  return (
    <div className="bg-bg-subtle min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="bg-surface p-12 rounded-3xl border border-border/50 text-center shadow-lg max-w-lg w-full mx-4">
        <div className="w-20 h-20 bg-badge-green text-success rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-text-main mb-4">Payment Successful!</h1>
        <p className="text-text-muted mb-8 text-lg">
          Thank you for your premium purchase. Your order <span className="font-mono bg-bg-subtle px-2 py-1 rounded text-sm">{orderId?.slice(-6)}</span> is being processed.
        </p>
        <Link 
          href="/" 
          className="inline-flex w-full justify-center px-8 py-4 bg-primary text-surface font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-subtle flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
