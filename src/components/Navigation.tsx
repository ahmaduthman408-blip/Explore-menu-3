import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cart = useStore(state => state.cart);
  const user = useStore(state => state.user);
  const toggleCart = useStore(state => state.toggleCart);
  const toggleAuthModal = useStore(state => state.toggleAuthModal);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [siteName, setSiteName] = useState('EXPLORE MENU');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Config logic
    const loadConfig = () => {
      setSiteName(localStorage.getItem('siteName') || 'EXPLORE MENU');
    };
    loadConfig();
    window.addEventListener('settingsUpdated', loadConfig);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('settingsUpdated', loadConfig);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 bg-white border-b border-gray-100 shadow-sm w-full">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">{siteName.charAt(0)}</div>
        <Link to="/" className="text-xl font-black tracking-tighter text-blue-900 uppercase">
          {siteName}
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            to={link.href}
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <div 
          onClick={toggleCart}
          className="relative cursor-pointer hover:scale-105 transition-transform mr-2"
        >
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
          <ShoppingCart className="w-6 h-6 text-gray-900" />
        </div>

        {user ? (
          <button onClick={handleLogout} className="px-4 py-1.5 bg-gray-100 text-gray-900 text-xs font-bold rounded-full hover:bg-gray-200 transition-all">
            Logout
          </button>
        ) : (
          <button 
            onClick={() => toggleAuthModal(true)}
            className="px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            Login
          </button>
        )}

        <Link to="/admin" className="flex px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full hover:bg-orange-600 hover:shadow-lg transition-all">
          Admin
        </Link>

        <button 
          className="md:hidden text-gray-900 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col space-y-4 px-6 border-t border-gray-100 pb-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href}
              className="text-gray-800 text-lg font-bold py-2 hover:text-blue-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
