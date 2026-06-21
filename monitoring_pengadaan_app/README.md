# Monitoring Pengadaan Barang - v18 Username Click Index

Versi ini bisa dijalankan cukup dengan double-click `index.html` dan login menggunakan **username**, bukan email.

## Login Demo

- `admin` / `demo123`
- `pbj` / `demo123`
- `kadivre` / `demo123`
- `wakadivre` / `demo123`
- `kadep_suike` / `demo123`
- `legal` / `demo123`
- `bidang_it` / `demo123`
- `bidang_umum` / `demo123`
- `kss_kph` / `demo123`

## Catatan Update

- Field login sudah menjadi `Username`.
- Validasi login memakai `user.username === inputUsername`.
- Password demo disamakan menjadi `demo123`.
- Data lama yang masih menyimpan email otomatis dimigrasikan menjadi username.
- Form User Management memakai username, bukan email.
- Aplikasi tetap dapat dibuka langsung dari `index.html` tanpa localhost.

---

# Monitoring Pengadaan Barang - Modern Web Frontend

Aplikasi frontend berbasis HTML, CSS, dan JavaScript murni. Bisa langsung dijalankan di browser tanpa instalasi.

## Cara Menjalankan
1. Ekstrak file ZIP.
2. Buka `index.html` di browser.
3. Login menggunakan akun demo.

## Akun Demo
- Admin: `admin@pengadaan.local` / `admin123`
- Bidang IT: `it@pengadaan.local` / `it123`
- Bidang Umum: `umum.bidang@pengadaan.local` / `umum123`
- PBJ: `pbj@pengadaan.local` / `pbj123`
- Kadivre: `kadivre@pengadaan.local` / `kadivre123`
- Legal: `legal@pengadaan.local` / `legal123`
- Vendor: `vendor@pengadaan.local` / `vendor123`
- KSS Sarpra KPH: `kph@pengadaan.local` / `kph123`

## Fitur Utama
- Login multi-role.
- Approval sesuai PIC tahapan aktif.
- Admin dapat melakukan semua approval dan mengatur permission.
- Input data pengadaan dibatasi untuk Bidang Terkait.
- Jika login sebagai Bidang Terkait, bidang otomatis mengikuti bidang user.
- Vendor baru dapat diisi setelah tahapan SPMK selesai.
- Masa Pelaksanaan Pekerjaan setelah SPMK dengan tanggal perjanjian sesuai kontrak.
- Alokasi barang per KPH setelah SPMK.
- Pengiriman barang harus diinput sebelum penerimaan barang.
- Monitoring total terkirim, total diterima, dan persentase realisasi.
- Role & Permission dengan pilihan LIHAT, TAMBAH, EDIT, HAPUS.
- Data demo tersimpan di localStorage browser.

## Cara Mengganti Nama Web, Logo, dan Favicon
Buka file `config.js`, lalu ubah isi berikut:

```js
window.APP_CONFIG = {
  appName: "Monitoring Pengadaan Barang",
  shortName: "MPB",
  organizationName: "Divre",
  logoUrl: "assets/logo.svg",
  faviconUrl: "assets/favicon.svg",
  primaryColor: "#2563eb",
  secondaryColor: "#0f766e",
  accentColor: "#f59e0b"
};
```

Untuk mengganti logo:
1. Simpan logo baru ke folder `assets`, misalnya `logo-perusahaan.png`.
2. Ubah `logoUrl` menjadi `assets/logo-perusahaan.png`.

Untuk mengganti favicon:
1. Simpan favicon baru ke folder `assets`, misalnya `favicon.ico`.
2. Ubah `faviconUrl` menjadi `assets/favicon.ico`.

## Catatan Produksi
Versi ini adalah frontend demo dengan localStorage. Untuk produksi, gunakan backend dan database seperti Laravel + MySQL/PostgreSQL atau Node.js + PostgreSQL.

## Update v4 - Masa Pelaksanaan Pekerjaan
- Modul **Masa Pelaksanaan Pekerjaan** sekarang memiliki form input khusus.
- Field yang tersedia: Pengadaan, Vendor Bertanggung Jawab, No PKS, Tanggal PKS, Tanggal Perjanjian, Tanggal Mulai Kontrak, Tanggal Akhir Kontrak, dan Keterangan.
- Durasi kontrak dihitung otomatis dari Tanggal Mulai Kontrak sampai Tanggal Akhir Kontrak.
- Tata waktu pada tahapan Masa Pelaksanaan Pekerjaan mengikuti periode kontrak:
  - Biru: kontrak belum mulai.
  - Hijau: kontrak berjalan dan masih aman.
  - Kuning: sisa kontrak mendekati akhir.
  - Merah: kontrak sudah melewati tanggal akhir.
- Approval Masa Pelaksanaan Pekerjaan baru bisa dilakukan jika vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir kontrak sudah diisi.

## Update v5
- Dokumen dan kelengkapan tahapan bisa dicatat langsung dari modal approval.
- Klik nama/tombol pengadaan di antrian approval langsung membuka bagian tahapan yang perlu di-approve oleh PIC.
- Form Masa Pelaksanaan, Alokasi KPH, Pengiriman, dan Penerimaan bisa dilengkapi langsung dari approval ketika menjadi syarat approve.
- Alokasi KPH mendukung multi-baris: termin, volume barang, tanggal mulai, tanggal akhir, satuan kerja, tarif, dan jenis barang bisa berbeda per baris.
- Pengiriman Barang mendukung multi-baris untuk beberapa satuan kerja/termin/volume.
- Penerimaan Barang mendukung multi-baris setelah pengiriman tersimpan.

## Update v6
- Termin dibatasi ke Langsung, Termin I, dan Termin II. Termin III dihapus.
- Semua angka utama memakai format ribuan Indonesia.
- Tampilan tanggal menggunakan format DD/MM/YYYY.
- Upload dokumen mendukung file upload dan foto dari kamera.
- Tampilan mobile diperbaiki agar tabel berubah menjadi card di HP.
- Form Pengiriman dan Penerimaan mengambil No PKS, termin, satuan kerja, jenis barang, satuan, dan tarif dari data Alokasi Barang Per KPH.
- Jenis barang, satuan, dan tarif pada form Pengiriman/Penerimaan otomatis dan tidak bisa diedit.
- No PKS memakai input searchable/dropdown dari data alokasi.
- Pilihan termin di Pengiriman/Penerimaan otomatis mengikuti termin yang ada pada alokasi: jika hanya Langsung maka terkunci Langsung, jika Termin I/II maka muncul opsi sesuai data.

## Update v7
- Monitoring PIC yang lama melakukan pekerjaan atau approval ditambahkan di halaman Monitoring Barang.
- Sistem menghitung durasi aktual per PIC sejak tahapan aktif sampai approved; status merah untuk terlambat, kuning untuk perlu dipantau, dan flexible tetap dihitung durasinya.
- Setiap tahapan approval sekarang wajib memiliki upload dokumen sebelum tombol approve aktif.
- Upload dokumen mendukung file PDF/Office/gambar dan foto langsung dari kamera perangkat.
- Form pengiriman dan penerimaan mewajibkan upload DP/dokumen di setiap baris.
- Form Approval Alur Lengkap memiliki tombol Hide/Unhide Penjelasan agar tampilan dapat dibuat ringkas atau detail.

## Update v8
- Upload DP / Nama File diperjelas menjadi upload file atau ambil foto langsung dari kamera perangkat.
- Tombol `Ambil Foto Langsung dari Kamera` membuka kamera HP/laptop melalui browser (`getUserMedia`).
- Jika browser tidak mendukung kamera langsung, sistem fallback ke input foto perangkat dengan `capture=environment`.
- Foto hasil kamera disimpan sebagai data demo di localStorage dan nama foto tersimpan di data pengiriman/penerimaan/dokumen approval.

## Update v9
- Tombol **Ambil Foto Langsung** sekarang berada di field yang sama dengan **Upload DP / File Dokumen**.
- Jika user mengambil foto dari kamera HP/laptop, nama foto otomatis masuk ke data **Upload DP / File Dokumen** pada baris pengiriman/penerimaan yang sama.
- Field dokumen tahapan approval juga dibuat satu blok: pilih file atau ambil foto langsung, keduanya tersimpan sebagai dokumen upload tahapan.

## Update v19 - Monitoring PIC Terpisah, Responsive, dan Detail Dashboard

Perubahan v19:

1. **Monitoring PIC dipisah menjadi menu/tab sendiri** sehingga tidak lagi digabung di halaman Monitoring Barang.
2. **Monitoring Barang** hanya fokus pada Total Usulan, Total Terkirim, Total Diterima, persentase kirim, dan persentase terima.
3. **Dashboard Monitoring Barang dapat diklik** pada kartu Total Usulan, Total Terkirim, dan Total Diterima untuk membuka modal detail data.
4. **Sidebar bisa di-hide/show** pada desktop dan menjadi off-canvas menu pada HP/tablet.
5. Layout diperkuat agar lebih responsive untuk desktop, tablet, dan HP.

Tetap bisa dijalankan dengan double-click `index.html` tanpa hosting.


## Update v20 - Form Approval Alur Lengkap Dihilangkan

Perubahan v20:

1. Bagian **Form Approval Alur Lengkap** di halaman Approval sudah dihilangkan agar tampilan lebih clean.
2. Halaman Approval sekarang hanya menampilkan **Antrian Approval Anda** dan daftar pengadaan yang perlu diproses PIC.
3. Detail alur per pengadaan tetap dapat dilihat ketika user membuka detail pengadaan, sehingga informasi workflow tidak hilang sepenuhnya.
4. Fitur v19 tetap dipertahankan: Monitoring PIC terpisah, sidebar responsive hide/show, dan kartu Total Usulan/Terkirim/Diterima dapat diklik.

Tetap bisa dijalankan dengan double-click `index.html` tanpa hosting.

## Update v21 - User Management, Upload Compression, Dashboard Detail

Perubahan pada versi ini:

1. User Management
   - Ditambahkan tombol Edit pada setiap user.
   - Ditambahkan tombol Hapus pada setiap user sesuai permission.
   - Username tetap unik dan otomatis dinormalisasi menjadi huruf kecil tanpa spasi.
   - Admin tidak dapat menghapus akun yang sedang dipakai login.
   - Sistem menjaga minimal satu akun Admin tetap tersedia.

2. Kompres Upload File
   - File gambar dari upload dokumen, Upload DP, dan foto kamera dikompres otomatis memakai canvas browser sebelum dicatat/disimpan.
   - Ukuran maksimal sisi gambar diset 1280px dengan kualitas JPEG 0.72.
   - File non-gambar seperti PDF/DOC/XLS hanya disimpan sebagai metadata nama file pada prototype agar ukuran localStorage tidak membengkak.
   - Catatan hasil kompresi akan tampil di bawah input file.

3. Dashboard Pengadaan per Bidang
   - Bagian Pengadaan per Bidang di dashboard sekarang bisa diklik.
   - Klik nama bidang akan membuka modal detail daftar pengadaan pada bidang tersebut.
   - Modal menampilkan total usulan, terkirim, diterima, status, dan tombol detail pengadaan.

Aplikasi tetap dapat dijalankan cukup dengan double-click `index.html`.
