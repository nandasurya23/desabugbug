import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleStorage } from '../storage/crud';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import Pagination from '../components/Pagination';

const ArtikelList = () => {
  const [articles, setArticles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await ArticleStorage.getAll();
    setArticles(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      await ArticleStorage.remove(itemToDelete.id);
      await loadData();
      setShowDeleteModal(false);
      setItemToDelete(null);
      
      const newTotalPages = Math.ceil((articles.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const currentItems = articles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Berita & Artikel</h1>
          <p className="text-gray-600 mt-1">Daftar semua berita dan pengumuman desa.</p>
        </div>
        <Link to="/admin/artikel/tambah" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          <span>Tambah Berita</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">Judul Berita</th>
                <th className="p-4 font-medium">Penulis</th>
                <th className="p-4 font-medium">Tanggal</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    Belum ada berita. Silakan klik "Tambah Berita".
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {item.image_url ? (
                          <img src={item.image_url} alt="Cover" className="w-12 h-12 rounded object-cover flex-shrink-0" loading="lazy" decoding="async" onError={(e) => { e.target.onerror = null; e.target.src="/default.jpeg"; }} />
                        ) : (
                          <img src="/default.jpeg" alt="Cover" className="w-12 h-12 rounded object-cover flex-shrink-0" loading="lazy" decoding="async" />
                        )}
                        <p className="font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.author}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <Link to={`/admin/artikel/edit/${item.id}`} className="px-3 py-1.5 flex items-center gap-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium">
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
              Apakah Anda yakin ingin menghapus berita <strong>{itemToDelete?.title}</strong>? Data yang dihapus tidak bisa kembali.
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

export default ArtikelList;
