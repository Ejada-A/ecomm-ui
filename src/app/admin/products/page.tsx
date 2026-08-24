import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteProductAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  let products = [];

  try {
    const res = await fetch(`${productServiceUrl}/products`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      products = data.products;
    }
  } catch (err) {
    console.error('Failed to fetch admin products:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-text-main">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-primary text-surface px-6 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-subtle border-b border-border/50">
                <th className="px-6 py-4 text-sm font-bold text-text-main">Product</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Category</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Price</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Stock</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product: any) => (
                <tr key={product._id?.toString()} className="hover:bg-bg-subtle/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-bg-subtle border border-border/50" />
                    <span className="font-semibold text-text-main line-clamp-1">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {(product.categoryId as any)?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-text-main">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-badge-green text-success border border-success/20' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/products/${product._id}/edit`} className="text-text-muted hover:text-primary transition-colors p-2 bg-surface rounded-lg border border-border/50 shadow-sm block">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteProductAction.bind(null, product._id)}>
                        <button type="submit" className="text-text-muted hover:text-red-500 transition-colors p-2 bg-surface rounded-lg border border-border/50 shadow-sm">
                           <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-muted font-medium">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
