# BUKU PANDUAN PENGGUNAAN APLIKASI DESA WISATA

Buku panduan ini disusun khusus untuk Perangkat Desa dan Pengelola Wisata agar dapat menggunakan Aplikasi Manajemen Desa Wisata dengan mudah dan cepat, tanpa perlu pemahaman teknis.

---

## 1. PENGENALAN APLIKASI
### Tujuan Aplikasi
Aplikasi ini dibuat agar desa dapat mencatat, mengubah, dan memamerkan data destinasi wisata, acara (event) desa, dan berita-berita terbaru kepada warga maupun wisatawan. 

### Manfaat Aplikasi
- Mudah digunakan oleh siapa saja, tombolnya besar dan bahasanya jelas.
- Tidak butuh internet cepat (data disimpan langsung di komputer Anda).
- Cepat dan tidak mudah rusak.

### Cara Menggunakan Aplikasi
Aplikasi ini langsung bisa dibuka melalui *Browser* (Google Chrome / Mozilla Firefox) yang ada di komputer balai desa.

---

## 2. LOGIN (MASUK KE SISTEM)
Untuk mencegah orang luar mengubah data, Anda harus masuk (login) menggunakan akun yang sudah disediakan.

### Cara Login:
1. Buka halaman utama aplikasi.
2. Masukkan **Username** dan **Password** pada kotak yang disediakan.
3. Klik tombol hijau besar bertuliskan **"Masuk"**.

### Daftar Akun Bawaan:
Anda dapat menggunakan salah satu dari akun berikut sesuai dengan jabatan Anda:
- **Kepala Desa / Sekdes (Superadmin)**
  - Username: `superadmin@gmail.com`
  - Password: `superadmin`
- **Staf Kantor Desa (Admin)**
  - Username: `admin@gmail.com`
  - Password: `admin`
- **Bagian Informasi/Humas (Penulis Konten)**
  - Username: `penuliskonten@gmail.com`
  - Password: `penuliskonten`
- **Ketua Pengelola Tempat Wisata (Penanggung Jawab Wisata)**
  - Username: `wisataalam@gmail.com`
  - Password: `Wisataalam-12`

### Cara Logout (Keluar):
Selalu ingat untuk keluar jika komputer akan ditinggalkan!
1. Lihat pojok kanan atas layar Anda.
2. Klik tombol **"Keluar"** atau lambang pintu.

---

## 3. DASHBOARD (HALAMAN UTAMA)
Setelah berhasil login, Anda akan melihat **Dashboard**. 
Di bagian kiri layar, terdapat Menu Navigasi (Tombol-tombol jalan pintas) seperti:
- **Beranda (Dashboard):** Melihat ringkasan jumlah wisata, artikel, dan event yang ada.
- **Kelola Wisata:** Tempat untuk menambah atau mengubah data tempat wisata.
- **Berita & Artikel:** Tempat untuk menulis kabar terbaru desa.
- **Acara / Event:** Tempat mencatat jadwal acara desa.
- **Pengaturan Data:** (Hanya Superadmin) Tempat untuk mencadangkan data.

*Catatan: Jika Anda tidak melihat menu tertentu, artinya akun Anda memang tidak diberi izin untuk mengubah bagian tersebut.*

---

## 4. PANDUAN SETIAP MENU

### A. Kelola Wisata (Destinasi)
**Fungsi:** Menyimpan informasi tempat wisata, fasilitas, dan harga tiket.
- **Cara Membuka:** Klik menu "Kelola Wisata" di sebelah kiri.
- **Cara Menambah Data:** 
  1. Klik tombol **"+ Tambah Wisata Baru"**.
  2. Isi formulir yang muncul (Nama, Deskripsi, Fasilitas, Jam Buka).
  3. Klik tombol **"Simpan Data"**.
- **Cara Mengubah Data:** Klik tombol **"Edit"** (warna kuning/biru) pada baris nama wisata yang ingin diubah, perbaiki tulisannya, lalu klik "Simpan".
- **Cara Menghapus Data:** Klik tombol **"Hapus"** (warna merah). Akan muncul peringatan, klik "Ya, Hapus" jika Anda yakin.

### B. Berita & Artikel
**Fungsi:** Menulis pengumuman atau berita desa.
- **Cara Menambah Berita:** Klik "Berita & Artikel" -> Klik "+ Tulis Berita" -> Isi Judul dan Isi Berita -> Klik "Simpan".

### C. Acara (Event)
**Fungsi:** Mengumumkan acara seperti Festival Desa atau Jalan Sehat.
- **Cara Menambah Acara:** Sama seperti menambah berita. Pastikan Anda mengisi Tanggal Mulai dan Tanggal Selesai acara tersebut.

---

## 5. HAK AKSES PENGGUNA (SIAPA BISA APA?)
Sistem ini membagi tugas secara otomatis agar data tidak berantakan:
- **Superadmin:** Bisa melakukan semuanya tanpa batasan.
- **Admin:** Bisa menambah wisata, berita, dan acara, tapi tidak bisa mengakses "Pengaturan Data".
- **Penulis Konten:** Hanya bisa menulis dan menghapus Berita. Tidak bisa mengganggu gugat data wisata.
- **Penanggung Jawab Wisata:** Hanya bisa mengatur data Wisata. Tidak bisa menulis berita atau acara.

---

## 6. PENGAMANAN DATA (SANGAT PENTING!)
Karena aplikasi ini menyimpan data secara lokal di dalam *browser* komputer ini, **data bisa hilang jika Anda membersihkan riwayat browser (Clear Data/Cache)**. 
Oleh karena itu, Anda **WAJIB** melakukan Backup (Pencadangan) secara rutin!

### Cara Backup Data (Pencadangan):
1. Minta Superadmin untuk login.
2. Klik menu **"Pengaturan Data"**.
3. Klik tombol **"Cadangkan Data (Backup)"**.
4. Akan ada sebuah file `backup-wisata.json` yang ter-download ke komputer Anda. 
5. Pindahkan file tersebut ke Flashdisk sebagai cadangan aman.

### Cara Restore Data (Mengembalikan Data yang Hilang):
Jika suatu hari data kosong, jangan panik!
1. Buka menu **"Pengaturan Data"**.
2. Di bagian "Pulihkan Data", klik **"Pilih File"**.
3. Cari file `backup-wisata.json` di Flashdisk Anda.
4. Klik **"Kembalikan Data"**. Layar akan berkedip sesaat, dan data Anda akan kembali seperti semula.

*(Export dan Import Data menggunakan cara yang persis sama dengan Backup dan Restore)*

---

## 7. FAQ (Pertanyaan yang Sering Muncul)

**T: Saya sudah tambah data, tapi kok teman saya yang buka dari laptopnya di rumah tidak bisa melihat datanya?**
J: Aplikasi ini khusus berjalan *Lokal* di komputer tempat Anda mengetik. Jika ingin memindahkan datanya ke laptop teman, gunakan fitur **Backup Data**, bawa flashdisknya ke laptop teman, lalu lakukan **Restore Data**.

**T: Kok tombol Tambah Berita tidak ada di layar saya?**
J: Kemungkinan Anda masuk menggunakan akun "Penanggung Jawab Wisata". Anda hanya bisa mengurus wisata. Minta tolong "Penulis Konten" untuk membuatkan beritanya.

---

## 8. TROUBLESHOOTING (PEMECAHAN MASALAH)

- **Masalah:** Aplikasi berjalan sangat lambat atau macet.
  **Solusi:** Tutup aplikasi (Browser) lalu buka kembali. (Tutup tab (x) lalu buka ulang).
  
- **Masalah:** Gambar tidak muncul.
  **Solusi:** Pastikan saat Anda memasukkan gambar, gambar tersebut ukurannya tidak terlalu besar, karena memori penyimpanan browser terbatas.

- **Masalah:** Tiba-tiba semua data hilang saat komputer mati lampu!
  **Solusi:** Segera lakukan **Restore Data** menggunakan file Backup terbaru yang Anda simpan di Flashdisk.

---
*(Buku Panduan ini siap dicetak untuk dibagikan kepada Perangkat Desa)*
