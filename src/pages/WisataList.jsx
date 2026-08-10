import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DestinationStorage } from '../storage/crud';
import { Edit, Trash2, Plus, AlertCircle, Eye } from 'lucide-react';
import Pagination from '../components/Pagination';

const WisataList = () => {
  const [destinations, setDestinations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // TAHAP READ (MEMBACA DATA): 
  // Saat halaman ini pertama kali dibuka, sistem akan otomatis mengambil data wisata.
  useEffect(() => {
    loadData();
  }, []);

  // Ini adalah proses dimana sistem pergi ke 'gudang penyimpanan' untuk mengambil daftar wisata yang ada.
  const loadData = () => {
    setDestinations(DestinationStorage.getAll());
  };

  // TAHAP DELETE (MENGHAPUS DATA):
  // Saat tombol hapus ditekan, sistem tidak langsung menghapus, tapi memunculkan jendela konfirmasi dulu
  // "Apakah Anda yakin ingin menghapus data ini?"
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Jika pengguna menjawab "Ya, Hapus", barulah sistem benar-benar menghapus data tersebut dari gudang.
  const handleDelete = () => {
    if (itemToDelete) {
      // Menghapus data dari penyimpanan berdasarkan ID-nya
      DestinationStorage.remove(itemToDelete.id);
      
      // Setelah berhasil dihapus, sistem akan mengambil daftar terbaru dari gudang (refresh data)
      loadData();
      
      // Menutup jendela konfirmasi
      setShowDeleteModal(false);
      setItemToDelete(null);
      
      // Prevent being stuck on empty page
      const newTotalPages = Math.ceil((destinations.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  const currentItems = destinations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Destinasi Wisata</h1>
          <p className="text-gray-600 mt-1">Daftar semua tempat wisata yang ada di desa.</p>
        </div>
        <Link to="/admin/wisata/tambah" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          <span>Tambah Wisata</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">Nama Wisata</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Harga Tiket</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {destinations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    Belum ada data wisata. Silakan klik "Tambah Wisata".
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Buka' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Tutup' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.harga_tiket || 'Gratis'}
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <Link to={`/admin/wisata/edit/${item.id}`} className="px-3 py-1.5 flex items-center gap-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium">
                        <Edit size={16} />
                        <span>Edit</span>
                      </Link>
                      <button onClick={() => confirmDelete(item)} className="px-3 py-1.5 flex items-center gap-1.5 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium">
                        <Trash2 size={16} />
                        <span>Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Konfirmasi Hapus</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus <strong>{itemToDelete?.name}</strong>? Data yang sudah dihapus tidak dapat dikembalikan.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">
                Batal
              </button>
              <button onClick={handleDelete} className="btn-danger">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WisataList;
