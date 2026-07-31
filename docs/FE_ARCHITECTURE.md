# Frontend Architecture

## 1. Folder Structure & Component Hierarchy
Proyek ini mengadopsi arsitektur berbasis fitur (Feature-based grouping) pada level *pages* dan *atomic design* pada level *components*.

**Hierarchy:**
```
App Root (BrowserRouter, AuthProvider)
 └── Router (Routes Configuration)
      ├── Public Route (PublicLayout)
      │    ├── Landing Page (Home Publik)
      │    ├── Detail Wisata
      │    ├── Detail Artikel / Event
      │    └── Login Page
      └── Protected Route (AdminLayout)
           ├── Sidebar & Header
           └── Page Content (Dashboard, Wisata, Artikel, Event, Pengaturan)
```

## 2. Routing System
`react-router-dom` digunakan dengan sistem pengecekan ganda:
1. Pengecekan apakah rute bersifat publik (seperti Landing Page dan Detail Wisata).
2. Pengecekan apakah rute memerlukan login (`AuthContext`).
3. Pengecekan apakah *Role* user diizinkan mengakses path tertentu. Jika tidak, redirect ke `/unauthorized` atau kembali ke `/dashboard`.

## 3. State Management
- **Global State:** Hanya digunakan untuk **Session / Auth**. Dikelola menggunakan `React.createContext()` dan `useContext`.
- **Local State:** Data operasional (daftar wisata, artikel) cukup disimpan di *local state* komponen (`useState`) yang mengambil (*fetch*) datanya dari file `storage/` saat komponen di-mount (`useEffect`). Karena kecepatan LocalStorage sangat tinggi (sinkron), *Redux* atau *Zustand* diabaikan untuk menjaga aplikasi tetap super ringan.

## 4. LocalStorage Flow
Seluruh interaksi data wajib melalui layer `storage/`.
Contoh Alur (Simpan Artikel):
1. User klik "Simpan" di komponen `FormArtikel`.
2. Komponen memanggil fungsi `ArticleStorage.create(data)`.
3. Di dalam `ArticleStorage.create`:
   - Ambil data lama: `let current = JSON.parse(localStorage.getItem('app_wisata_articles')) || []`
   - Beri ID unik (`Date.now()` atau `UUID`).
   - Masukkan data baru: `current.push(newData)`
   - Simpan: `localStorage.setItem('app_wisata_articles', JSON.stringify(current))`
4. Fungsi mengembalikan indikator sukses. Komponen mereload tabel data (dan data baru akan langsung tersedia di Landing Page Publik).

## 5. Reusable Component Pattern
Komponen UI yang diulang akan dipisah ke `src/components/`, misalnya:
- `Button.jsx` (Menangani varian *primary*, *danger*, *secondary* dengan desain modern Tailwind).
- `InputField.jsx` (Input standar dengan label dan error handling UI).
- `DataTable.jsx` (Tabel standar dengan fitur pencarian ringan).
- `ModalConfirm.jsx` (Dialog konfirmasi untuk aksi destruktif).
- `CardWisata.jsx` (Kartu yang menampilkan wisata di Landing Page).

## 6. Naming & Coding Convention
- **Penamaan Komponen (File & Fungsi):** PascalCase (Contoh: `AdminLayout.jsx`, `FormWisata.jsx`).
- **Penamaan Variabel/Fungsi Biasa:** camelCase (Contoh: `handleLogin`, `fetchData`).
- **CSS Class:** Utility classes Tailwind langsung di dalam komponen, atau custom class di `index.css` menggunakan format BEM/kebab-case untuk mikro-animasi.
- **Bahasa UI:** Bahasa Indonesia. Hindari bahasa teknis. (Contoh: "Hapus Wisata" bukan "Delete Item").
