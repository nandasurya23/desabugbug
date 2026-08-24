import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DestinationStorage } from '../storage/crud';
import { compressImage } from '../utils/imageCompressor';
import { ArrowLeft, Plus, Trash2, Save, UploadCloud } from 'lucide-react';

const WisataForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Buka',
    harga_tiket: '',
    facilities: [], // {id, name}
    accommodations: [], // {id, name, price}
    galleries: [], // {id, url}
    openingHours: { senin: '', selasa: '', rabu: '', kamis: '', jumat: '', sabtu: '', minggu: '' },
    contact: { phone: '', address: '' },
    map_iframe: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const loadData = async () => {
        const data = await DestinationStorage.getById(id);
        if (data) {
          setFormData(data);
        } else {
          navigate('/admin/wisata');
        }
      };
      loadData();
    }
  }, [id, navigate, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleArrayAdd = (category, defaultObject) => {
    setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now().toString(), ...defaultObject }]
    }));
  };

  const handleArrayChange = (category, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[category]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [category]: newArray };
    });
  };

  const handleArrayRemove = (category, index) => {
    setFormData(prev => {
      const newArray = [...prev[category]];
      newArray.splice(index, 1);
      return { ...prev, [category]: newArray };
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setIsLoading(true);
    try {
      const newImages = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        // Compress image to max 800x800 and 0.7 quality to save LocalStorage quota
        const base64 = await compressImage(file, 800, 800, 0.7);
        newImages.push({ id: Date.now().toString() + Math.random(), url: base64 });
      }
      
      setFormData(prev => ({
        ...prev,
        galleries: [...prev.galleries, ...newImages]
      }));
    } catch (error) {
      alert('Gagal memproses gambar. Coba gambar lain.');
    } finally {
      setIsLoading(false);
    }
  };

  // TAHAP CREATE (MEMBUAT BARU) DAN UPDATE (MENGUBAH DATA):
  // Fungsi ini dijalankan ketika tombol "Simpan Data Wisata" di bagian paling bawah ditekan.
  const handleSubmit = async (e) => {
    // Mencegah halaman termuat ulang (refresh) secara otomatis
    e.preventDefault();
    
    // Sistem mengecek: "Apakah kita sedang mengedit data yang sudah ada?"
    if (isEdit) {
      // JIKA YA (UPDATE): Sistem mencari data lama berdasarkan ID-nya, lalu menimpanya dengan data baru yang baru saja diketik.
      await DestinationStorage.update(id, formData);
    } else {
      // JIKA TIDAK (CREATE): Sistem menyimpan ini sebagai data wisata yang benar-benar baru ke dalam gudang penyimpanan.
      await DestinationStorage.create(formData);
    }
    
    // Setelah selesai menyimpan, sistem otomatis membawa pengguna kembali ke halaman daftar wisata.
    navigate('/admin/wisata');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/wisata" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Destinasi Wisata' : 'Tambah Wisata Baru'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informasi Dasar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Informasi Dasar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="label-text">Nama Wisata *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Contoh: Pantai Bias Tugel" />
            </div>
            <div className="md:col-span-2">
              <label className="label-text">Deskripsi Lengkap *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} className="input-field min-h-[100px]" placeholder="Ceritakan tentang wisata ini..."></textarea>
            </div>
            <div>
              <label className="label-text">Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-field bg-white">
                <option value="Buka">Buka</option>
                <option value="Tutup">Tutup</option>
                <option value="Renovasi">Dalam Renovasi</option>
              </select>
            </div>
            <div>
              <label className="label-text">Harga Tiket Dasar (Opsional)</label>
              <input type="text" name="harga_tiket" value={formData.harga_tiket} onChange={handleChange} className="input-field" placeholder="Contoh: Rp 10.000 / Gratis" />
            </div>
            <div className="md:col-span-2">
              <label className="label-text">Link Google Maps / Iframe Src (Opsional)</label>
              <input type="text" name="map_iframe" value={formData.map_iframe} onChange={handleChange} className="input-field" placeholder="Contoh: https://www.google.com/maps/embed?pb=..." />
              <p className="text-xs text-gray-500 mt-1">Masukkan link embed (src) dari Google Maps agar peta bisa ditampilkan di halaman.</p>
            </div>
          </div>
        </div>

        {/* Fasilitas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-900">Fasilitas</h2>
            <button type="button" onClick={() => handleArrayAdd('facilities', { name: '' })} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              <Plus size={16} /> Tambah Fasilitas
            </button>
          </div>
          {formData.facilities.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Belum ada fasilitas. Klik tambah.</p>
          ) : (
            <div className="space-y-3">
              {formData.facilities.map((fac, idx) => (
                <div key={fac.id} className="flex gap-3">
                  <input type="text" value={fac.name} onChange={(e) => handleArrayChange('facilities', idx, 'name', e.target.value)} className="input-field flex-1" placeholder="Nama Fasilitas (contoh: Toilet Umum)" required />
                  <button type="button" onClick={() => handleArrayRemove('facilities', idx)} className="btn-danger px-3">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Galeri Gambar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Galeri Foto</h2>
              <p className="text-xs text-gray-500">Gambar akan dikompresi otomatis untuk menghemat ruang.</p>
            </div>
            <label className="btn-secondary cursor-pointer flex items-center gap-2">
              <UploadCloud size={18} />
              <span>Unggah Foto</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isLoading} />
            </label>
          </div>
          
          {isLoading && <p className="text-sm text-primary-600 mb-4 animate-pulse">Sedang memproses gambar...</p>}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.galleries.map((img, idx) => (
              <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                <img src={img.url} alt="Gallery" className="w-full h-full object-cover" loading="lazy" decoding="async" onError={(e) => { e.target.onerror = null; e.target.src="/default.jpeg"; }} />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button type="button" onClick={() => handleArrayRemove('galleries', idx)} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {formData.galleries.length === 0 && !isLoading && (
              <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Belum ada foto galeri.</p>
              </div>
            )}
          </div>
        </div>

        {/* Akomodasi (Opsional) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-900">Akomodasi / Penginapan (Opsional)</h2>
            <button type="button" onClick={() => handleArrayAdd('accommodations', { name: '', price: '' })} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              <Plus size={16} /> Tambah Akomodasi
            </button>
          </div>
          <div className="space-y-3">
            {formData.accommodations.map((acc, idx) => (
              <div key={acc.id} className="flex flex-col sm:flex-row gap-3">
                <input type="text" value={acc.name} onChange={(e) => handleArrayChange('accommodations', idx, 'name', e.target.value)} className="input-field sm:w-1/2" placeholder="Nama Penginapan" required />
                <input type="text" value={acc.price} onChange={(e) => handleArrayChange('accommodations', idx, 'price', e.target.value)} className="input-field sm:w-1/3" placeholder="Harga/Malam" required />
                <button type="button" onClick={() => handleArrayRemove('accommodations', idx)} className="btn-danger px-3 w-full sm:w-auto flex justify-center">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Jam Buka & Kontak */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Jam Buka & Kontak</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Kontak & Lokasi</h3>
              <div className="space-y-4">
                <div>
                  <label className="label-text">Nomor Telepon/WA</label>
                  <input type="text" value={formData.contact.phone} onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)} className="input-field" placeholder="0812..." />
                </div>
                <div>
                  <label className="label-text">Alamat Lengkap</label>
                  <textarea value={formData.contact.address} onChange={(e) => handleNestedChange('contact', 'address', e.target.value)} className="input-field min-h-[80px]" placeholder="Jalan..."></textarea>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Jam Operasional</h3>
              <div className="space-y-2">
                {['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((day) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-16 text-sm text-gray-600 capitalize">{day}</span>
                    <input type="text" value={formData.openingHours[day]} onChange={(e) => handleNestedChange('openingHours', day, e.target.value)} className="input-field py-1" placeholder="08:00 - 17:00 (Kosongkan jika tutup)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2 px-8 py-3 text-lg">
            <Save size={20} />
            <span>Simpan Data Wisata</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WisataForm;
