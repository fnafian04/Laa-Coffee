# Admin Dashboard Documentation

## 📋 Struktur Admin Pages

```
app/admin/
├── layout.tsx          # Layout utama admin dengan Sidebar
├── page.tsx            # Dashboard admin
├── orders/
│   ├── page.tsx        # List pesanan (TODO)
│   └── create/
│       └── page.tsx    # Form buat pesanan (TODO)
├── payments/
│   └── validation/
│       └── page.tsx    # Validasi pembayaran (TODO)
├── menu/
│   ├── manage/
│   │   └── page.tsx    # Kelola menu (TODO)
│   └── view/
│       └── page.tsx    # Lihat menu (TODO)

components/admin/
├── Sidebar.tsx         # Sidebar navigation
└── (component tambahan akan ditambahkan)
```

## 🎨 Features yang Sudah Dibuat

### 1. Sidebar Navigation ✓

- Menu navigation untuk semua halaman admin
- Toggle collapse/expand sidebar
- Active state indicator
- Icons dan label untuk setiap menu
- Responsive design

### 2. Dashboard Admin ✓

- **Statistics Cards**: Menampilkan 4 card statistik
  - Total Menu: 10
  - Total Pesanan: 8
  - Menunggu Validasi: 3
  - Sedang Diproses: 2

- **Quick Actions**: 3 tombol aksi cepat
  - Tambah Menu
  - Validasi Pembayaran
  - Pesanan Pelanggan

- **Aktivitas Terbaru**: Placeholder untuk recent activity

### 3. Layout Admin ✓

- Responsive design dengan Sidebar tetap
- Mobile-friendly
- Gradient background & styling konsisten dengan brand

## 🚀 Halaman yang Perlu Dibuat

1. **Buat Pesanan** (`/admin/orders/create`)
2. **Validasi Pembayaran** (`/admin/payments/validation`)
3. **Pesanan Pelanggan** (`/admin/orders`)
4. **Kelola Menu** (`/admin/menu/manage`)
5. **Lihat Menu** (`/admin/menu/view`)

## 🔧 Cara Mengakses Dashboard

```bash
# Akses dashboard admin di:
# http://localhost:3000/admin
```

## 📝 Catatan untuk Pengembangan

- Sidebar memiliki toggle button untuk collapse/expand
- Semua statistik saat ini adalah static data, nanti akan diintegrasikan dengan database
- Color scheme menggunakan brand color (amber/brown)
- Menggunakan Tailwind CSS untuk styling
