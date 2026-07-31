import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Map, Calendar, Newspaper, LogIn, Menu, X } from 'lucide-react';

const PublicLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinasi Wisata', href: '/#wisata', icon: <Map size={18} /> },
    { name: 'Kalender Acara', href: '/#kalender', icon: <Calendar size={18} /> },
    { name: 'Berita Desa', href: '/#berita', icon: <Newspaper size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <img src="/logo.png" alt="Logo Desa Bugbug" className="w-10 h-10 object-contain shadow-sm group-hover:scale-105 transition-transform" />
                <span className={`text-2xl font-extrabold tracking-tight ${isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white drop-shadow-md'}`}>
                  Desa Bugbug
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary-500 ${
                    isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white drop-shadow-md'
                  }`}
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'}`}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-4 rounded-xl text-base font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-gray-900 text-white border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo Desa Bugbug" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold">Desa Bugbug</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Website resmi Desa Wisata Bugbug, Karangasem, Bali. Pusat informasi pariwisata, budaya, dan pelayanan publik.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#wisata" className="hover:text-white transition-colors">Destinasi Wisata</a></li>
              <li><a href="/#kalender" className="hover:text-white transition-colors">Jadwal Acara</a></li>
              <li><a href="/#berita" className="hover:text-white transition-colors">Berita & Artikel</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Jl. Raya Bugbug, Karangasem, Bali</li>
              <li>Email: info@desabugbug.id</li>
              <li>Telepon: (0361) 1234567</li>
            </ul>
          </div>
        </div>
        <div className="bg-black py-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Pemerintah Desa Bugbug. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
