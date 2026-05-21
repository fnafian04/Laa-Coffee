# 🍰 Laa Coffee - Order at Table System

Aplikasi web untuk sistem pemesanan meja interaktif di kedai kopi **Laa Coffee**. Dibangun dengan **Next.js**, **Tailwind CSS**, dan **Supabase/PostgreSQL**.

## 📋 Fitur

### Customer View (Saat Ini)

- ✅ Scan QR code untuk mendapatkan nomor meja
- ✅ Browsing menu dengan kategori (Minuman, Makanan)
- ✅ Menambah/mengurangi jumlah pesanan
- ✅ Keranjang belanja (desktop sidebar + mobile bottom sheet)
- ✅ Responsive design (mobile-first)
- ✅ Real-time cart update

### Planned Features

- 🔲 Kasir Panel - validasi pembayaran & proses order
- 🔲 Order tracking real-time
- 🔲 Payment gateway integration
- 🔲 Order history

---

## 🗂️ Struktur Project

```
.
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Customer menu page
│   ├── globals.css             # Tailwind directives
│   └── (future: admin/)        # Admin panel pages
├── components/
│   ├── Header.tsx              # Top navigation
│   ├── MenuSection.tsx         # Category tabs
│   ├── MenuCard.tsx            # Single product card
│   ├── CartItem.tsx            # Cart item component
│   └── CartSidebar.tsx         # Cart drawer/modal
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── database_schema.sql         # Supabase SQL schema
└── README.md
```

---

## 🎨 Design System

### Warna Utama

- **Brown (Header/CTA)**: `#92400E` (Tailwind: `amber-800`)
- **Light Brown (Background)**: `#FFFBF0` (Tailwind: `amber-50`)
- **Accent**: `#D97706` (Tailwind: `amber-600`)
- **White**: `#FFFFFF`

### Typography

- Font: System UI (sans-serif)
- Header: Bold 24-32px
- Body: 14-16px
- Accent: 12-14px

### Spacing

- Mobile padding: 16px
- Desktop padding: 24px
- Card gap: 16px (mobile), 24px (desktop)

---

## 📦 Setup & Installation

### Prerequisites

- Node.js 18+
- npm atau yarn
- Supabase account

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Setup Database

Jalankan semua query di `database_schema.sql` di Supabase SQL Editor.

### 4. Run Development Server

```bash
npm run dev
```

Buka http://localhost:3000

---

## 🧩 Komponen & Penggunaan

### Header

```tsx
<Header tableNumber={1} cartCount={3} onCartClick={() => setIsCartOpen(true)} />
```

### MenuCard

```tsx
<MenuCard
  product={productData}
  onAddToCart={(product, quantity) => {...}}
/>
```

### CartSidebar

```tsx
<CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onQuantityChange={handleQuantityChange} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
```

---

## 🔗 API Integration (Supabase)

### Fetch Menu Products

```tsx
const { data: products } = await supabase.from("products").select("*").eq("is_available", true);
```

### Create Order

```tsx
const { data: order } = await supabase
  .from("orders")
  .insert({
    table_id: tableId,
    table_number: 1,
    total_price: totalPrice,
    status: "pending",
    payment_status: "unpaid",
  })
  .select();

// Insert order items
await supabase.from("order_items").insert(
  cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  })),
);
```

---

## 📱 Responsiveness

### Breakpoints

- **Mobile**: < 768px (default)
- **Desktop**: ≥ 768px (md:)
- **Large Desktop**: ≥ 1024px (lg:)

### Mobile-First Approach

Semua komponen dirancang untuk mobile terlebih dahulu, kemudian di-enhance untuk desktop.

---

## ✨ Features Implementation Notes

### State Management

Menggunakan `useState` React hooks (bisa di-upgrade ke Zustand/Redux jika complexity bertambah).

### Real-time Updates

Dapat di-integrate dengan Supabase realtime subscriptions untuk live order tracking.

### Offline Support

Dapat di-add dengan Service Worker untuk offline capability.

---

## 🚀 Next Steps

1. **API Integration**: Connect ke Supabase untuk fetch products & create orders
2. **QR Code Scanner**: Implementasi QR code reader untuk auto-detect table number
3. **Kasir Panel**: Buat admin dashboard untuk validasi pembayaran
4. **Payment Gateway**: Integrasikan Midtrans/Stripe
5. **Order Tracking**: Real-time order status updates
6. **Testing**: Unit & integration tests

---

## 📞 Support

Untuk informasi lebih lanjut tentang Laa Coffee:

- 📍 Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto
- 📱 +62 819-9923-8377
- ☕ Jam operasional: 08:00 - 22:00

---

## 📄 License

Private Project - Laa Coffee 2024
