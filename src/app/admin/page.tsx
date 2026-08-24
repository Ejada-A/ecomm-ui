import { ShoppingBag, Users, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-main">Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-surface p-6 rounded-3xl border border-border/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-text-muted font-medium mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-text-main">$45,231.89</h3>
          </div>
          <div className="w-12 h-12 bg-badge-green text-success rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-text-muted font-medium mb-1">Total Orders</p>
            <h3 className="text-3xl font-black text-text-main">356</h3>
          </div>
          <div className="w-12 h-12 bg-badge-blue text-primary rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-text-muted font-medium mb-1">Active Customers</p>
            <h3 className="text-3xl font-black text-text-main">2,301</h3>
          </div>
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-text-muted font-medium mb-1">Store Conversion</p>
            <h3 className="text-3xl font-black text-text-main">3.4%</h3>
          </div>
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>
    </div>
  );
}
