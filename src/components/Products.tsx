import React from 'react';
import { useStore, Product as ProductType } from '../store/useStore';
import { useFetchProducts } from '../hooks/useFetchProducts';
import UrgencyTimer from './UrgencyTimer';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const addToCart = useStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Check if user pasted an entire iframe tag
    if (url.includes('<iframe')) {
      const match = url.match(/src="([^"]+)"/);
      if (match) {
        url = match[1];
      }
    }
    
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      try {
        videoId = new URL(url).searchParams.get('v') || '';
      } catch (e) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      }
    } else if (url.includes('youtu.be/')) {
      try {
        videoId = new URL(url).pathname.substring(1);
      } catch (e) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
    } else if (url.includes('youtube.com/shorts/')) {
      try {
        const parts = new URL(url).pathname.split('/');
        videoId = parts[parts.length - 1] || '';
      } catch (e) {
        videoId = url.split('shorts/')[1]?.split('?')[0] || '';
      }
    }
    
    // If it's already an embed URL, make sure we just return it
    if (url.includes('youtube.com/embed/')) {
       return url;
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
    >
      <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {product.video_url ? (
          <iframe 
            src={getEmbedUrl(product.video_url)} 
            title={product.name}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <img 
            src={product.image || 'https://via.placeholder.com/400x500?text=Perfume'} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-500 ease-out mix-blend-multiply opacity-90"
          />
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 pointer-events-none">
          {product.urgency_minutes && (
            <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              <UrgencyTimer minutes={product.urgency_minutes} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 mt-2">
        <h3 className="font-black text-gray-900 mb-1">{product.name}</h3>
        <div className="flex justify-between items-end mb-4">
          <p className="text-xs text-gray-500 line-clamp-1 max-w-[60%]">{product.description}</p>
          <span className="text-blue-700 font-black whitespace-nowrap">₦{product.price.toLocaleString()}</span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="mt-auto w-full py-2 bg-blue-700 text-white text-xs font-bold rounded hover:bg-orange-500 transition-colors"
        >
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { loading } = useFetchProducts();
  const products = useStore(state => state.products);

  return (
    <section id="products" className="flex flex-col border-b border-gray-100">
      <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border-b border-gray-200 sticky top-0 z-10 gap-4">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">
          Exclusive Selection
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-orange-100">
            🔥 Flash Sale Ongoing
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 bg-gray-50">
        {loading && products.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-700" size={40} />
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
