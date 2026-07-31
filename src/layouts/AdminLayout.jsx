import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, MapPin, Newspaper, CalendarDays, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Beranda', path: '/admin', icon: LayoutDashboard, roles: ['superadmin', 'admin', 'writer', 'owner'] },
    { name: 'Kelola Wisata', path: '/admin/wisata', icon: MapPin, roles: ['superadmin', 'admin', 'owner'] },
    { name: 'Berita & Artikel', path: '/admin/artikel', icon: Newspaper, roles: ['superadmin', 'admin', 'writer'] },
    { name: 'Acara / Event', path: '/admin/event', icon: CalendarDays, roles: ['superadmin', 'admin'] },
    { name: 'Pengaturan Data', path: '/admin/pengaturan', icon: Settings, roles: ['superadmin'] },
  ];

  const visibleNavItems = navItems.filter(item => hasRole(item.roles));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden bg-white shadow-sm flex items-center justify-between p-4 z-20">
        <span className="text-xl font-bold text-primary-600">Dashboard</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 z-10 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <img src="/logo.png" alt="Logo Desa Bugbug" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold text-primary-600">Desa Bugbug</span>
        </div>
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-500">Selamat datang,</p>
          <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {visibleNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-primary-600' : 'text-gray-400'} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
