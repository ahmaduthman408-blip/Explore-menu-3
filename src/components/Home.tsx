import React from 'react';
import { useStore } from '../store/useStore';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Loader2, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { ProductCard } from './Products';
import { Link } from 'react-router-dom';

export default function Home() {
  const { loading } = useFetchProducts();
  const products = useStore(state => state.products);

  const displayProducts = products.slice(0, 2);

  return (
    <div className="flex flex-col flex-1">
      {/* Welcome Banner */}
      <div className="bg-blue-900 text-white p-8 md:p-12 border-b-4 border-orange-500">
        <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">Premium Scents, Exclusive Lifestyle.</h1>
        <p className="text-blue-100 max-w-xl text-lg opacity-90 mb-6">Discover our curated collection of exotic perfumes and luxury items. Experience elegance with every spray.</p>
      </div>

      {/* Featured Products */}
      <section className="p-6 md:p-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Featured Items</h2>
          <Link to="/products" className="text-blue-700 text-sm font-bold flex items-center hover:text-orange-500 transition-colors">
            VIEW ALL <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading && products.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-700" size={40} />
            </div>
          ) : (
            displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 mt-auto pb-24 md:pb-8">
        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">100% Authentic</h3>
          <p className="text-sm text-gray-500">We guarantee the authenticity of every product we sell. Sourced directly from manufacturers.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
            <Truck size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-sm text-gray-500">Get your orders delivered to your doorstep swiftly with our reliable logistics partners.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
          <p className="text-sm text-gray-500">Our customer service team is always available to assist you with any inquiries.</p>
        </div>
      </section>
    </div>
  );
}
