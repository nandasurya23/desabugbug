import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalStorageAPI } from '../storage';

const AuthContext = createContext(null);

const ACCOUNTS = {
  'superadmin@gmail.com': { password: 'superadmin', role: 'superadmin', name: 'Super Admin' },
  'admin@gmail.com': { password: 'admin', role: 'admin', name: 'Admin Desa' },
  'penuliskonten@gmail.com': { password: 'penuliskonten', role: 'writer', name: 'Penulis Konten' },
  'wisataalam@gmail.com': { password: 'Wisataalam-12', role: 'owner', name: 'PJ Wisata' }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // try to load from session storage (not localStorage to avoid persisting across sessions if not needed)
    // but per requirements, it might be stored in localStorage. We'll use localStorage for simplicity
    return LocalStorageAPI.get('app_wisata_auth') || null;
  });

  const login = (email, password) => {
    const account = ACCOUNTS[email];
    if (account && account.password === password) {
      const userData = { email, role: account.role, name: account.name };
      setUser(userData);
      LocalStorageAPI.set('app_wisata_auth', userData);
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah!' };
  };

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
