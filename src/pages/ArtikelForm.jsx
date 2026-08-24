import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArticleStorage } from '../storage/crud';
import { compressImage } from '../utils/imageCompressor';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react';

const ArtikelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user?.name || 'Admin',
    image_url: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const loadData = async () => {
        const data = await ArticleStorage.getById(id);
        if (data) {
          setFormData(data);
        } else {
          navigate('/admin/artikel');
        }
      };
      loadData();
    }
  }, [id, navigate, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    
    setIsLoading(true);
    try {
      const base64 = await compressImage(file, 800, 800, 0.7);
      setFormData(prev => ({ ...prev, image_url: base64 }));
    } catch (error) {
      alert('Gagal memproses gambar.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await ArticleStorage.update(id, formData);
    } else {
      await ArticleStorage.create(formData);
    }
    navigate('/admin/artikel');
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/artikel" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Berita' : 'Tulis Berita Baru'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <label className="label-text">Judul Berita *</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="input-field text-lg font-medium" placeholder="Contoh: Peresmian Jembatan Baru Desa Bugbug" />
        </div>

        <div>
          <label className="label-text">Penulis</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} className="input-field bg-gray-50" readOnly />
        </div>

        <div>
          <label className="label-text mb-2 block">Gambar Cover / Thumbnail (Opsional)</label>
          {formData.image_url ? (
            <div className="relative inline-block">
              <img src={formData.image_url} alt="Cover" className="w-full max-w-md h-auto rounded-lg border border-gray-200 object-cover" loading="lazy" decoding="async" onError={(e) => { e.target.onerror = null; e.target.src="/default.jpeg"; }} />
              <button type="button" onClick={removeImage} className="absolute -top-3 -right-3 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 shadow-md">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="relative">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Klik untuk unggah gambar</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
              </label>
              {isLoading && <p className="text-sm text-primary-600 mt-2 animate-pulse text-center">Sedang memproses gambar...</p>}
            </div>
          )}
        </div>

        <div>
          <label className="label-text">Isi Konten Berita *</label>
          <textarea required name="content" value={formData.content} onChange={handleChange} className="input-field min-h-[300px]" placeholder="Tuliskan berita atau pengumuman di sini..."></textarea>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2 px-8 py-3">
            <Save size={20} />
            <span>Simpan Berita</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtikelForm;
