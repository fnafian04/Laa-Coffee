# Panduan Presentasi Tugas Besar: Website Laa Coffee

Dokumen ini disusun sebagai panduan/kerangka presentasi video Tugas Besar Pemrograman Web untuk mempermudah Anda dalam menjelaskan website **Laa Coffee** secara terstruktur, profesional, dan mendapatkan nilai maksimal (termasuk nilai tambahan dari SEO dan integrasi plugin/widget baru).

---

## Informasi Proyek Utama
* **Nama Website:** Laa Coffee - Order at Table
* **URL Hosting:** [https://laa-coffee.vercel.app/](https://laa-coffee.vercel.app/)
* **Teknologi Utama:** Next.js (React), Tailwind CSS, Supabase (PostgreSQL Cloud)

---

## Kerangka & Script Presentasi Video

### Bagian 1: Tunjukkan Alamat URL Hosting (Kriteria 1)
* **Visual pada Layar:** Rekam browser yang membuka URL [https://laa-coffee.vercel.app/](https://laa-coffee.vercel.app/). Arahkan kursor dan sorot kolom URL bar untuk membuktikan website telah live di Vercel.
* **Script Presentasi:**
  > *"Halo Bapak/Ibu dosen dan rekan-rekan. Pada kesempatan kali ini, kami akan mempresentasikan hasil proyek Tugas Besar kami yaitu sistem pesan meja digital (order-at-table) untuk **Laa Coffee**. Pertama-tama, di sini kami tunjukkan bahwa website kami telah di-hosting secara online dan dapat diakses publik melalui URL **https://laa-coffee.vercel.app/** menggunakan layanan cloud Vercel."*

---

### Bagian 2: Penjelasan Site Map (Kriteria 2)
* **Visual pada Layar:** Tunjukkan visualisasi sitemap (Anda dapat menggambar bagan sitemap ini di slide presentasi atau dokumen Anda).
* **Struktur Sitemap Website Laa Coffee:**
  ```text
  [https://laa-coffee.vercel.app/] (Homepage/Landing)
  ├── [/menu] (Halaman Pesan Menu Digital)
  │    └── [ProductCustomizerModal] (Kustomisasi Item: Panas/Dingin & Catatan)
  │    └── [CartSidebar] (Keranjang Belanja Pelanggan)
  │    └── [CheckoutModal] (Pengisian Nama, No. HP, Meja, Metode Pembayaran)
  │    └── [OrderSuccessModal] (Notifikasi Pesanan Terkirim ke Kasir/Dapur)
  ├── [/about] (Profil Kafe, Informasi Operasional, Fasilitas & Peta Google Maps)
  └── [/admin] (Halaman Login Keamanan Admin / Kasir)
       ├── [/admin] (Dashboard Statistik Penjualan & Real-time)
       │    └── [Widget Cetak QR Code Meja] (Cetak Instan Label QR Code Meja 1-10)
       ├── [/admin/orders/create] (Mesin Kasir Offline untuk Input Manual Pesanan)
       ├── [/admin/payments/validation] (Validasi & Verifikasi Pembayaran Transfer/QRIS)
       ├── [/admin/orders] (Daftar Antrean Aktif di Dapur / Pemrosesan Makanan)
       ├── [/admin/settlement] (Riwayat Rekap Keuangan & Laporan Pendapatan Cash/QRIS/Transfer)
       └── [/admin/menu/manage] (Manajemen Menu: Tambah/Edit/Hapus Menu & Stok)
  ```
* **Script Presentasi:**
  > *"Website ini memiliki struktur sitemap yang dibagi menjadi dua area utama: **Area Pelanggan** dan **Area Admin/Kasir**. Pelanggan dapat mengakses halaman Beranda Utama, Halaman Menu interaktif untuk melakukan reservasi dan kustomisasi menu, serta Halaman About yang berisi kontak, fasilitas, dan peta lokasi. Sementara itu, Area Admin dilindungi halaman login keamanan dan membawahi dashboard statistik, input kasir manual, validasi transaksi masuk, antrean dapur, laporan settlement keuangan, serta manajemen stok menu."*

---

### Bagian 3: Fungsi dan Menu pada Website (Kriteria 3 & 4)
* **Visual pada Layar:** Lakukan demo interaksi langsung di website Anda.
  1. Buka halaman `/menu`. Pilih salah satu minuman (misalnya kopi), klik "+ Beli".
  2. Buka opsi kustomisasi (pilih "Dingin/Panas", isi catatan "esnya dikit").
  3. Buka keranjang belanja di sebelah kanan, klik "Checkout".
  4. Isi formulir checkout (Nama, Meja, pilih pembayaran "QRIS"). Klik "Pesan Sekarang".
  5. Tunjukkan tombol **WhatsApp CS Widget** hijau melayang di kanan bawah. Hover kursor di atasnya untuk memperlihatkan animasi slide-out teks *"Takon"*.
* **Script Presentasi:**
  > *"Fungsi utama dari website ini adalah memfasilitasi transaksi mandiri di meja (Order-at-Table). Di halaman Menu, pelanggan dapat melihat menu yang tersedia, memfilter kategori, serta melakukan kustomisasi seperti pilihan suhu panas/dingin dan catatan khusus sebelum memasukkannya ke keranjang belanja. Proses checkout berjalan instan dengan mengisi nomor meja dan memilih metode pembayaran. Kami juga menyertakan **Widget WhatsApp CS Melayang** di pojok kanan bawah yang dilengkapi animasi hover teks 'Takon' agar pelanggan dapat langsung menghubungi staf kami bila membutuhkan bantuan langsung dari meja."*

* **Visual pada Layar:** Masuk ke area admin `/admin` (login) dan tunjukkan halaman berikut:
  1. **Dashboard:** Tunjukkan sapaan *"Haloo mama dan bapak 😁"* dan jam dinamis yang berjalan di kanan atas.
  2. **Widget Cetak QR Code Meja:** Pilih salah satu meja (misal Meja 3), lalu klik tombol "Cetak". Tunjukkan pop-up print window yang memuat stiker QR Code bermerek Laa Coffee siap cetak.
  3. **Validasi Pembayaran:** Tunjukkan pesanan QRIS/Transfer yang baru saja dibuat di langkah sebelumnya menunggu divalidasi. Klik "Validasi & Proses".
  4. **Antrean Dapur:** Tunjukkan pesanan berpindah ke antrean dapur "Diproses". Klik "Selesaikan Pesanan".
* **Script Presentasi:**
  > *"Di sisi Admin Panel, terdapat menu kasir dan dapur yang terintegrasi secara real-time. Pada dashboard utama, kami menyediakan **Widget Cetak QR Code Meja**. Kasir tinggal memilih nomor meja dan mengklik cetak untuk memproduksi stiker QR Code meja secara instan. Selain itu, kasir dapat memverifikasi pembayaran non-tunai di menu Validasi Pembayaran. Setelah divalidasi, pesanan akan secara otomatis masuk ke halaman Antrean Dapur untuk diproses dan diselesaikan oleh bagian dapur."*

---

### Bagian 4: Penggunaan Add-On dan Plugin (Kriteria 5)
* **Visual pada Layar:** Buka file `package.json` di text editor untuk menunjukkan `@supabase/supabase-js`, lalu tunjukkan kembali Google Maps dan tombol WhatsApp di browser.
* **Script Presentasi:**
  > *"Website kami menerapkan minimal 3 plugin utama dan widget interaktif untuk mendukung fungsionalitasnya:
  > 1. **Plugin Supabase JS SDK:** Terpasang pada dependensi Next.js untuk menghubungkan frontend ke layanan database PostgreSQL secara real-time.
  > 2. **Widget Google Maps Interactive:** Tersemat di halaman About untuk memetakan lokasi fisik kedai kopi.
  > 3. **Widget Chat WhatsApp Melayang:** Plugin fungsionalitas obrolan CS instan dengan animasi hover yang responsif untuk menunjang tampilan interaktif.
  > 4. **Widget Cetak & Generator QR Code Meja:** Memanfaatkan integrasi QR Server API untuk memproduksi QR Code meja pelanggan secara dinamis langsung dari dashboard admin."*

---

### Bagian 5: Pembuktian Implementasi SEO - Nilai Tambahan (Kriteria 6)
* **Visual pada Layar:** Tunjukkan kode pada file [layout.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/app/layout.tsx#L11-L20) yang memuat deklarasi objek `metadata`. Jelaskan manfaatnya.
* **Script Presentasi:**
  > *"Untuk mendapatkan nilai tambah, kami juga telah mengimplementasikan **Search Engine Optimization (SEO) Best Practices**:
  > 1. **Next.js Metadata API:** Kami mendaftarkan meta tag deskripsi yang kaya kata kunci serta tag judul dinamis agar website terindeks dengan baik dan menarik di halaman pencarian Google.
  > 2. **Responsive Viewport Meta:** Memastikan skala website responsif 100% di perangkat mobile, yang merupakan aspek penilaian utama Google Core Web Vitals untuk peringkat SEO mobile-first.
  > 3. **Semantic HTML5:** Kami menggunakan struktur tag HTML5 semantik seperti `<header>`, `<main>`, `<footer>`, dan hierarki heading `<h1>` s/d `<h4>` yang rapi."*

---

### Bagian 6: Penutup
* **Script Presentasi:**
  > *"Demikian presentasi aplikasi meja digital Laa Coffee dari kelompok kami. Sistem ini siap mempermudah operasional kedai kopi secara modern, efisien, dan ramah pengguna. Terima kasih atas perhatiannya!"*
