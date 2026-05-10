/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import TrackOrder from './components/TrackOrder';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ExitPopup from './components/ExitPopup';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { useStore } from './store/useStore';
import AdminLayout from './pages/admin/AdminLayout';

function MainLayout() {
  const [siteName, setSiteName] = useState('EXPLORE MENU');

  useEffect(() => {
    const loadConfig = () => {
      setSiteName(localStorage.getItem('siteName') || 'EXPLORE MENU');
    };
    loadConfig();
    window.addEventListener('settingsUpdated', loadConfig);
    return () => window.removeEventListener('settingsUpdated', loadConfig);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900 font-sans overflow-hidden selection:bg-orange-500 selection:text-white">
      <Navigation />
      
      <main id="main-content-area" className="flex-1 flex flex-col md:flex-row md:overflow-hidden overflow-y-auto">
        {/* Left Sidebar (Hero) */}
        <div className="w-full md:w-[35%] bg-blue-50 md:border-r border-blue-100 md:overflow-y-auto flex flex-col shrink-0">
          <Hero />
        </div>
        
        {/* Right Content */}
        <div id="right-content-scroll" className="w-full md:flex-1 min-h-screen md:min-h-0 md:overflow-y-auto flex flex-col bg-gray-50 flex-grow relative scroll-smooth">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track-order" element={<TrackOrder />} />
          </Routes>
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-400 font-bold tracking-wider">
              <p>&copy; {new Date().getFullYear()} {siteName}. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>
        </div>
      </main>
      
      {/* Dynamic Overlays & Components */}
      <Cart />
      <AuthModal />
      <FloatingWhatsApp />
      <ExitPopup />
    </div>
  );
}

export default function App() {
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    // Check active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </>
  );
}
