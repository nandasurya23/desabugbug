import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DestinationStorage } from '../storage/crud';
import { ArrowLeft, MapPin, Clock, CheckCircle, Image as ImageIcon } from 'lucide-react';

const DetailWisata = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wisata, setWisata] = useState(null);

  useEffect(() => {
    const data = DestinationStorage.getById(id);
    if (data) {
      setWisata(data);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!wisata) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Header Image */}
      <div className="relative h-[40vh] md:h-[60vh] bg-gray-900">
        {wisata.galleries && wisata.galleries.length > 0 ? (
          <img src={wisata.galleries[0].url} alt={wisata.name} className="w-full h-full object-cover opacity-60" loading="eager" fetchPriority="high" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 opacity-30">
             <ImageIcon size={64} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute top-6 left-6 z-10">
          <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
            <ArrowLeft size={20} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-7xl mx-auto">
           <div className="mb-4 flex gap-3">
             <span className={`px-4 py-1.5 text-sm font-bold rounded-full shadow-sm backdrop-blur-md ${wisata.status === 'Buka' ? 'bg-emerald-500/80' : 'bg-amber-500/80'}`}>
                {wisata.status}
             </span>
             {wisata.harga_tiket && (
                <span className="px-4 py-1.5 text-sm font-bold rounded-full shadow-sm backdrop-blur-md bg-white/20">
                  {wisata.harga_tiket}
                </span>
             )}
           </div>
           <h1 className="text-4xl md:text-6xl font-extrabold mb-2">{wisata.name}</h1>
           <div className="flex items-center gap-2 text-gray-300">
              <MapPin size={18} />
              <p>{wisata.contact?.address || 'Lokasi Tersembunyi'}</p>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          
          {wisata.map_iframe && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Lokasi di Peta</h2>
              <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {wisata.map_iframe.startsWith('<iframe') ? (
                  <div dangerouslySetInnerHTML={{ __html: wisata.map_iframe }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
                ) : (
                  <iframe src={wisata.map_iframe} className="w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe>
                )}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Tempat Ini</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{wisata.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fasilitas</h2>
            {wisata.facilities && wisata.facilities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wisata.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                    <span className="text-gray-800 font-medium">{fac.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Belum ada informasi fasilitas.</p>
            )}
          </section>

          {/* Galeri Lengkap */}
          {wisata.galleries && wisata.galleries.length > 1 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri Foto</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wisata.galleries.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <img src={img.url} alt={`Gallery ${idx+1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Jam Buka */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-primary-600" /> Jam Buka
            </h3>
            <ul className="space-y-4">
              {['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((day) => {
                const jam = wisata.openingHours?.[day];
                return (
                  <li key={day} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-600 capitalize font-medium">{day}</span>
                    <span className={`font-semibold ${jam ? 'text-gray-900' : 'text-red-500'}`}>{jam || 'Tutup'}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Akomodasi */}
          {wisata.accommodations && wisata.accommodations.length > 0 && (
             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Akomodasi Terdekat</h3>
              <ul className="space-y-4">
                {wisata.accommodations.map((acc, idx) => (
                  <li key={idx} className="flex justify-between items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{acc.name}</p>
                    </div>
                    <div className="text-right whitespace-nowrap text-primary-600 font-bold">
                      {acc.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kontak */}
          <div className="bg-primary-600 rounded-3xl p-8 text-white shadow-lg">
             <h3 className="text-xl font-bold mb-4">Informasi Kontak</h3>
             <p className="text-primary-100 mb-6 text-sm leading-relaxed">
               Butuh bantuan atau informasi lebih lanjut terkait wisata ini? Silakan hubungi pengelola.
             </p>
             <a href={`tel:${wisata.contact?.phone || ''}`} className="block text-center bg-white text-primary-600 font-bold py-3 rounded-xl hover:bg-primary-50 transition-colors w-full">
               Hubungi: {wisata.contact?.phone || '-'}
             </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailWisata;
