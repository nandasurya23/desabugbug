import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
      <ShieldAlert className="mx-auto h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h2>
      <p className="text-gray-600 mb-6">
        Anda tidak memiliki hak akses (role) yang diperlukan untuk melihat halaman ini.
      </p>
      <Link to="/admin" className="btn-primary inline-block">
        Kembali ke Dashboard
      </Link>
    </div>
  </div>
);

export const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-8">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link to="/" className="btn-primary inline-block">
        Kembali ke Beranda
      </Link>
    </div>
  </div>
);
