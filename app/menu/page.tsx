"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import MenuSection, { Category } from "@/components/MenuSection";
import MenuCard, { Product } from "@/components/MenuCard";
import CartSidebar from "@/components/CartSidebar";
import { CartItemType } from "@/components/CartItem";
import CheckoutModal from "@/components/CheckoutModal";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import ProductCustomizerModal from "@/components/ProductCustomizerModal";
import { getCategories, getProducts, createOrder } from "@/lib/database";

export default function MenuPage() {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedCustomizeProduct, setSelectedCustomizeProduct] = useState<(Product & { category_name?: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderData, setOrderData] = useState<{
    orderNumber: string;
    customerName: string;
    tableNumber: string;
    totalPrice: number;
  } | null>(null);

  // Check for auto-open cart and table query parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      
      // Get table parameter
      const tableParam = params.get("table");
      if (tableParam) {
        const parsedTable = parseInt(tableParam);
        if (!isNaN(parsedTable) && parsedTable > 0) {
          setTableNumber(parsedTable);
        }
      }

      if (params.get("cart") === "open") {
        setIsCartOpen(true);
        // Clear search parameter without reloading page
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, productsData] = await Promise.all([getCategories(), getProducts()]);

        // Add "Semua Menu" as first category
        const allCategories: Category[] = [
          { id: "all", name: "Semua Menu", icon: "⭐" },
          ...categoriesData.map((cat: any) => {
            let icon = cat.icon || "🍽️";
            if (cat.name === "Minuman") icon = "☕";
            else if (cat.name === "Makanan") icon = "🍜";
            else if (cat.name === "Snack") icon = "🍟";
            return {
              id: cat.id,
              name: cat.name,
              icon,
            };
          }),
        ];

        // Map products to match Product interface
        const mappedProducts: Product[] = productsData.map((prod: any) => ({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          price: prod.price,
          image_url: prod.image_url,
          is_available: prod.is_available,
          category_id: prod.category_id,
          category_name: prod.category?.name,
        }));

        setCategories(allCategories);
        setProducts(mappedProducts);
        setSelectedCategory("all");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback ke data dummy jika error
        setCategories([
          { id: "all", name: "Semua Menu", icon: "⭐" },
          { id: "1", name: "Minuman", icon: "☕" },
          { id: "2", name: "Makanan", icon: "🍜" },
          { id: "3", name: "Snack", icon: "🍟" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts = selectedCategory === "all" ? products : products.filter((p) => p.category_id === selectedCategory);

  const handleMenuCardSelect = (product: Product) => {
    setSelectedCustomizeProduct(product);
    setIsCustomizerOpen(true);
  };

  // Tambah produk ke keranjang
  const handleAddToCart = (product: Product, quantity: number, temperature: string, customNotes: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product_id === product.id && item.temperature === (temperature || undefined) && item.customNotes === (customNotes || undefined));

      if (existingItem) {
        return prev.map((item) => (item.product_id === product.id && item.temperature === (temperature || undefined) && item.customNotes === (customNotes || undefined) ? { ...item, quantity: item.quantity + quantity } : item));
      }

      const newItemId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);

      return [
        ...prev,
        {
          id: newItemId,
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity,
          temperature: temperature ? (temperature as "hot" | "cold") : undefined,
          customNotes: customNotes || undefined,
        },
      ];
    });

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsCartOpen(true);
    }
  };

  // Update quantity item di keranjang
  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(cartItemId);
      return;
    }

    setCartItems((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)));
  };

  // Hapus item dari keranjang
  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutModalOpen(true);
  };

  // Handle checkout form submit
  const handleCheckoutSubmit = async (formData: { customerName: string; phoneNumber: string; tableNumber: string; paymentMethod: string }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      // Prepare order data
      const orderPayload = {
        table_number: parseInt(formData.tableNumber),
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        payment_method: formData.paymentMethod,
        total_price: totalPrice,
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          temperature: item.temperature,
          custom_notes: item.customNotes,
        })),
      };

      // Save to database
      const result = await createOrder(orderPayload);

      if (result) {
        // Set order data untuk success modal
        setOrderData({
          orderNumber: result.order_number,
          customerName: formData.customerName,
          tableNumber: formData.tableNumber,
          totalPrice,
        });

        // Close checkout modal dan open success modal
        setIsCheckoutModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        alert("Gagal membuat pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan saat memproses pesanan");
    }
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-amber-50">
      <Header tableNumber={tableNumber} cartCount={cartCount} onCartClick={() => setIsCartOpen(!isCartOpen)} onAdminClick={() => router.push("/admin")} />

      <MenuSection categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Menu Grid */}
      <section className="px-4 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin text-4xl mb-4">☕</div>
                <p className="text-amber-700 font-semibold">Memuat menu...</p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <MenuCard key={product.id} product={product} onSelect={handleMenuCardSelect} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-amber-700 text-lg font-semibold mb-2">Menu tidak tersedia</p>
              <p className="text-amber-600">Silakan coba lagi nanti</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-12 px-4 border-t border-amber-900/20 bg-amber-950">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo/Contact */}
            <div className="space-y-4">
              <Link href="/admin" className="flex items-center gap-2 select-none cursor-default">
                <span className="text-3xl">☕</span>
                <span className="text-xl font-extrabold tracking-tight">Laa Coffee</span>
              </Link>
              <p className="text-xs text-amber-200/70 leading-relaxed max-w-sm">Kedai kopi pilihan utama dengan seduhan berkualitas tinggi dan menu berselera tinggi untuk menemani momen produktif dan santai Anda.</p>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400">Jam Operasional</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Buka Setiap Hari
                <br />
                <span className="text-sm font-bold text-white mt-1 block">Pukul 08:00 - 22:00 WIB</span>
              </p>
            </div>

            {/* Navigation links */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400">Navigasi Cepat</h4>
              <ul className="text-xs text-amber-100/80 space-y-2.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    → Beranda Utama
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-white transition-colors">
                    → Pesan Menu Digital
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    → Info Kontak & Kafe
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-900/60 pt-6 text-center text-xs text-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>&copy; 2026 Laa Coffee. Semua hak cipta dilindungi.</p>
            <p>
              Developed by{" "}
              <a href="https://www.linkedin.com/in/haii-akunafiann/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-white transition-colors font-semibold">
                Nafi
              </a>{" "}
              &{" "}
              <a href="https://www.linkedin.com/in/eva-ristiyanti/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-white transition-colors font-semibold">
                Eva
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Product Customizer Modal */}
      <ProductCustomizerModal isOpen={isCustomizerOpen} product={selectedCustomizeProduct} onClose={() => setIsCustomizerOpen(false)} onAddToCart={handleAddToCart} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onQuantityChange={handleQuantityChange} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutModalOpen} cartItems={cartItems} totalPrice={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} defaultTableNumber={tableNumber} onSubmit={handleCheckoutSubmit} onCancel={() => setIsCheckoutModalOpen(false)} />

      {/* Order Success Modal */}
      {orderData && (
        <OrderSuccessModal
          isOpen={isSuccessModalOpen}
          orderNumber={orderData.orderNumber}
          customerName={orderData.customerName}
          tableNumber={orderData.tableNumber}
          totalPrice={orderData.totalPrice}
          cartItems={cartItems}
          onClose={handleSuccessClose}
        />
      )}
      {/* Floating Mobile Cart Indicator */}
      {cartCount > 0 && !isCartOpen && (
        <div
          onClick={() => setIsCartOpen(true)}
          className="md:hidden fixed bottom-20 left-4 right-4 z-40 bg-gradient-to-r from-amber-950 to-amber-900 text-white px-4 py-3.5 rounded-2xl flex items-center justify-between shadow-xl shadow-amber-950/20 active:scale-98 transition-all border border-amber-800/40 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="bg-amber-800/80 px-2.5 py-1 rounded-xl text-xs font-black tracking-wider uppercase border border-amber-700/50">{cartCount} Item</span>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-100">Rp {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black tracking-wide uppercase">
            <span>Lihat Keranjang</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
