import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts & Guards
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages (Lazy Loaded)
import { NotFound, Unauthorized } from './pages/ErrorPages';
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const WisataList = React.lazy(() => import('./pages/WisataList'));
const WisataForm = React.lazy(() => import('./pages/WisataForm'));

const ArtikelList = React.lazy(() => import('./pages/ArtikelList'));
const ArtikelForm = React.lazy(() => import('./pages/ArtikelForm'));
const EventList = React.lazy(() => import('./pages/EventList'));
const EventForm = React.lazy(() => import('./pages/EventForm'));
const Pengaturan = React.lazy(() => import('./pages/Pengaturan'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const DetailWisata = React.lazy(() => import('./pages/DetailWisata'));
const DetailArtikel = React.lazy(() => import('./pages/DetailArtikel'));

import GlobalSpinner from './components/GlobalSpinner';

const LoadingFallback = () => (
  <GlobalSpinner fullScreen={true} message="Memuat Halaman..." />
);
import { seedInitialData } from './storage/seeder';

// Menjalankan seeder sekali saat aplikasi dimuat
seedInitialData();

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/wisata/:id" element={<DetailWisata />} />
            <Route path="/berita/:id" element={<DetailArtikel />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['superadmin', 'admin', 'writer', 'owner']} />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              
              <Route element={<ProtectedRoute allowedRoles={['superadmin', 'admin', 'owner']} />}>
                <Route path="wisata">
                  <Route index element={<WisataList />} />
                  <Route path="tambah" element={<WisataForm />} />
                  <Route path="edit/:id" element={<WisataForm />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['superadmin', 'admin', 'writer']} />}>
                <Route path="artikel">
                  <Route index element={<ArtikelList />} />
                  <Route path="tambah" element={<ArtikelForm />} />
                  <Route path="edit/:id" element={<ArtikelForm />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['superadmin', 'admin']} />}>
                <Route path="event">
                  <Route index element={<EventList />} />
                  <Route path="tambah" element={<EventForm />} />
                  <Route path="edit/:id" element={<EventForm />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
                <Route path="pengaturan" element={<Pengaturan />} />
              </Route>
            </Route>
          </Route>

          {/* Error Pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
