import React from 'react';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  let product = null;

  try {
    const res = await fetch(`${productServiceUrl}/products/${resolvedParams.id}`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      product = data.product;
    }
  } catch (err) {
    console.error('Failed to fetch product for editing:', err);
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-text-main">Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
