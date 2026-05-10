import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const cart = useStore(state => state.cart);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show when cursor moves out of the top of the window
      if (e.clientY <= 0 && !hasShown && cart.length > 0) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, cart.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 relative">
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 bg-secondary-orange p-6 flex flex-col justify-center items-center text-white text-center">
            <span className="text-5xl mb-2">🎁</span>
            <h3 className="font-heading font-bold text-2xl mb-1">Wait!</h3>
            <p className="opacity-90 text-sm">Don't leave empty-handed</p>
          </div>
          
          <div className="w-full md:w-3/5 p-8 text-center flex flex-col justify-center items-center">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Claim 10% OFF</h4>
            <p className="text-gray-600 mb-6 text-sm">
              Complete your purchase now and get an exclusive discount on your order.
            </p>
            <button 
              onClick={() => {
                setIsVisible(false);
                useStore.setState({ isCartOpen: true });
              }}
              className="w-full bg-primary-blue hover:bg-blue-900 text-white font-bold py-3 rounded transition-colors"
            >
              Finish Checkout
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
            >
              No thanks, I'll pay full price later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
