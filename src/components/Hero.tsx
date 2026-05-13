import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="p-8 md:p-10 flex flex-col justify-between min-h-full">
      <div className="relative z-10 w-full flex flex-col items-start mt-8 md:mt-12 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-block px-3 py-1 mb-4 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Luxury Collection {new Date().getFullYear()}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-blue-900 leading-tight mb-4 text-balance">
            Discover Luxury <br/><span className="text-orange-500">Fragrances</span> That Define You
          </h1>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed max-w-sm">
            Affordable, long-lasting perfumes for every personality. Crafted for excellence, designed for distinction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <Link 
              to="/products" 
              className="flex-1 sm:flex-none px-8 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-xl hover:bg-blue-800 transition-all active:scale-95 text-center"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="flex-1 sm:flex-none px-8 py-3 border-2 border-blue-200 text-blue-700 font-bold rounded-lg hover:bg-white transition-all text-center"
            >
              Collection
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="grid grid-cols-3 gap-4 border-t border-blue-200 pt-8 w-full mt-auto"
      >
        <div className="text-center">
          <div className="text-blue-700 font-bold text-lg mb-1">⚡</div>
          <p className="text-[10px] font-bold text-blue-900">Fast Delivery</p>
        </div>
        <div className="text-center">
          <div className="text-blue-700 font-bold text-lg mb-1">✨</div>
          <p className="text-[10px] font-bold text-blue-900">Authentic Only</p>
        </div>
        <div className="text-center">
          <div className="text-blue-700 font-bold text-lg mb-1">🔒</div>
          <p className="text-[10px] font-bold text-blue-900">Secure Pay</p>
        </div>
      </motion.div>
    </section>
  );
}
