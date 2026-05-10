import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default function AdminDashboard() {
  const products = useStore(state => state.products);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight">Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">₦420,500</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">156</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Products</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{products.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Customers</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">84</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
        <h3 className="text-lg font-black text-gray-900 mb-6">Sales Overview</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="sales" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
