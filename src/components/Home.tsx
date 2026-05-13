import React from 'react';
import { useStore } from '../store/useStore';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Loader2, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { ProductCard } from './Products';
import { Link } from 'react-router-dom';

export default function Home() {
  const { loading } = useFetchProducts();
  const products = useStore(state => state.products);

  const displayProducts = products.slice(0, 4);

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

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
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

      {/* Fragrance Categories */}
      <section className="bg-gray-100 p-8 md:p-12 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-widest text-blue-900 mb-12">Discover Your Signature</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="h-48 bg-orange-100 flex items-center justify-center p-6 text-center">
              <span className="text-4xl">🌲</span>
            </div>
            <div className="p-6 text-center border-t border-gray-50">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Woody & Earthy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Deep, warm, and sophisticated. Perfect for evening wear and making bold statements.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="h-48 bg-blue-50 flex items-center justify-center p-6 text-center">
              <span className="text-4xl">🌊</span>
            </div>
            <div className="p-6 text-center border-t border-gray-50">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Fresh & Aquatic</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Crisp, clean, and energizing. Ideal for daily use, office environments, and hot days.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="h-48 bg-pink-50 flex items-center justify-center p-6 text-center">
              <span className="text-4xl">🌸</span>
            </div>
            <div className="p-6 text-center border-t border-gray-50">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Floral</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Romantic, delicate, and classic. The timeless choice for elegance and grace.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="h-48 bg-purple-50 flex items-center justify-center p-6 text-center">
              <span className="text-4xl">✨</span>
            </div>
            <div className="p-6 text-center border-t border-gray-50">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Oriental & Spicy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Exotic, sensual, and rich. A passionate blend of spices and resins for an unforgettable aura.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner 2 */}
      <section className="bg-orange-500 text-white p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-900 opacity-20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight relative z-10">The Science of Scent</h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium opacity-90 relative z-10 mb-8">
          A great fragrance is invisible body armor. We formulate our products with a 25% oil concentration to ensure you smell as good at 8 PM as you did at 8 AM.
        </p>
        <Link to="/about" className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-full uppercase text-sm tracking-widest hover:shadow-xl transition-all hover:bg-gray-50 relative z-10">
          Read Our Story
        </Link>
      </section>

      {/* Customer Reviews */}
      <section className="p-8 md:p-16 bg-white">
        <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-widest text-blue-900 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-2xl relative">
            <span className="text-5xl text-blue-200 absolute top-4 left-4 font-serif">"</span>
            <p className="text-gray-700 italic relative z-10 mb-6 mt-4">
              I've bought luxury perfumes my whole life, but the collection from Explore Menu completely blew me away. The longevity is absolutely insane. I get compliments everywhere I go.
            </p>
            <div className="flex items-center mt-6 border-t border-blue-100 pt-4">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-800 mr-3">A</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Aisha T.</p>
                <div className="flex text-orange-500 text-xs">★★★★★</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl relative">
            <span className="text-5xl text-gray-200 absolute top-4 left-4 font-serif">"</span>
            <p className="text-gray-700 italic relative z-10 mb-6 mt-4">
              The delivery was remarkably fast, and the packaging is so premium it feels like unboxing a jewel. The scent 'Oud Majesty' is my new daily signature.
            </p>
            <div className="flex items-center mt-6 border-t border-gray-200 pt-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-800 mr-3">D</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">David O.</p>
                <div className="flex text-orange-500 text-xs">★★★★★</div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-8 rounded-2xl relative">
            <span className="text-5xl text-orange-200 absolute top-4 left-4 font-serif">"</span>
            <p className="text-gray-700 italic relative z-10 mb-6 mt-4">
              Incredible value for the money. You would easily pay triple for this kind of quality at a department store. I'm already on my third bottle and I'm not looking back.
            </p>
            <div className="flex items-center mt-6 border-t border-orange-100 pt-4">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-800 mr-3">S</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Samuel E.</p>
                <div className="flex text-orange-500 text-xs">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended FAQ */}
      <section className="bg-gray-100 p-8 md:p-16 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-widest text-blue-900 mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">How long does shipping take?</h4>
            <p className="text-sm text-gray-600">We typically process orders within 24 hours. Standard shipping takes 2-3 business days within major cities, and up to 5 days for outer regions.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Are your perfumes oil-based or alcohol-based?</h4>
            <p className="text-sm text-gray-600">Our perfumes use a premium cosmetic-grade alcohol base mixed with an exceptionally high concentration of essential fragrance oils (Extrait de Parfum level) to ensure maximum projection and longevity.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Do you accept returns?</h4>
            <p className="text-sm text-gray-600">Due to the nature of hygiene and cosmetic products, we cannot accept returns on opened perfumes. However, if your order arrives damaged or incorrect, please reach out to our support team within 48 hours.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">How can I track my order?</h4>
            <p className="text-sm text-gray-600">Once your order is dispatched, you will receive a tracking number via email and SMS. You can input this number on our 'Track Order' page to see real-time updates.</p>
          </div>
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
