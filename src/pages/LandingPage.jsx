import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DestinationStorage, ArticleStorage, EventStorage } from '../storage/crud';
import DigitalCalendar from '../components/DigitalCalendar';
import GlobalSkeleton from '../components/GlobalSkeleton';
import { MapPin, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Simulate network delay for smooth skeleton transition
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const allDestinations = await DestinationStorage.getAll();
      setDestinations(allDestinations.filter(d => d.status === 'Buka' || d.status === 'Renovasi'));
      
      const allArticles = await ArticleStorage.getAll();
      setArticles(allArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3));
      
      const allEvents = await EventStorage.getAll();
      setEvents(allEvents);
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative text-white py-32 px-4 md:py-48 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format,compress&q=60" 
          alt="Desa Bugbug Scenery" 
          className="absolute inset-0 w-full h-full object-cover bg-gray-900" 
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Pesona <span className="text-primary-200">Desa Bugbug</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10">
            Jelajahi keindahan alam, budaya yang kaya, dan keramahan penduduk kami. Temukan pengalaman tak terlupakan di Desa Bugbug.
          </p>
          <a href="#wisata" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-full hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Jelajahi Wisata <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Wisata Section */}
      <section id="wisata" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Destinasi Populer</h2>
            <p className="text-gray-600">Tempat wisata terbaik yang wajib Anda kunjungi.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <GlobalSkeleton type="card" count={3} />
          ) : destinations.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100">Belum ada data destinasi wisata.</p>
          ) : (
            destinations.map(wisata => (
              <Link to={`/wisata/${wisata.id}`} key={wisata.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {wisata.galleries && wisata.galleries.length > 0 ? (
                    <img src={wisata.galleries[0].url} alt={wisata.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Tak ada gambar</div>
                  )}
                  <div className="absolute top-4 left-4">
                     <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm backdrop-blur-md ${wisata.status === 'Buka' ? 'bg-white/90 text-emerald-600' : 'bg-amber-500/90 text-white'}`}>
                        {wisata.status}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{wisata.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{wisata.description}</p>
                  <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 mt-auto">
                    <span className="font-semibold text-primary-600">{wisata.harga_tiket || 'Gratis'}</span>
                    <span className="flex items-center text-gray-500 gap-1"><MapPin size={16}/> Lihat Detail</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Digital Calendar Section */}
      <section id="kalender" className="bg-white py-20 px-4 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kalender Acara Desa</h2>
            <p className="text-gray-600 text-lg">Ikuti terus perkembangan acara dan perayaan budaya di desa kami.</p>
          </div>
          
          <DigitalCalendar events={events} />
        </div>
      </section>

      {/* Artikel Berita */}
      <section id="berita" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Berita Terbaru</h2>
          <p className="text-gray-600">Informasi dan kabar terkini dari pengelola desa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <GlobalSkeleton type="card" count={3} />
          ) : articles.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">Belum ada berita terbaru.</p>
          ) : (
            articles.map(artikel => (
              <Link to={`/berita/${artikel.id}`} key={artikel.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                {artikel.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img src={artikel.image_url} alt={artikel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-medium text-primary-600 mb-2">
                    {new Date(artikel.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors">{artikel.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{artikel.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium border-t border-gray-100 pt-3 mt-auto">
                    <span>Oleh: {artikel.author}</span>
                    <span className="text-primary-600 flex items-center gap-1">Baca Selengkapnya &rarr;</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Peta Lokasi Desa Bugbug */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Kunjungi Desa Bugbug</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Terletak di Kabupaten Karangasem, Bali Timur, Desa Bugbug dapat ditempuh sekitar 1,5 hingga 2 jam perjalanan dari Bandara Internasional Ngurah Rai. Kami tunggu kedatangan Anda!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-primary-400">
                  <MapPin size={20} />
                </div>
                <span>Bugbug, Karangasem, Bali 80851</span>
              </div>
            </div>
          </div>
          <div className="h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31575.244304859847!2d115.5861113!3d-8.4900894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd206e1088d8b67%3A0x5030bfbca7d0ba0!2sBugbug%2C%20Kec.%20Karangasem%2C%20Kabupaten%20Karangasem%2C%20Bali!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
