import React, { useState, useEffect } from 'react';
import { LocalStorageAPI } from '../storage';
import { DownloadCloud, UploadCloud, AlertTriangle, CheckCircle, Database } from 'lucide-react';

const Pengaturan = () => {
  const [quotaInfo, setQuotaInfo] = useState({ used: 0, percentage: 0, isNearLimit: false });
  const [importStatus, setImportStatus] = useState({ show: false, success: false, message: '' });

  useEffect(() => {
    setQuotaInfo(LocalStorageAPI.checkQuota());
  }, []);

  // FUNGSI INI DIJALANKAN KETIKA TOMBOL "CADANGKAN DATA" (BACKUP) DITEKAN
  // Sistem akan mengumpulkan semua data wisata, artikel, dan event yang ada saat ini.
  const handleBackup = () => {
    try {
      const allData = {};
      
      // Tahap 1: Sistem mencari dan mengumpulkan semua data yang tersimpan
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('app_wisata_')) {
          allData[key] = LocalStorageAPI.get(key);
        }
      }

      // Tahap 2: Sistem membungkus semua data tersebut ke dalam sebuah file khusus bernama backup.json
      const jsonString = JSON.stringify(allData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Tahap 3: Sistem secara otomatis mengunduh (download) file tersebut ke komputer/HP Anda
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-wisata-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Gagal melakukan pencadangan data.');
    }
  };

  // FUNGSI INI DIJALANKAN KETIKA PENGGUNA MENGUNGGAH FILE UNTUK "PULIHKAN DATA" (RESTORE)
  const handleRestore = (e) => {
    // Sistem menerima file backup yang diunggah oleh pengguna
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // Sistem membuka isi file tersebut
        const parsedData = JSON.parse(event.target.result);
        
        // Tahap 1: Sistem memeriksa apakah isi filenya benar-benar data aplikasi ini
        // (Jika salah format, sistem akan menolak dan pindah ke bagian 'catch' di bawah)
        if (typeof parsedData !== 'object' || !Object.keys(parsedData).some(k => k.startsWith('app_wisata_'))) {
          throw new Error('Format file tidak valid.');
        }

        // Tahap 2: Sistem menghapus semua data lama yang ada saat ini
        LocalStorageAPI.clearAllAppKeys();
        
        // Tahap 3: Sistem memasukkan data baru yang berasal dari file backup tadi
        Object.keys(parsedData).forEach(key => {
          if (key.startsWith('app_wisata_')) {
            LocalStorageAPI.set(key, parsedData[key]);
          }
        });

        // Tahap 4: Sistem memberitahu bahwa proses berhasil dan memuat ulang halaman
        setImportStatus({ show: true, success: true, message: 'Data berhasil dipulihkan! Halaman akan dimuat ulang.' });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        // Jika file rusak atau formatnya salah, tampilkan pesan kesalahan ke pengguna
        setImportStatus({ show: true, success: false, message: `Gagal memulihkan data: ${error.message}` });
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset input
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Data</h1>
        <p className="text-gray-600 mt-1">Lakukan pencadangan (backup) dan pemulihan (restore) data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Status Penyimpanan */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Status Penyimpanan Lokal (Browser)</h2>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-gray-700">Terpakai: {formatBytes(quotaInfo.used)}</span>
              <span className="text-gray-500">Maksimal: ~5 MB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-2.5 rounded-full ${quotaInfo.isNearLimit ? 'bg-red-500' : 'bg-primary-500'}`} 
                style={{ width: `${Math.min(quotaInfo.percentage, 100)}%` }}
              ></div>
            </div>
            {quotaInfo.isNearLimit && (
              <p className="text-red-600 text-sm mt-3 flex items-center gap-1 font-medium">
                <AlertTriangle size={16} /> Kapasitas hampir penuh! Segera lakukan backup.
              </p>
            )}
          </div>
        </div>

        {/* Backup Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <DownloadCloud size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cadangkan Data (Backup)</h2>
          <p className="text-gray-500 text-sm mb-6 flex-1">
            Unduh seluruh data desa (Wisata, Artikel, Event) menjadi satu file JSON. Simpan file ini di tempat yang aman.
          </p>
          <button onClick={handleBackup} className="btn-primary w-full max-w-xs flex justify-center items-center gap-2">
            <DownloadCloud size={18} /> Cadangkan Sekarang
          </button>
        </div>

        {/* Restore Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <UploadCloud size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pulihkan Data (Restore)</h2>
          <p className="text-gray-500 text-sm mb-6 flex-1">
            Unggah file JSON hasil pencadangan untuk mengembalikan data. <br/>
            <strong className="text-red-600">Peringatan:</strong> Data saat ini akan ditimpa sepenuhnya!
          </p>
          
          <label className="btn-secondary w-full max-w-xs flex justify-center items-center gap-2 cursor-pointer border-amber-600 text-amber-700 hover:bg-amber-50">
            <UploadCloud size={18} /> Pilih File & Pulihkan
            <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
          </label>
        </div>

      </div>

      {/* Import Status Message */}
      {importStatus.show && (
        <div className={`mt-8 p-4 rounded-xl flex items-start gap-3 ${importStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {importStatus.success ? <CheckCircle className="text-emerald-500 flex-shrink-0" /> : <AlertTriangle className="text-red-500 flex-shrink-0" />}
          <div>
            <h3 className="font-bold">{importStatus.success ? 'Berhasil' : 'Gagal'}</h3>
            <p className="text-sm mt-1">{importStatus.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pengaturan;
