'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProductAction, updateProductAction } from '@/app/admin/products/actions';

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      if (isEditing) {
        await updateProductAction(initialData._id, formData);
      } else {
        await createProductAction(formData);
      }
      router.push('/admin/products');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-surface p-8 rounded-3xl border border-border/50 shadow-sm">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-text-main mb-2">Product Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          defaultValue={initialData?.name || ''} 
          required 
          className="w-full px-4 py-3 rounded-xl bg-bg-subtle border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-bold text-text-main mb-2">Description</label>
        <textarea 
          id="description" 
          name="description" 
          defaultValue={initialData?.description || ''} 
          required 
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-bg-subtle border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-bold text-text-main mb-2">Price ($)</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            step="0.01"
            min="0"
            defaultValue={initialData?.price || ''} 
            required 
            className="w-full px-4 py-3 rounded-xl bg-bg-subtle border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-bold text-text-main mb-2">Stock</label>
          <input 
            type="number" 
            id="stock" 
            name="stock"
            min="0" 
            defaultValue={initialData?.stock || 0} 
            required 
            className="w-full px-4 py-3 rounded-xl bg-bg-subtle border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
          />
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-bold text-text-main mb-2">Image URL</label>
        <input 
          type="url" 
          id="imageUrl" 
          name="imageUrl" 
          defaultValue={initialData?.imageUrl || ''} 
          required 
          className="w-full px-4 py-3 rounded-xl bg-bg-subtle border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
        />
      </div>

      <div className="pt-4 flex items-center justify-end gap-4">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl font-bold text-text-muted hover:bg-bg-subtle transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-primary text-surface px-8 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
        >
          {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Product')}
        </button>
      </div>
    </form>
  );
}
