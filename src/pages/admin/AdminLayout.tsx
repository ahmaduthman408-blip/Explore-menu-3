import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, MessageSquare, Users, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminCustomers from './AdminCustomers';
import AdminReviews from './AdminReviews';
import AdminSettings from './AdminSettings';
import AdminLogin from './AdminLogin';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check locally if admin is authenticated (simple persistence for this demo)
    const isAdmin = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    setIsAdminAuthenticated(isAdmin);
    if (!isAdmin && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [location, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  if (!isAdminAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />} />
        <Route path="*" element={<AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-100/50 text-gray-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-50 flex flex-col transition-transform duration-300 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center justify-center gap-2">
             <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">E</div>
            <span className="font-black tracking-tight text-blue-900">ADMIN</span>
          </Link>
          <button className="md:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link 
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors mb-4"
          >
            ← Exit to Website
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between md:hidden shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs">E</div>
            <span className="font-black tracking-tight text-blue-900 text-sm">ADMIN</span>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(true)} className="p-1 text-gray-600">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/customers" element={<AdminCustomers />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/analytics" element={<AdminDashboard />} /> {/* Fallback to dashboard which has analytics */}
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<div className="flex items-center justify-center h-64 text-gray-400 font-bold uppercase tracking-widest text-sm">Component Under Construction</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
