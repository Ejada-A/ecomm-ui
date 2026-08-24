"use client";

import { useState } from 'react';

export default function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) {
        // Revert on failure
        setStatus(initialStatus);
      }
    } catch (err) {
      setStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'paid': return 'bg-badge-green text-success border-success/20';
      case 'pending': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'shipped': return 'bg-badge-blue text-primary border-primary/20';
      case 'delivered': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="relative inline-block w-32">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={loading}
        className={`appearance-none w-full px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer outline-none transition-colors ${getStatusColor(status)} ${loading ? 'opacity-50' : ''}`}
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}
