import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { EventStorage } from '../storage/crud';
import { compressImage } from '../utils/imageCompressor';
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react';
import DateTimePicker from '../components/DateTimePicker';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    image_url: '',
    map_iframe: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const data = EventStorage.getById(id);
      if (data) {
        setFormData(data);
      } else {
        navigate('/admin/event');
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      EventStorage.update(id, formData);
    } else {
      EventStorage.create(formData);
    }
    navigate('/admin/event');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/event" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Acara' : 'Tambah Acara Baru'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Detail Dasar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="label-text">Judul Acara *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="input-field text-lg font-medium" placeholder="Contoh: Festival Budaya Desa Bugbug 2026" />
          </div>

          <div className="md:col-span-2">
            <label className="label-text">Lokasi Acara *</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} className="input-field" placeholder="Contoh: Lapangan Utama Desa Bugbug" />
          </div>

          <div className="md:col-span-2">
            <label className="label-text">Link Google Maps / Iframe Src (Opsional)</label>
            <input type="text" name="map_iframe" value={formData.map_iframe} onChange={handleChange} className="input-field" placeholder="Contoh: https://www.google.com/maps/embed?pb=..." />
            <p className="text-xs text-gray-500 mt-1">Masukkan link dari Google Maps untuk menampilkan visualisasi lokasi di kalender.</p>
          </div>

          <div className="md:col-span-2">
            <label className="label-text mb-2 block">Gambar Pamflet / Poster (Opsional)</label>
            {formData.image_url ? (
              <div className="relative inline-block">
                <img src={formData.image_url} alt="Cover" className="w-full max-w-md h-auto rounded-lg border border-gray-200 object-cover" loading="lazy" decoding="async" />
                <button type="button" onClick={removeImage} className="absolute -top-3 -right-3 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 shadow-md">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">Klik untuk unggah poster acara</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
                </label>
                {isLoading && <p className="text-sm text-primary-600 mt-2 animate-pulse text-center">Sedang memproses gambar...</p>}
              </div>
            )}
          </div>
        </div>

        {/* Waktu Pelaksanaan */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Waktu Pelaksanaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <DateTimePicker 
              label="Tanggal Mulai" 
              type="date" 
              required 
              value={formData.startDate} 
              onChange={(val) => setFormData({...formData, startDate: val})} 
            />
            <DateTimePicker 
              label="Jam Mulai" 
              type="time" 
              required 
              value={formData.startTime} 
              onChange={(val) => setFormData({...formData, startTime: val})} 
            />
            <DateTimePicker 
              label="Tanggal Selesai" 
              type="date" 
              required 
              value={formData.endDate} 
              onChange={(val) => setFormData({...formData, endDate: val})} 
            />
            <DateTimePicker 
              label="Jam Selesai" 
              type="time" 
              required 
              value={formData.endTime} 
              onChange={(val) => setFormData({...formData, endTime: val})} 
            />
          </div>
        </div>

        <div>
          <label className="label-text">Deskripsi Lengkap Acara *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} className="input-field min-h-[150px]" placeholder="Ceritakan rincian acara, siapa yang bisa hadir, dsb..."></textarea>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2 px-8 py-3">
            <Save size={20} />
            <span>Simpan Acara</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
