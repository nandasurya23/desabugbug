# Diagram Relasi Entitas (ERD) Konseptual

**Catatan Presentasi:** Diagram ini merupakan gambaran konseptual dari entitas data pada sistem (cocok untuk kebutuhan akademik atau presentasi non-teknis). Pada implementasi aslinya, aplikasi ini berjalan tanpa server database eksternal, melainkan menyimpan data langsung di penyimpanan perangkat pengguna (lokal). Semua rincian terkait (seperti fasilitas dan galeri) disimpan menyatu dengan entitas utamanya agar lebih efisien dan sederhana.

```mermaid
erDiagram
    PENGGUNA_SISTEM ||--o{ DATA_DESTINASI_WISATA : "Mengelola"
    PENGGUNA_SISTEM ||--o{ DATA_ARTIKEL_BERITA : "Menulis"
    PENGGUNA_SISTEM ||--o{ DATA_ACARA_DESA : "Menyelenggarakan"

    DATA_DESTINASI_WISATA {
        Teks ID_Destinasi
        Teks Nama_Tempat
        Teks Deskripsi
        Teks Status_Operasional
        Teks Harga_Tiket
        Daftar Fasilitas_Tersedia
        Daftar Foto_Galeri
        Daftar Penginapan_Terdekat
        Detail Jam_Buka
        Detail Info_Kontak
        Waktu Tanggal_Ditambahkan
    }

    DATA_ARTIKEL_BERITA {
        Teks ID_Artikel
        Teks Judul_Berita
        Teks Isi_Konten
        Teks Nama_Penulis
        Teks Gambar_Sampul
        Waktu Tanggal_Ditulis
    }

    DATA_ACARA_DESA {
        Teks ID_Acara
        Teks Nama_Acara
        Teks Lokasi
        Teks Deskripsi
        Tanggal Tanggal_Mulai
        Waktu Jam_Mulai
        Tanggal Tanggal_Selesai
        Waktu Jam_Selesai
        Teks Poster_Acara
        Teks Peta_Lokasi
        Waktu Tanggal_Ditambahkan
    }

    PENGGUNA_SISTEM {
        Teks Alamat_Email
        Teks Nama_Lengkap
        Teks Tingkat_Akses
    }
```
