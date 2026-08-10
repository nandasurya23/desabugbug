import React, { createContext, useContext, useState } from 'react';
import { LocalStorageAPI } from '../storage';

const AuthContext = createContext(null);

// INI ADALAH DAFTAR AKUN YANG BISA DIGUNAKAN UNTUK MASUK (LOGIN)
// Sama seperti daftar nama tamu undangan, sistem akan mengecek apakah email dan password ada di daftar ini.
// Di sini juga ditentukan 'peran' atau jabatan masing-masing akun, misalnya sebagai 'superadmin', 'admin', dll.
const ACCOUNTS = {
  'superadmin@gmail.com': { password: 'superadmin', role: 'superadmin', name: 'Super Admin' },
  'admin@gmail.com': { password: 'admin', role: 'admin', name: 'Admin Desa' },
  'penuliskonten@gmail.com': { password: 'penuliskonten', role: 'writer', name: 'Penulis Konten' },
  'wisataalam@gmail.com': { password: 'Wisataalam-12', role: 'owner', name: 'PJ Wisata' }
};

export const AuthProvider = ({ children }) => {
  // BAGIAN INI BERTUGAS MENGINGAT SIAPA YANG SEDANG MASUK SAAT INI
  // Saat pertama kali website dibuka, sistem akan mengecek apakah sebelumnya pengguna sudah pernah masuk.
  // Jika sudah, maka sistem akan mengingatnya dan pengguna tidak perlu masuk lagi.
  const [user, setUser] = useState(() => {
    return LocalStorageAPI.get('app_wisata_auth') || null;
  });

  // FUNGSI INI DIJALANKAN KETIKA PENGGUNA MENEKAN TOMBOL "MASUK" ATAU "LOGIN"
  // Sistem akan mengambil email dan password yang diketik oleh pengguna.
  const login = (email, password) => {
    const account = ACCOUNTS[email];
    
    // SISTEM MENGECEK: "Apakah email ini ada di daftar akun?" DAN "Apakah passwordnya benar?"
    if (account && account.password === password) {
      // JIKA BENAR: Sistem akan membuat 'kartu identitas' sementara yang berisi nama dan peran pengguna.
      const userData = { email, role: account.role, name: account.name };
      
      // Sistem menyimpan kartu identitas ini agar pengguna bisa lanjut ke halaman admin (Dashboard Pengelola).
      setUser(userData);
      LocalStorageAPI.set('app_wisata_auth', userData);
      
      // Memberi tahu halaman bahwa proses masuk BERHASIL.
      return { success: true };
    }
    
    // JIKA SALAH: Sistem menolak dan memberikan pesan bahwa email atau passwordnya tidak cocok.
    return { success: false, message: 'Email atau password salah!' };
  };

  // FUNGSI INI DIJALANKAN KETIKA PENGGUNA MENEKAN TOMBOL "KELUAR" ATAU "LOGOUT"
  // Sistem akan menghancurkan 'kartu identitas' tadi sehingga pengguna menjadi pengunjung biasa lagi.
  const logout = () => {
    setUser(null);
    LocalStorageAPI.remove('app_wisata_auth');
  };

  const hasRole = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
