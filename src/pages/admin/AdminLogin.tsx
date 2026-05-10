import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple fixed password check as requested, normally this would be an API call
    // The user requested default password: "Abu Nasir", and also functionality to change it.
    // I'll check local storage first in case they changed it, else fallback to default.
    const storedPassword = localStorage.getItem('adminPassword') || 'Abu Nasir';

    setTimeout(() => {
      if (password === storedPassword) {
        onLogin();
        // Clear any old sessionStorage variable just in case
        sessionStorage.removeItem('isAdminAuthenticated'); 
        navigate('/admin');
        toast.success('Welcome back, Admin!');
      } else {
        toast.error('Invalid admin credentials.');
      }
      setLoading(false);
    }, 600); // simulate network delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">E</div>
        </div>
        <h2 className="text-2xl font-black text-center text-gray-900 mb-2">Admin Portal</h2>
        <p className="text-center text-sm text-gray-500 mb-8 font-medium">Please sign in to access the dashboard.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
             <input 
               type="password" 
               required 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" 
               placeholder="Admin Password" 
             />
          </div>
          <button 
            type="submit" 
            disabled={loading || !password}
            className="w-full bg-blue-700 hover:bg-orange-500 text-white font-black py-3.5 rounded-xl transition-all disabled:opacity-70 shadow-lg"
          >
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
