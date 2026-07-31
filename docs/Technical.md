# Technical Specification

## 1. Tech Stack
- **Framework Core:** React (v18+)
- **Routing:** React Router DOM (v6+)
- **Styling:** Tailwind CSS + Vanilla CSS (untuk custom styling/mikro-animasi)
- **Language:** JavaScript (ES6+). *Tidak menggunakan TypeScript sesuai mandat.*
- **Build Tool:** Vite (Cepat dan ringan)
- **Icons:** Lucide React (atau setara, ringan dan modern)
- **Penyimpanan:** LocalStorage Browser

## 2. Struktur Project (React)
```text
src/
 ├── assets/          # Gambar statis, logo, icon
 ├── components/      # Komponen UI Reusable (Button, Input, Modal, Table)
 ├── constants/       # Konfigurasi konstan (List Akun Statis, Role Definitions)
 ├── contexts/        # React Context (AuthContext)
 ├── hooks/           # Custom hooks (useAuth, useLocalStorage)
 ├── layouts/         # Layout utama (AdminLayout dengan Sidebar & Topbar)
 ├── pages/           # Komponen Halaman (Dashboard, Login, WisataList, dll)
 ├── router/          # Konfigurasi React Router (Protected Routes)
 ├── services/        # Service spesifik (validasi, format tanggal)
 ├── storage/         # Wrapper Logic untuk CRUD LocalStorage
 ├── styles/          # index.css (Tailwind base dan variabel custom)
 └── utils/           # Fungsi helper murni (generate ID acak, dll)
```

## 3. LocalStorage Strategy
Mengingat tidak adanya database server, LocalStorage akan bertindak sebagai basis data NoSQL (Key-Value) berbasis JSON.
**Data Keys:**
- `app_wisata_destinations` : Array of Object (Destinasi Wisata)
- `app_wisata_articles` : Array of Object (Artikel/Berita)
- `app_wisata_events` : Array of Object (Event)
- `app_wisata_auth` : Data user yang sedang login (untuk persistensi sesi sederhana, atau gunakan `sessionStorage`)

## 4. Data Validation Strategy
Validasi dilakukan secara ketat di sisi form React sebelum data diserialisasi ke JSON.
- Pengecekan tipe data dasar (String, Number, Array).
- Pengecekan *required field* (Tidak boleh kosong).
- Fungsi sanitasi sederhana untuk mencegah bug UI.

## 5. Backup, Restore, Export, Import Strategy
- **Backup / Export:** Mengambil seluruh key dengan prefix `app_wisata_` dari LocalStorage, menggabungkannya ke dalam satu objek JSON besar, merubahnya menjadi Blob, dan men-trigger download otomatis dengan nama `wisata-backup-[tanggal].json`.
- **Restore / Import:** Aplikasi menyediakan form upload file. File `.json` dibaca menggunakan `FileReader`. Jika format valid, isinya di-*parse* dan langsung disimpan ulang ke LocalStorage (overwrite), lalu mereload state aplikasi.

## 6. Error Handling & Performance Strategy
- Membungkus pembacaan/penulisan LocalStorage di dalam `try-catch`. Bila kuota (biasanya ~5MB) penuh, aplikasi akan menampilkan alert.
- Penggunaan komponen murni dan manipulasi list yang efisien.
- Tidak ada *network latency*, sehingga feedback UI (Toast / Alert) dapat ditampilkan secara instan sesudah aksi pengguna.
