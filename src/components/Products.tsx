import React from 'react';
import { useStore, Product as ProductType } from '../store/useStore';
import { useFetchProducts } from '../hooks/useFetchProducts';
import UrgencyTimer from './UrgencyTimer';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const addToCart = useStore(state => state.addToCart);
  
  const [activeMedia, setActiveMedia] = React.useState<number | 'video'>(0);

  React.useEffect(() => {
    setActiveMedia(0);
  }, [product.video_url]);

  const allImages = [product.image || 'https://via.placeholder.com/400x500?text=Perfume', ...(product.gallery || [])].filter(Boolean) as string[];

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
      className="group bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
    >
      <div className={`relative h-40 sm:h-48 rounded-lg mb-2 overflow-hidden ${activeMedia === 'video' ? 'bg-black' : 'bg-gray-100'}`}>
        {activeMedia === 'video' && product.video_url ? (
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
            src={allImages[activeMedia === 'video' ? 0 : (activeMedia as number)]} 
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

      {/* Gallery Thumbnails */}
      {(allImages.length > 1 || product.video_url) && (
        <div className="flex gap-2 mb-3 sm:mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {product.video_url && (
            <button 
              onClick={() => setActiveMedia('video')}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex-shrink-0 flex items-center justify-center bg-gray-900 text-white ${activeMedia === 'video' ? 'ring-2 ring-orange-500' : 'opacity-70 hover:opacity-100'}`}
            >
              ▶
            </button>
          )}
          {allImages.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveMedia(idx)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden flex-shrink-0 ${activeMedia === idx ? 'ring-2 ring-orange-500' : 'opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col flex-1 mt-2">
        <h3 className="text-sm sm:text-base font-black text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-3 sm:mb-4 gap-1">
          <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1 sm:max-w-[60%]">{product.description}</p>
          <span className="text-blue-700 font-black text-sm sm:text-base whitespace-nowrap">₦{product.price.toLocaleString()}</span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="mt-auto w-full py-2 bg-blue-700 text-white text-[10px] sm:text-xs font-bold rounded hover:bg-orange-500 transition-colors"
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

        <div className="p-4 md:p-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6 bg-gray-50">
        {products.length === 0 && loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-700" size={40} />
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-20 text-gray-500">
            No products available at the moment.
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
