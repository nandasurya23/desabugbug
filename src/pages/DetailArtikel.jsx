import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArticleStorage } from '../storage/crud';
import { ArrowLeft, User, Calendar as CalendarIcon, Share2, ChevronRight } from 'lucide-react';

const DetailArtikel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [beritaLainnya, setBeritaLainnya] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = ArticleStorage.getById(id);
    if (!data) {
      navigate('/404');
      return;
    }
    setArtikel(data);
    
    // Ambil berita lainnya (selain berita ini) maksimal 4
    const others = ArticleStorage.getAll()
      .filter(a => a.id !== id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
    setBeritaLainnya(others);
    
    setIsLoading(false);
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artikel.title,
        text: 'Baca berita Desa Bugbug ini!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan disalin ke clipboard!");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Navbar Minimalis Khusus Detail */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary-600 font-medium transition-colors">Beranda</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link to="/#berita" className="text-gray-500 hover:text-primary-600 font-medium transition-colors">Berita</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-800 font-semibold truncate max-w-[200px] md:max-w-md">{artikel.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* KOLOM UTAMA (Artikel) */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {artikel.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <User size={16} className="text-primary-600" />
                <span className="font-medium text-gray-700">{artikel.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} className="text-gray-400" />
                <span>{new Date(artikel.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {artikel.image_url && (
              <div className="mb-10 rounded-3xl overflow-hidden shadow-sm bg-gray-100">
                <img src={artikel.image_url} alt={artikel.title} className="w-full h-auto max-h-[600px] object-cover" loading="lazy" decoding="async"/>
              </div>
            )}
            
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
              {artikel.content}
            </div>
            
            {/* Share Bottom */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Bagikan Berita Ini</h3>
                <p className="text-gray-500 text-sm">Bantu sebarkan informasi kepada warga lainnya.</p>
              </div>
              <button onClick={handleShare} className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30">
                <Share2 size={20} />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          {/* KOLOM SIDEBAR (Berita Lainnya) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary-600 rounded-full"></span>
                Berita Lainnya
              </h3>
              
              <div className="space-y-6">
                {beritaLainnya.length > 0 ? (
                  beritaLainnya.map(item => (
                    <Link to={`/berita/${item.id}`} key={item.id} className="group flex gap-4 items-start bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      {item.image_url ? (
                        <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"/>
                        </div>
                      ) : (
                        <div className="w-24 h-24 flex-shrink-0 rounded-xl bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-xs text-primary-600 font-semibold mb-1">
                          {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:text-primary-600 transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm p-4 bg-gray-100 rounded-xl">Belum ada berita lainnya.</p>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DetailArtikel;
