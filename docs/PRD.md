# Product Requirements Document (PRD)

## 1. Tujuan Aplikasi
Aplikasi Manajemen Desa Wisata adalah sistem informasi berbasis web mandiri (tanpa server backend) yang ditujukan untuk mempromosikan wisata ke masyarakat luas serta mempermudah Perangkat Desa dalam mengelola datanya. Menggunakan arsitektur yang sangat sederhana, cepat, dan aman, dengan penyimpanan bawaan browser (LocalStorage).

## 2. Target Pengguna
1. **Pengunjung Umum (Wisatawan/Masyarakat):** Mengakses Landing Page publik untuk melihat informasi tempat wisata, membaca berita, dan melihat jadwal acara desa tanpa perlu login.
2. **Superadmin (Perangkat Desa Inti):** Memiliki kontrol penuh atas sistem, pengaturan, dan semua data.
3. **Admin (Staf Desa):** Mengelola operasional data secara umum (Wisata, Artikel, Event).
4. **Penulis Konten:** Fokus hanya pada pembuatan dan pembaruan artikel/berita desa.
5. **Penanggung Jawab Wisata:** Fokus hanya pada pengelolaan data destinasi wisata spesifik miliknya.

**Karakteristik Pengguna:** Mayoritas pengelola bersifat *non-technical*. Oleh karena itu, aplikasi bebas dari jargon IT dan memiliki UI yang bersih, jelas, serta dilengkapi petunjuk berbahasa Indonesia.

## 3. Scope
Proyek ini dibatasi hanya pada **Frontend (React)**.
- **Tidak ada** server, API, atau database relasional.
- Semua data persisten disimpan secara lokal di device/browser pengguna menggunakan `LocalStorage`.
- Aplikasi bersifat lokal (offline/standalone web app logic) untuk pengelolaan data, namun dapat disajikan sebagai website publik statis.

## 4. Daftar Fitur Utama
1. **Landing Page Publik:** Halaman beranda modern yang dapat diakses oleh siapa saja untuk melihat katalog wisata, artikel terbaru, dan event desa.
2. **Sistem Login Statis (Hardcoded Auth):** Autentikasi berbasis Role (RBAC) tanpa perlu registrasi, khusus untuk area pengelola (admin).
3. **Dashboard Dinamis:** Menampilkan statistik singkat dan menu navigasi yang menyesuaikan role pengguna.
4. **Manajemen Destinasi Wisata (CRUD):** 
   - Informasi Dasar (Nama, Deskripsi, Jam Buka, Kontak).
   - Pengelolaan Fasilitas, Akomodasi, dan Galeri Foto (dalam satu struktur).
5. **Manajemen Artikel/Berita (CRUD):** Pembuatan berita desa wisata.
6. **Manajemen Event (CRUD):** Pendaftaran acara/event pariwisata mendatang.
7. **Ekspor & Impor Data (Backup/Restore):** Fitur untuk mengunduh seluruh data LocalStorage sebagai file `.json` dan mengunggahnya kembali.
8. **Sistem Proteksi Akses (RBAC):** Menu dan aksi secara ketat disembunyikan jika pengguna tidak memiliki izin (bukan sekadar di-disable).

## 5. User Journey
- **Wisatawan:** Membuka URL website -> Melihat Landing Page yang indah -> Mengeksplorasi destinasi wisata dan membaca artikel/event.
- **Pengelola (Login):** Mengklik tombol "Masuk Pengelola" tersembunyi/di pojok -> Memasukkan kredensial statis -> Diarahkan ke Dashboard.
- **Mengelola Data:** Pengguna masuk ke halaman "Daftar Wisata". Menekan tombol besar "Tambah Wisata". Mengisi form tunggal. Menekan "Simpan". Data otomatis masuk ke LocalStorage dan muncul di Landing Page.
- **Keamanan Data:** Secara berkala, Superadmin mengklik menu "Pengaturan Data", menekan "Cadangkan Data (Backup)", dan menyimpan file `.json` ke komputer.

## 6. Requirement
### Functional Requirements:
- Sistem harus menolak login jika kredensial salah.
- Sistem harus menyembunyikan rute React jika role tidak sesuai.
- Semua form input harus memiliki validasi sederhana (wajib isi) sebelum disimpan ke LocalStorage.
- Operasi Hapus (Delete) harus memunculkan konfirmasi pencegahan kesalahan.
- Data yang dibuat admin harus otomatis terefleksi di Landing Page publik.

### Non-Functional Requirements:
- **Performa:** Aplikasi harus memuat halaman nyaris instan (kurang dari 1 detik) karena berjalan 100% di sisi klien.
- **Usability:** Maksimal 3 kali klik untuk mencapai fitur pembuatan data (Login -> Menu -> Klik Tambah).
- **Keandalan:** Jika LocalStorage korup, sistem dapat menangkap error dan mengosongkan state (graceful degradation) atau meminta restore data.

## 7. Acceptance Criteria (MVP)
- Aplikasi dapat dijalankan dengan perintah `npm run dev` atau di-build `npm run build`.
- Landing page dapat diakses tanpa hambatan dan menampilkan daftar wisata dari LocalStorage.
- Semua ke-4 akun statis dapat login dan melihat menu yang berbeda sesuai hak aksesnya.
- Superadmin dapat membuat, mengedit, melihat, dan menghapus Destinasi Wisata (beserta data turunannya), Artikel, dan Event.
- Data yang telah disimpan tetap ada saat browser di-refresh.
- Fitur Backup mengunduh file `backup-wisata.json` yang berisi seluruh state LocalStorage.
- Fitur Restore dapat membaca file `.json` dan menimpanya ke LocalStorage dengan benar.
