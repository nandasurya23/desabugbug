# Laporan Audit Proyek (Phase 1)

## 1. Ringkasan Audit
Proyek ini sebelumnya merupakan aplikasi monolitik berbasis **Laravel 11** dengan antarmuka **Blade Templates**, **Alpine.js**, dan **Tailwind CSS**. Aplikasi ini menggunakan database relasional (diasumsikan MySQL/SQLite) untuk menyimpan data entitas seperti Pengguna, Destinasi Wisata, Artikel, dan Event.

Sesuai dengan mandat proyek, aplikasi ini akan direstrukturisasi secara radikal menjadi aplikasi **Single Page Application (SPA) dengan React** yang berjalan **100% di Frontend (Zero Backend & Zero Database)** menggunakan **LocalStorage**.

---

## 2. Hasil Audit Berdasarkan Komponen

### A. Routing & Controller (`routes/web.php`, `app/Http/Controllers/`)
- **Status Saat Ini:** Menggunakan routing Laravel yang mengembalikan view Blade. Terdapat pengelompokan rute berdasarkan role (Super Admin, Admin, Owner, Writer).
- **Keputusan:** **HAPUS SEMUA**. 
- **Tindakan:** Diganti sepenuhnya dengan `React Router`. Routing akan dikelola di frontend dengan komponen `ProtectedRoute` untuk menangani RBAC (Role-Based Access Control).

### B. Model & Migrasi (`app/Models/`, `database/migrations/`)
- **Status Saat Ini:** Terdapat 9 Model (User, Destination, Article, Event, Accommodation, Facility, Gallery, OpeningHour, ContactDetail) dengan skema relasional yang cukup kompleks (1-to-many dari Destination ke entitas lain).
- **Keputusan:** **HAPUS SEMUA**.
- **Tindakan:** Skema relasional akan disederhanakan (Denormalisasi). Data seperti Facility, Accommodation, Gallery, OpeningHour, dan ContactDetail akan digabung menjadi *nested array/object* di dalam satu entitas `Destination` berformat JSON, untuk disimpan di `LocalStorage`.

### C. Autentikasi & RBAC (`app/Http/Middleware/`, Session)
- **Status Saat Ini:** Menggunakan session base login Laravel dengan middleware pembatasan hak akses.
- **Keputusan:** **HAPUS SEMUA**.
- **Tindakan:** Menggunakan *Hardcoded Auth* berdasarkan daftar akun yang diberikan. Data user aktif beserta rolenya akan disimpan sementara di `sessionStorage` atau state global (React Context), bukan di backend. Pengecekan akses dilakukan di sisi komponen React.

### D. Views & UI/UX (`resources/views/`)
- **Status Saat Ini:** Menggunakan komponen UI berbasis Blade yang tersebar di banyak folder. Cukup kompleks dan bergantung pada server-side rendering.
- **Keputusan:** **RANCANG ULANG DARI NOL**.
- **Tindakan:** Membangun ulang UI menggunakan komponen fungsional React. Fokus pada antarmuka yang besar, bersih, berbahasa Indonesia, dan sangat mudah dipahami oleh Admin Desa. Tidak ada langkah yang bertele-tele.

### E. Environment & Dependencies (`.env`, `composer.json`, `package.json`)
- **Status Saat Ini:** Bergantung pada dependensi PHP/Laravel yang besar dan Vite untuk build aset frontend.
- **Keputusan:** **HAPUS & BERSIHKAN**.
- **Tindakan:** Proyek akan di-init ulang dengan `Vite + React`. Semua package Laravel (composer) akan dihapus. Hanya library pendukung frontend murni (seperti `react-router-dom`, `lucide-react` untuk ikon) yang akan digunakan.

---

## 3. Keputusan Eksekusi (Apa yang dilakukan selanjutnya)

### Yang Dipertahankan:
- **Konsep Bisnis:** Entitas utama (Wisata, Artikel, Event) dan pembagian Hak Akses (Superadmin, Admin, Penulis, Penanggung Jawab Wisata) tetap digunakan.
- **Tailwind CSS:** Akan tetap digunakan sebagai alat styling utama karena sudah terkonfigurasi di ekosistem sebelumnya dan mempermudah pembuatan UI modern.

### Yang Dihapus:
- Seluruh file backend: `app/`, `bootstrap/`, `config/`, `database/`, `routes/`, `tests/`, `artisan`, `composer.json`, `composer.lock`.
- Seluruh frontend lama: `resources/views/`.

### Yang Digabung / Disederhanakan:
- Struktur Data Relasional (`Destination` terpisah dari `Facility`, `Gallery`, dll) **DIGABUNG** menjadi struktur JSON tunggal untuk mempermudah operasi CRUD di LocalStorage.
- Business Flow yang membutuhkan perpindahan halaman untuk sekadar menambah fasilitas akan disederhanakan menjadi form dinamis di dalam satu halaman manajemen Destinasi.

### Yang Dirancang Ulang:
- **Flow Penyimpanan Data:** Menggunakan custom wrapper service `storage/` di React yang dapat melakukan manipulasi data JSON dari LocalStorage.
- **UI/UX Admin:** Dashboard akan dirancang ulang menjadi lebih intuitif, tanpa istilah teknis ("CRUD", "ID", "Foreign Key"), dan langsung to-the-point (Contoh tombol: "Tambah Wisata Baru", "Simpan Perubahan").
- **Sistem Backup:** Akan ditambahkan fitur "Backup Data" (mengunduh `.json`) dan "Restore Data" (mengunggah `.json`) untuk mengantisipasi hilangnya data di LocalStorage browser.
