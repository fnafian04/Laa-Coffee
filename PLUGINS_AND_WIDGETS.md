# Analisis Plugin dan Widget: Website Laa Coffee

Berdasarkan analisis arsitektur dan kode sumber website **Laa Coffee** (`https://laa-coffee.vercel.app/`), sistem ini telah menerapkan **6 integrasi plugin/add-on dan widget pihak ketiga** yang berjalan secara sinergis untuk meningkatkan pengalaman pengguna (UX), performa, dan fungsionalitas.

Berikut adalah rincian fungsionalitas dan cara kerja masing-masing komponen:

---

## A. Daftar Plugin yang Digunakan

### 1. Tailwind CSS (Plugin Styling & Layouting)
* **Kategori:** Utility CSS Framework
* **Dependensi:** `tailwindcss`, `postcss`, `autoprefixer` (lihat [package.json](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/package.json#L23))
* **Cara Kerja di Kode:** Menggunakan penulisan kelas utilitas Tailwind langsung di elemen JSX untuk menyusun layout responsif (`sm:`, `md:`, `lg:`), efek bayangan (*box-shadow*), gradasi warna kopi premium (`bg-gradient-to-br from-amber-950 to-amber-900`), dan efek transisi hover.
* **Fungsi:** Menghemat penulisan kode CSS manual dan membuat situs sangat responsif di layar HP maupun komputer desktop dengan desain yang mewah dan premium.

### 2. Supabase SDK (Plugin Database & Real-time Server)
* **Kategori:** Cloud Backend-as-a-Service (BaaS) SDK
* **Dependensi:** `@supabase/supabase-js` (lihat [package.json](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/package.json#L17))
* **Cara Kerja di Kode:** Bertindak sebagai penghubung asinkron antara frontend Next.js dan PostgreSQL database di cloud pada file [lib/database.ts](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/lib/database.ts).
* **Fungsi:** Melakukan transaksi penyimpanan data pesanan pelanggan, manajemen stok menu di halaman admin, validasi pembayaran, dan penarikan data kasir untuk laporan rekapitulasi penjualan harian.

### 3. Google Fonts Loader (Plugin Tipografi)
* **Kategori:** Add-on Web Font Optimization
* **Dependensi:** Modul internal Next.js `next/font/google`
* **Cara Kerja di Kode:** Mengimpor font `"Plus Jakarta Sans"` di file [layout.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/app/layout.tsx#L5) untuk diterapkan di seluruh body dokumen HTML.
* **Fungsi:** Memberikan visual tulisan sans-serif modern yang seragam dan elegan untuk menunjang desain premium website, serta mengeliminasi keterlambatan pemuatan font (*layout shifting*).

### 4. Metadata SEO Engine (Plugin Search Engine Optimization)
* **Kategori:** Add-on SEO & Meta Tag Generator
* **Cara Kerja di Kode:** Menggunakan ekspor objek `metadata` Next.js di file [layout.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/app/layout.tsx#L11).
* **Fungsi:** Menyusun tag HTML `<title>` dan `<meta name="description">` secara otomatis untuk mempermudah indeksasi mesin pencari Google serta mendukung optimasi web yang ramah perangkat seluler (*Mobile-First Indexing*).

---

## B. Daftar Widget Interaktif yang Digunakan

### 1. Widget Google Maps Interactive
* **Lokasi:** [app/page.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/app/page.tsx#L139) dan [app/about/page.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/app/about/page.tsx#L94)
* **Fungsi:** Menyajikan peta navigasi geografis interaktif kedai Laa Coffee. Pelanggan dapat berinteraksi (geser, zoom) serta mengklik tombol khusus untuk membuka peta di aplikasi Google Maps untuk melacak rute GPS.

### 2. Widget Chat WhatsApp Melayang (CS Floating Button)
* **Lokasi:** Terintegrasi di bagian bawah [Header.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/components/Header.tsx#L97) (tampil otomatis di semua halaman pelanggan).
* **Fitur Visual:** Tombol melayang berwarna hijau WhatsApp di pojok kanan bawah yang memiliki **efek mikro-animasi geser slide-out** memunculkan teks *"Takon"* saat kursor di-hover, serta diposisikan aman agar tidak menutupi navigasi bawah mobile.
* **Fungsi:** Menghubungkan pelanggan secara langsung ke nomor WhatsApp Barista/Kasir untuk bertanya seputar layanan reservasi tempat atau kendala pemesanan meja secara instan.

### 3. Widget Cetak & Generator QR Code Meja
* **Lokasi:** Dashboard Admin Utama ([app/admin/page.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/app/admin/page.tsx#L260))
* **Fitur Kerja:** Admin memilih nomor meja (1-10) lalu menekan tombol "Cetak". Sistem akan memunculkan jendela cetak (*popup print window*) baru yang bersih, memuat logo kafe, nomor meja terpilih, QR Code dinamis yang diproduksi via QR Server API, dan tombol cetak cetak instan.
* **Fungsi:** Memudahkan pemilik kafe untuk memproduksi dan mencetak stiker QR Code fisik secara mandiri untuk ditempelkan pada meja kafe masing-masing.

### 4. Widget Kustomisasi Produk (Product Customizer Modal)
* **Lokasi:** Pop-up dialog pada [ProductCustomizerModal.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/components/ProductCustomizerModal.tsx)
* **Fungsi:** Memungkinkan pembeli memilih kustomisasi suhu minuman (Panas dengan badge merah / Dingin dengan badge biru) serta menuliskan instruksi khusus (*notes*) sebelum dimasukkan ke keranjang belanja.

### 5. Widget Keranjang Belanja Pelanggan (Cart Sidebar)
* **Lokasi:** Panel laci samping [CartSidebar.tsx](file:///d:/Kuliah/Matkul/Semester%206/Techno/Laa-Coffee/components/CartSidebar.tsx)
* **Fungsi:** Mengelola perhitungan jumlah pesanan, penyesuaian kuantitas secara langsung, serta kalkulasi subtotal harga pesanan pelanggan sebelum menuju ke tahap checkout.
