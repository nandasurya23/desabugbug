# Data Flow Diagram (DFD) Aplikasi Desa Bugbug

Dokumen ini berisi representasi Data Flow Diagram (DFD) Level 0 (Context Diagram) dan Level 1 yang diturunkan dari alur kerja aplikasi (Flowchart), dan telah disesuaikan dengan **Standar Akademik (Kaidah Yourdon/DeMarco & Gane/Sarson)**:
1. **Nomor Proses**: Menggunakan `0.0` untuk sistem utama, dan `1.0`, `2.0` untuk turunan.
2. **Proses (Kata Kerja)**: Nama proses harus berupa kata kerja (contoh: *Mengelola Data*).
3. **Data Flow (Kata Benda)**: Label panah aliran data harus berupa nama paket data, bukan aktivitas (contoh: *Data Kredensial*, bukan *Input Login*).
4. **Validitas Entitas & Data Store**: Data Store tidak boleh terhubung langsung dengan Entitas atau Data Store lain.

*(Untuk membuka di Draw.io: Salin masing-masing blok kode di bawah ini satu-per-satu, lalu di Draw.io klik **Arrange > Insert > Advanced > Mermaid**, paste kode, lalu klik Insert)*

### 1. DFD Level 0 (Context Diagram)
Menggambarkan batasan sistem (Sistem Informasi Pariwisata Desa) dengan entitas luar (Terminator).

```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor":"#ffffff", "primaryBorderColor":"#000000", "primaryTextColor":"#000000", "lineColor":"#000000", "secondaryColor":"#ffffff", "tertiaryColor":"#ffffff"}, "flowchart": {"curve": "step"}}}%%
graph TD
    E1["Pengunjung Publik"]
    E2["Pengelola"]

    P0((0.0\nSistem Informasi\nPariwisata Desa))

    E1 -- "Data Permintaan Akses Halaman" --> P0
    P0 -- "Informasi Pariwisata, Berita, & Acara" --> E1

    E2 -- "Data Kredensial (Email & Password)" --> P0
    P0 -- "Informasi Sesi & Hak Akses" --> E2

    E2 -- "Data Operasional (Wisata, Berita, Acara)\nPerintah Pencadangan/Pemulihan" --> P0
    P0 -- "Laporan Manipulasi Data\nStatus Pencadangan Data" --> E2
```

### 2. DFD Level 1
Merinci proses (0.0) menjadi sub-proses operasional berdasarkan fungsi-fungsi sistem, serta melibatkan tempat penyimpanan (Data Store).

```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor":"#ffffff", "primaryBorderColor":"#000000", "primaryTextColor":"#000000", "lineColor":"#000000", "secondaryColor":"#ffffff", "tertiaryColor":"#ffffff"}, "flowchart": {"curve": "step"}}}%%
graph TD
    E1["Pengunjung Publik"]
    E2["Pengelola"]

    P1((1.0\nMenyajikan\nInformasi Publik))
    P2((2.0\nMemvalidasi\nAkses Login))
    P3((3.0\nMengelola Data\nOperasional))
    P4((4.0\nMemanajemen\nPencadangan Data))

    D1[[D1 Data Operasional]]
    D2[[D2 Data Akun]]
    D3[[D3 File Backup]]

    E1 -- "Data Permintaan Halaman" --> P1
    P1 -- "Informasi Tampilan Publik" --> E1
    D1 -- "Detail Data Wisata, Berita, Acara" --> P1

    E2 -- "Data Kredensial Login" --> P2
    P2 -- "Status Otorisasi Akses" --> E2
    D2 -- "Data Akun Terdaftar" --> P2

    E2 -- "Data Input (Wisata, Berita, Acara)" --> P3
    P3 -- "Laporan Hasil Manipulasi Data" --> E2
    P3 -- "Data Perubahan Baru" --> D1
    D1 -- "Data Historis (Untuk Referensi/Ubah/Hapus)" --> P3

    E2 -- "Perintah Backup / Restore" --> P4
    P4 -- "Laporan Status Eksekusi File" --> E2
    D1 -- "Kumpulan Seluruh Data Sistem" --> P4
    P4 -- "Data Pemulihan (Restore)" --> D1
    P4 -- "Data Arsip Mentah" --> D3
    D3 -- "Data Berkas Cadangan" --> P4
```

### 3. DFD Level 2 (Ledakan Proses 3.0 - Mengelola Data Operasional)
Karena di dalam flowchart terdapat 7 alur spesifik (termasuk alur kerja *Superadmin*, *Admin*, *Humas*, dan *Pengelola Wisata*), maka **Proses 3.0** di Level 1 harus "diledakkan" (di-*breakdown*) menjadi DFD Level 2. Diagram ini menjelaskan secara detail bagaimana setiap *Role* berinteraksi dengan sumber data yang spesifik (Wisata, Berita, Acara).

```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor":"#ffffff", "primaryBorderColor":"#000000", "primaryTextColor":"#000000", "lineColor":"#000000", "secondaryColor":"#ffffff", "tertiaryColor":"#ffffff"}, "flowchart": {"curve": "step"}}}%%
graph TD
    E2A["Pengelola (Superadmin & Admin)"]
    E2B["Pengelola (Humas)"]
    E2C["Pengelola (Pengelola Wisata)"]

    P31((3.1\nMengelola Data\nWisata))
    P32((3.2\nMengelola Data\nBerita))
    P33((3.3\nMengelola Data\nAcara))

    D11[[D1.1 Data Wisata]]
    D12[[D1.2 Data Berita]]
    D13[[D1.3 Data Acara]]

    E2A -- "Data Input Wisata" --> P31
    E2C -- "Data Input Wisata" --> P31
    P31 -- "Laporan Data Wisata" --> E2A
    P31 -- "Laporan Data Wisata" --> E2C
    P31 -- "Pembaruan Data Wisata" --> D11
    D11 -- "Data Historis Wisata" --> P31

    E2A -- "Data Input Berita" --> P32
    E2B -- "Data Input Berita" --> P32
    P32 -- "Laporan Data Berita" --> E2A
    P32 -- "Laporan Data Berita" --> E2B
    P32 -- "Pembaruan Data Berita" --> D12
    D12 -- "Data Historis Berita" --> P32

    E2A -- "Data Input Acara" --> P33
    P33 -- "Laporan Data Acara" --> E2A
    P33 -- "Pembaruan Data Acara" --> D13
    D13 -- "Data Historis Acara" --> P33
```
