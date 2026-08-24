'use server';

import { revalidatePath } from 'next/cache';

const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';

export async function createProductAction(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    stock: parseInt(formData.get('stock') as string, 10),
    imageUrl: formData.get('imageUrl') as string,
    categoryId: formData.get('categoryId') as string || null,
  };

  const res = await fetch(`${productServiceUrl}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create product via service');
  }

  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateProductAction(id: string, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    stock: parseInt(formData.get('stock') as string, 10),
    imageUrl: formData.get('imageUrl') as string,
    categoryId: formData.get('categoryId') as string || null,
  };

  const res = await fetch(`${productServiceUrl}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update product via service');
  }

  revalidatePath('/admin/products');
  return { success: true };
}

export async function deleteProductAction(id: string) {
  const res = await fetch(`${productServiceUrl}/products/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete product via service');
  }

  revalidatePath('/admin/products');
}
