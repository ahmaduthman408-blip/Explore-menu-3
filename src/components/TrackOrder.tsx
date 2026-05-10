import React, { useState } from 'react';
import { Package, Search, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setOrderInfo(null);
    
    // Simulate lookup for dummy data OR try real db
    setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (data) {
          setOrderInfo(data);
          toast.success('Order found!');
        } else {
          // Check if it's our dummy order ORD-001 or ORD-002
          if (orderId === 'ORD-001') {
            setOrderInfo({ id: 'ORD-001', status: 'pending', total: 45000, created_at: new Date().toISOString() });
          } else if (orderId === 'ORD-002') {
            setOrderInfo({ id: 'ORD-002', status: 'delivered', total: 120000, created_at: new Date().toISOString() });
          } else {
            toast.error('Order not found. Please check your order ID.');
          }
        }
      } catch (err) {
        // Fallback for dummy
        if (orderId === 'ORD-001') {
          setOrderInfo({ id: 'ORD-001', status: 'pending', total: 45000, created_at: new Date().toISOString() });
        } else if (orderId === 'ORD-002') {
          setOrderInfo({ id: 'ORD-002', status: 'delivered', total: 120000, created_at: new Date().toISOString() });
        } else {
          toast.error('Order not found. Please check your order ID.');
        }
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-12 h-12 text-orange-500 mb-4" />;
      case 'delivered': return <CheckCircle className="w-12 h-12 text-green-500 mb-4" />;
      case 'cancelled': return <XCircle className="w-12 h-12 text-red-500 mb-4" />;
      default: return <Truck className="w-12 h-12 text-blue-500 mb-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Processing';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return 'In Transit';
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-20 px-6 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center">
            <Package size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2 tracking-tight">Track Your Order</h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Enter your Order ID below to check the real-time status of your delivery.
        </p>

        <form onSubmit={handleTrack} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD-001"
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 transition-all font-bold"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !orderId}
            className="w-full bg-blue-700 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all shadow-lg disabled:opacity-70 disabled:hover:bg-blue-700"
          >
            {loading ? 'Searching...' : 'Track Package'}
          </button>
        </form>

        {orderInfo && (
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
            {getStatusIcon(orderInfo.status)}
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-widest mb-1">
              {getStatusText(orderInfo.status)}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">Order ID: {orderInfo.id}</p>
            
            <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-bold text-gray-500">Date Placed</span>
                <span className="text-sm font-bold tracking-tight text-gray-900">{new Date(orderInfo.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-bold text-gray-500">Total Amount</span>
                <span className="text-sm font-black text-gray-900">₦{orderInfo.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
