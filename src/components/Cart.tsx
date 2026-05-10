import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { X, Minus, Plus, ShoppingBag, CreditCard, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

// Types for Paystack
declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function Cart() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart, user, toggleAuthModal } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '' });

  // Load user data if logged in
  useEffect(() => {
    if (user?.user_metadata) {
      setFormData(prev => ({
        ...prev,
        fullName: user.user_metadata.full_name || prev.fullName,
        phone: user.user_metadata.phone || prev.phone
      }));
    }
  }, [user]);

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to continue checkout');
      toggleCart();
      toggleAuthModal(true);
      return;
    }
    
    if (!formData.fullName || !formData.phone) {
      toast.error('Please fill in your name and phone number');
      return;
    }

    setIsCheckingOut(true);

    const handler = window.PaystackPop.setup({
      key: 'pk_live_e5b70f1b56437bb00b89ba158b1958a2d6176214',
      email: user.email,
      amount: totalAmount * 100, // in kobo
      currency: 'NGN',
      ref: `EXP_MENU_${Math.floor((Math.random() * 1000000000) + 1)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: formData.fullName
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: formData.phone
          }
        ]
      },
      callback: async function (response: any) {
        setIsCheckingOut(false);
        toast.success("Payment successful! Redirecting to WhatsApp...");
        
        // Save order to Supabase
        try {
          const productNames = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
          
          await supabase.from('orders').insert({
            product_names: productNames,
            total: totalAmount,
            customer_email: user.email,
            customer_name: formData.fullName,
            status: 'pending'
          });
        } catch (e) {
          console.error("Error saving order", e);
        }

        clearCart();
        toggleCart();

        // Redirect to WhatsApp
        const productText = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
        const waText = encodeURIComponent(`I just paid for ${productText}. Reference: ${response.reference}`);
        window.location.href = `https://wa.me/2349135670770?text=${waText}`;
      },
      onClose: function () {
        setIsCheckingOut(false);
        toast.error("Payment cancelled");
      }
    });
    
    handler.openIframe();
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity"
        onClick={toggleCart}
      />
      
      <div className="fixed inset-y-0 right-0 w-full md:w-80 bg-white shadow-2xl z-[60] flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-gray-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="text-lg font-black text-gray-900">Shopping Cart</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-bold">{totalItems} ITEMS</span>
            <button onClick={toggleCart} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-sm font-bold">Your cart is empty.</p>
              <button 
                onClick={toggleCart}
                className="text-blue-700 text-xs font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 items-center pb-4 border-b border-gray-50">
                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900">{item.name}</p>
                  <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-xs font-black text-blue-700">₦{(item.price * item.quantity).toLocaleString()}</p>
                  <div className="flex items-center gap-1 border border-gray-200 rounded px-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-black py-0.5"><Minus size={10} /></button>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black py-0.5"><Plus size={10} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="bg-orange-50 p-4 rounded-xl mb-6 border border-orange-100">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-orange-900 font-bold">Subtotal</span>
                <span className="text-xs font-black text-gray-900">₦{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-xs text-orange-900 font-bold">Delivery</span>
                <span className="text-xs font-black text-green-600">FREE</span>
              </div>
              <div className="flex justify-between border-t border-orange-200 pt-4">
                <span className="text-base font-black text-blue-900">TOTAL</span>
                <span className="text-base font-black text-blue-900">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] text-orange-600 font-bold uppercase text-center animate-pulse">
                ⚡ Secure this offer within 4:59
              </p>
              
              {user && (
                <>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </>
              )}

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-orange-500 text-white text-xs font-black rounded-xl hover:bg-orange-600 hover:scale-[1.02] transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isCheckingOut ? <Loader2 className="animate-spin w-4 h-4" /> : null}
                PAY NOW VIA PAYSTACK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
