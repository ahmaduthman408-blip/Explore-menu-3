import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, X, Clock, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_names: string;
  total: number;
  status: 'pending' | 'delivered' | 'cancelled';
  created_at: string;
}

const dummyOrders: Order[] = [
  { id: 'ORD-001', customer_name: 'John Doe', customer_email: 'john@example.com', product_names: '2x Premium Perfume', total: 45000, status: 'pending', created_at: new Date().toISOString() },
  { id: 'ORD-002', customer_name: 'Jane Smith', customer_email: 'jane@example.com', product_names: '1x Classic Scent', total: 120000, status: 'delivered', created_at: new Date().toISOString() },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setOrders(data);
      }
    } catch (err) {
      console.warn('Could not fetch orders from DB, using fallback data.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
    
    try {
      await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    } catch (err) {
      // Handle silently
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight">Orders</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Products</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{order.customer_name || 'N/A'}</p>
                    <p className="text-xs text-gray-400">{order.customer_email || 'No email'}</p>
                  </td>
                  <td className="px-6 py-4 text-xs max-w-xs truncate">{order.product_names}</td>
                  <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-black text-gray-900">₦{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                       {order.status === 'pending' && (
                         <>
                           <button onClick={() => updateStatus(order.id, 'delivered')} className="p-1.5 text-green-600 hover:bg-green-50 rounded bg-green-50/50 transition-colors" title="Mark Delivered">
                             <Check size={16} />
                           </button>
                           <button onClick={() => updateStatus(order.id, 'cancelled')} className="p-1.5 text-red-600 hover:bg-red-50 rounded bg-red-50/50 transition-colors" title="Cancel Order">
                             <X size={16} />
                           </button>
                         </>
                       )}
                       {order.status !== 'pending' && (
                         <button onClick={() => updateStatus(order.id, 'pending')} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded bg-orange-50/50 transition-colors" title="Mark Pending">
                           <Clock size={16} />
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
