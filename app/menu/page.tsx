"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import MenuSection, { Category } from "@/components/MenuSection";
import MenuCard, { Product } from "@/components/MenuCard";
import CartSidebar, { CartItemType } from "@/components/CartSidebar";

// DUMMY DATA - Ganti dengan API call ke Supabase nanti
const CATEGORIES: Category[] = [
  { id: "1", name: "Semua Menu", icon: "⭐" },
  { id: "2", name: "Minuman", icon: "☕" },
  { id: "3", name: "Makanan", icon: "🍰" },
];

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Espresso",
    description: "Kopi hitam pekat dengan cita rasa kuat",
    price: 25000,
    image_url: "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "Perpaduan espresso dengan susu foam lembut",
    price: 32000,
    image_url: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "3",
    name: "Latte",
    description: "Espresso dengan steamed milk yang creamy",
    price: 30000,
    image_url: "https://images.unsplash.com/photo-1570303342267-2d8e11b3f7c2?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "4",
    name: "Americano",
    description: "Espresso yang dicerakan dengan air panas",
    price: 28000,
    image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "5",
    name: "Nasi Goreng Special",
    description: "Nasi goreng dengan telur, ayam, dan sayuran",
    price: 35000,
    image_url: "https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "6",
    name: "Sandwich Club",
    description: "Sandwich lapis dengan daging, telur, dan sayuran segar",
    price: 40000,
    image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "7",
    name: "Pasta Carbonara",
    description: "Pasta dengan saus krim dan parmesan",
    price: 45000,
    image_url: "https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop",
    is_available: true,
  },
  {
    id: "8",
    name: "Waffle",
    description: "Waffle lezat dengan topping pilihan",
    price: 28000,
    image_url: "https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=400&h=300&fit=crop",
    is_available: false,
  },
];

export default function MenuPage() {
  const [tableNumber, setTableNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts =
    selectedCategory === "1"
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          if (selectedCategory === "2") return [1, 2, 3, 4].includes(parseInt(p.id));
          if (selectedCategory === "3") return [5, 6, 7, 8].includes(parseInt(p.id));
          return true;
        });

  // Tambah produk ke keranjang
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product_id === product.id);

      if (existingItem) {
        // Update quantity jika sudah ada
        return prev.map((item) => (item.product_id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
      }

      // Tambah item baru
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity,
        },
      ];
    });

    // Buka keranjang otomatis di mobile
    if (window.innerWidth < 768) {
      setIsCartOpen(true);
    }
  };

  // Update quantity item di keranjang
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems((prev) => prev.map((item) => (item.product_id === productId ? { ...item, quantity: newQuantity } : item)));
  };

  // Hapus item dari keranjang
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product_id !== productId));
  };

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // TODO: Integrasi dengan API untuk simpan order ke database
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    console.log("Checkout:", {
      tableNumber,
      items: cartItems,
      totalPrice,
      timestamp: new Date().toISOString(),
    });

    alert(`Pesanan dikirim ke kasir!\n\nMeja: ${tableNumber}\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`);

    // Reset keranjang setelah checkout
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-amber-50">
      <Header tableNumber={tableNumber} cartCount={cartCount} onCartClick={() => setIsCartOpen(!isCartOpen)} onAdminClick={() => alert("Redirect ke admin panel")} />

      <MenuSection categories={CATEGORIES} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Menu Grid */}
      <section className="px-4 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <MenuCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 px-4 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>📍</span> Kontak
              </h4>
              <p className="text-sm text-amber-100 mb-2">
                <strong>Alamat:</strong> Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto, Jawa Timur 61352
              </p>
              <p className="text-sm text-amber-100">
                <strong>Telepon:</strong> +62 819-9923-8377
              </p>
            </div>

            {/* Operating Hours */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🕒</span> Jam Operasional
              </h4>
              <p className="text-sm text-amber-100">
                Setiap Hari <br /> Pukul 08:00 - 22:00
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="text-sm text-amber-100 space-y-2">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    → Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-white transition">
                    → Pesan Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition" title="Tentang Kami">
                    → ℹ️ Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-700 pt-6 text-center text-sm text-amber-200">
            <p>&copy; 2026 Laa Coffee. Semua hak cipta dilindungi.</p>
            <p className="mt-2">
              Develop by{" "}
              <a href="https://instagram.com/nafiandeva" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Nafi & Eva
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onQuantityChange={handleQuantityChange} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
    </div>
  );
}
