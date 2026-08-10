# Flowchart Aplikasi

*(Untuk membuka di Draw.io: Salin masing-masing blok kode di bawah ini satu-per-satu, lalu di Draw.io klik **Arrange > Insert > Advanced > Mermaid**, paste kode, lalu klik Insert)*

### 1. Alur Pengunjung Publik & Login
```mermaid
graph TD
    %% PUBLIC FLOW %%
    P1["Buka Aplikasi"] --> P2["Tampil Landing Page Publik"]
    P2 --> P3["Eksplorasi: Lihat Daftar Wisata, Artikel, Event"]
    P3 --> P5["Lihat Detail Spesifik"]
    P2 --> P4["Klik Link Akses Pengelola / Login Admin"]

    %% LOGIN FLOW %%
    P4 --> A["Masuk Halaman Login"]
    A --> B{"Apakah Sesi Aktif?"}
    B -- Ya --> C["Masuk Dashboard Pengelola"]
    B -- Tidak --> D["Form Login"]
    D --> E{"Input Email & Password"}
    E --> F{"Cek Daftar Akun Statis"}
    F -- Valid --> G["Simpan Sesi & Hak Akses"]
    G --> C
    F -- Tidak Valid --> H["Tampilkan Pesan Error"]
    H --> D
```

### 2. Alur Pembagian Hak Akses
```mermaid
graph TD
    C["Masuk Dashboard Pengelola"] --> I{"Sistem Membaca Peran Akun"}
    I -- Sebagai Superadmin --> SA["Lanjut ke Alur Kerja 1"]
    I -- Sebagai Admin --> AD["Lanjut ke Alur Kerja 2"]
    I -- Sebagai Humas --> HM["Lanjut ke Alur Kerja 3"]
    I -- Sebagai Pengelola Wisata --> PW["Lanjut ke Alur Kerja 4"]
```

### 3. Alur Kerja 1: Superadmin (Pengurus Inti)
```mermaid
graph TD
    SA1["Akses Penuh: Wisata, Berita, Acara, Pengaturan"]
    SA1 --> SA2["Melihat Daftar & Detail Semua Data (READ)"]
    SA2 --> SA3{"Pilih Tindakan"}
    SA3 -- Ingin Menambah --> SA4["Mengisi Form & Menyimpan Data Baru (CREATE)"]
    SA4 --> SA2
    SA3 -- Ingin Memperbarui --> SA5["Mengedit Data yang Sudah Ada (UPDATE)"]
    SA5 --> SA2
    SA3 -- Ingin Menghapus --> SA6["Menghapus Data Secara Permanen (DELETE)"]
    SA6 --> SA2
```

### 4. Alur Kerja 2: Administrator Desa
```mermaid
graph TD
    AD1["Akses: Wisata, Berita, Acara (Tanpa Pengaturan)"]
    AD1 --> AD2["Melihat Daftar Data Operasional (READ)"]
    AD2 --> AD3{"Pilih Tindakan"}
    AD3 -- Tambah Data --> AD4["Membuat Data Baru (CREATE)"]
    AD4 --> AD2
    AD3 -- Ubah Data --> AD5["Memperbarui Informasi (UPDATE)"]
    AD5 --> AD2
    AD3 -- Hapus Data --> AD6["Menghapus Data (DELETE)"]
    AD6 --> AD2
```

### 5. Alur Kerja 3: Penulis Konten (Humas)
```mermaid
graph TD
    HM1["Akses Khusus: Hanya Modul Berita/Artikel"]
    HM1 --> HM2["Membaca Daftar Berita yang Pernah Ditulis (READ)"]
    HM2 --> HM3{"Pilih Tindakan"}
    HM3 -- Tulis Berita --> HM4["Menulis & Menerbitkan Berita Baru (CREATE)"]
    HM4 --> HM2
    HM3 -- Revisi Teks --> HM5["Memperbaiki Isi Berita (UPDATE)"]
    HM5 --> HM2
    HM3 -- Tarik Berita --> HM6["Menghapus Berita (DELETE)"]
    HM6 --> HM2
```

### 6. Alur Kerja 4: Pengelola Tempat Wisata
```mermaid
graph TD
    PW1["Akses Khusus: Hanya Modul Destinasi Wisata"]
    PW1 --> PW2["Melihat Daftar Tempat Wisata (READ)"]
    PW2 --> PW3{"Pilih Tindakan"}
    PW3 -- Buka Tempat Baru --> PW4["Mendaftarkan Wisata Baru (CREATE)"]
    PW4 --> PW2
    PW3 -- Perbarui Info --> PW5["Mengubah Detail Harga/Fasilitas (UPDATE)"]
    PW5 --> PW2
    PW3 -- Tutup Tempat --> PW6["Menghapus Tempat Wisata (DELETE)"]
    PW6 --> PW2
```

### 7. Alur Pencadangan & Pemulihan Data
```mermaid
graph TD
    W["Buka Menu Pengaturan Data"] --> X{"Pilih Tindakan"}
    X -- Unduh Cadangan Data --> Y["Kumpulkan Semua Data Sistem Saat Ini"]
    Y --> Z["Bungkus Menjadi Sebuah File Cadangan"]
    Z --> AA["Unduh File ke Perangkat backup.json"]
    X -- Pulihkan Data --> AB["Unggah File Cadangan"]
    AB --> AC["Baca & Periksa Isi File Cadangan"]
    AC --> AD{"Apakah Format File Benar?"}
    AD -- Benar --> AE["Gantikan Data Sistem Saat Ini dengan Data dari File"]
    AE --> AF["Muat Ulang Aplikasi & Tampilan Utama"]
    AD -- Salah --> AG["Tolak Unggahan & Tampilkan Pesan Kesalahan"]
```
