import OrderStatusSelect from './OrderStatusSelect';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://localhost:5003';
  let orders = [];

  try {
    const res = await fetch(`${orderServiceUrl}/orders`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) {
      orders = data.orders;
    }
  } catch (err) {
    console.error('Failed to fetch admin orders:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-text-main">Orders Management</h1>
      </div>

      <div className="bg-surface rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-subtle border-b border-border/50">
                <th className="px-6 py-4 text-sm font-bold text-text-main">Order ID</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Customer</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Total</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Date</th>
                <th className="px-6 py-4 text-sm font-bold text-text-main">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {orders.map((order: any) => (
                <tr key={order._id.toString()} className="hover:bg-bg-subtle/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-text-muted">
                    {order._id.toString().slice(-6)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-text-main">{order.customerName}</div>
                    <div className="text-xs text-text-muted">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-text-main">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusSelect orderId={order._id.toString()} initialStatus={order.status} />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-muted font-medium">
                    No orders found yet.
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
