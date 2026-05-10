import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, Mail, Lock, User as UserIcon, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AuthModal() {
  const { isAuthModalOpen, toggleAuthModal, setUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        setUser(data.user);
        toast.success('Logged in successfully!');
        toggleAuthModal(false);
      } else {
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
            }
          }
        });
        if (error) throw error;
        setUser(data.user);
        toast.success('Account created! Please check your email to verify.');
        toggleAuthModal(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={() => toggleAuthModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-3 text-gray-400" size={18} />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50 focus:bg-white"
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              minLength={6}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50 focus:bg-white"
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs text-blue-700 hover:underline font-bold">
                Forgot password?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center py-3 bg-blue-700 text-white text-sm font-black rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-70 mt-2 shadow-sm uppercase tracking-wide"
          >
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-600 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-700 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
