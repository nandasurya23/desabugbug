import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DestinationStorage, ArticleStorage, EventStorage } from '../storage/crud';
import { LocalStorageAPI } from '../storage';
import { MapPin, Newspaper, CalendarDays, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalSkeleton from '../components/GlobalSkeleton';

const StatCard = React.memo(({ title, value, icon: Icon, color, to }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon size={24} />
    </div>
    {to && (
      <Link to={to} className="absolute inset-0 z-10">
        <span className="sr-only">View {title}</span>
      </Link>
    )}
  </div>
));

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [stats, setStats] = useState({ wisata: 0, artikel: 0, event: 0 });
  const [quotaWarning, setQuotaWarning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simulate slight delay for skeleton
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const wisataList = await DestinationStorage.getAll();
      const artikelList = await ArticleStorage.getAll();
      const eventList = await EventStorage.getAll();

      // Load stats
      setStats({
        wisata: wisataList.length,
        artikel: artikelList.length,
        event: eventList.length,
      });

      // Check quota
      const quota = await LocalStorageAPI.checkQuota();
      if (quota.isNearLimit) {
        setQuotaWarning(true);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Dummy Data for Chart
  const visitorData = useMemo(() => [
    { month: 'Jan', visitors: 124 },
    { month: 'Feb', visitors: 156 },
    { month: 'Mar', visitors: 198 },
    { month: 'Apr', visitors: 145 },
    { month: 'Mei', visitors: 267 },
    { month: 'Jun', visitors: 342 },
  ], []);
  const maxVisitor = useMemo(() => Math.max(...visitorData.map(d => d.visitors)), [visitorData]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Beranda Dashboard</h1>
        <p className="text-gray-600 mt-1">Ringkasan data aplikasi Desa Bugbug saat ini.</p>
      </div>

      {quotaWarning && hasRole(['superadmin']) && (
        <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start">
          <AlertTriangle className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="text-amber-800 font-medium">Peringatan Kapasitas Penyimpanan</h3>
            <p className="text-amber-700 text-sm mt-1">
              Data lokal Anda hampir mencapai batas maksimal. Segera lakukan 
              <Link to="/admin/pengaturan" className="font-bold underline ml-1">Pencadangan Data (Backup)</Link> 
              agar data tidak hilang.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <GlobalSkeleton type="stat" count={3} />
        ) : (
          <>
            {(hasRole(['superadmin', 'admin', 'owner'])) && (
              <div className="relative">
                 <StatCard 
                  title="Total Destinasi Wisata" 
                  value={stats.wisata} 
                  icon={MapPin} 
                  color="bg-blue-50 text-blue-600" 
                />
                <Link to="/admin/wisata" className="absolute inset-0" />
              </div>
            )}
            {(hasRole(['superadmin', 'admin', 'writer'])) && (
               <div className="relative">
                <StatCard 
                  title="Total Artikel Berita" 
                  value={stats.artikel} 
                  icon={Newspaper} 
                  color="bg-emerald-50 text-emerald-600" 
                />
                <Link to="/admin/artikel" className="absolute inset-0" />
              </div>
            )}
            {(hasRole(['superadmin', 'admin'])) && (
               <div className="relative">
                <StatCard 
                  title="Total Acara / Event" 
                  value={stats.event} 
                  icon={CalendarDays} 
                  color="bg-purple-50 text-purple-600" 
                />
                <Link to="/admin/event" className="absolute inset-0" />
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Welcome Section */}
        <div className="lg:col-span-1 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl shadow-lg p-8 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Selamat Bekerja, <br/>{user?.name}!</h2>
          <p className="text-primary-100 text-sm leading-relaxed mb-6">
            Gunakan menu di sebelah kiri untuk mengelola data operasional pariwisata Desa Bugbug. Pastikan selalu mengecek sisa kapasitas penyimpanan lokal Anda secara rutin.
          </p>
          <Link to="/admin/pengaturan" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors w-fit backdrop-blur-sm">
            Buka Pengaturan
          </Link>
        </div>

        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Statistik Pengunjung (Simulasi)</h3>
              <p className="text-sm text-gray-500">Estimasi kunjungan website 6 bulan terakhir</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2 border-b border-gray-100 pb-2 relative">
            {/* Y-Axis lines optional, just keeping it clean */}
            {visitorData.map((data, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group h-full">
                <div className="w-full relative flex justify-center flex-1 items-end">
                  <div 
                    className="w-full max-w-[48px] bg-primary-100 group-hover:bg-primary-500 rounded-t-lg transition-all duration-500 relative"
                    style={{ height: `${(data.visitors / maxVisitor) * 100}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap z-10 pointer-events-none">
                      {data.visitors} Visit
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500 mt-3">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
