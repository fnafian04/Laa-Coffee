# 🚀 Quick Start Guide

## Cara Mulai Develop

### 1. Clone & Install

```bash
cd c:\ayangg\ nafii\Tubes\ Technopreneurship
npm install
```

### 2. Setup Supabase

#### A. Buat Project di Supabase

1. Buka https://supabase.com
2. Sign up atau login
3. Buat project baru
4. Copy URL dan API Key

#### B. Setup Database Schema

1. Buka SQL Editor di Supabase
2. Copy semua query dari `database_schema.sql`
3. Execute query

#### C. Buat `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server

```bash
npm run dev
```

Buka http://localhost:3000 di browser

---

## 📝 Integrasi dengan Supabase (Langkah Berikutnya)

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Buat `lib/supabase.ts`

```tsx
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Fetch Products dari Database

Edit `app/page.tsx`:

```tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CustomerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("is_available", true);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // ... rest of component
}
```

---

## 🛒 Implementasi Checkout dengan Supabase

```tsx
const handleCheckout = async () => {
  if (cartItems.length === 0) return;

  try {
    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        table_id: currentTableId, // dari QR scan
        table_number: tableNumber,
        total_price: totalPrice,
        status: "pending",
        payment_status: "unpaid",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItemsData);

    if (itemsError) throw itemsError;

    // Success
    alert(`Pesanan berhasil dikirim! Order ID: ${order.id}`);
    setCartItems([]);
    setIsCartOpen(false);
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Gagal membuat pesanan. Coba lagi.");
  }
};
```

---

## 🔐 QR Code Implementation

### 1. Install QR Code Library

```bash
npm install qrcode.react
```

### 2. Get Table from URL Params

```tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function CustomerPage() {
  const searchParams = useSearchParams();
  const tableNumber = parseInt(searchParams.get("table") || "0");
  const tableId = searchParams.get("table_id") || "";

  // ... rest of component
}
```

### 3. QR Code Scanner (Mobile)

```bash
npm install qrcode.js jsqr
```

```tsx
// components/QRScanner.tsx
import { useState } from "react";

export default function QRScanner() {
  const handleScan = async (file: File) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      // Decode QR code...
    };
  };

  return <input type="file" accept="image/*" onChange={(e) => handleScan(e.target.files![0])} />;
}
```

---

## 🎯 Testing Dummy Data

Sudah ada sample data di `database_schema.sql`. Jika perlu tambahan:

```sql
-- Add more categories
INSERT INTO categories (name, icon) VALUES ('Dessert', '🍪');

-- Add more products
INSERT INTO products (name, description, price, image_url, category_id, is_available)
VALUES (
  'Chocolate Cake',
  'Kue cokelat lembut dengan topping cokelat',
  45000,
  'https://images.unsplash.com/...',
  (SELECT id FROM categories WHERE name = 'Dessert'),
  TRUE
);
```

---

## 📦 Build untuk Production

```bash
npm run build
npm start
```

---

## 🐛 Troubleshooting

### Error: Module not found

```bash
npm install
```

### Tailwind tidak berfungsi

- Pastikan `globals.css` di-import di `layout.tsx`
- Run `npm run build` dan restart server

### Supabase connection error

- Cek URL dan API key di `.env.local`
- Pastikan Supabase project aktif
- Check browser console untuk error details

---

## 💡 Tips & Tricks

1. **Hot Reload**: Next.js auto-reload saat ada perubahan file
2. **TypeScript**: Gunakan type inference (`Ctrl+Space` di VS Code)
3. **Mobile Testing**: Gunakan Device Mode di Chrome DevTools
4. **Tailwind Classes**: Autocomplete tersedia di VS Code dengan extension

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)

---

**Happy Coding! ☕**
