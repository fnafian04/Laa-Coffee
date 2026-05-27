"use client";

import { useState, useEffect } from "react";
import { getCategories, getAllProducts, createOrder } from "@/lib/database";

interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  status: "Tersedia" | "Habis";
  description: string;
}

interface Category {
  id: string;
  name: string;
}

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
  quantity: number;
}

export default function BuatPesananPage() {
  // States for form
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // States for data
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, productsData] = await Promise.all([getCategories(), getAllProducts()]);

        setCategories(categoriesData || []);
        setProducts(productsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryList = [{ id: "all", name: "Semua" }, ...categories];

  const filteredProducts = products.filter((product) => (selectedCategory === "all" ? true : product.category_id === selectedCategory));

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.product_id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          image_url: "☕",
          quantity: 1,
        },
      ]);
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product_id !== productId));
  };

  // Handle quantity change
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems(cartItems.map((item) => (item.product_id === productId ? { ...item, quantity } : item)));
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!customerName || !tableNumber || !phoneNumber) {
      alert("Mohon lengkapi data pelanggan terlebih dahulu");
      return;
    }

    if (cartItems.length === 0) {
      alert("Keranjang belanja kosong");
      return;
    }

    setIsCheckingOut(true);
    try {
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const success = await createOrder({
        table_number: parseInt(tableNumber),
        customer_name: customerName,
        phone_number: phoneNumber,
        payment_method: paymentMethod,
        total_price: totalPrice,
        items: cartItems,
      });

      if (success) {
        alert("Pesanan berhasil dibuat!");
        // Reset form
        setCustomerName("");
        setTableNumber("");
        setPhoneNumber("");
        setPaymentMethod("Cash");
        setCartItems([]);
      } else {
        alert("Gagal membuat pesanan. Coba lagi.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Terjadi kesalahan saat membuat pesanan");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-900 mx-auto"></div>
            <p className="text-amber-700 mt-4">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-1 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-5">
        <div>
          <h1 className="text-3xl font-black text-amber-900 tracking-tight">Buat Pesanan Baru</h1>
          <p className="text-sm text-amber-700 mt-1">Input pesanan kasir secara offline atau manual untuk pelanggan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Customer Info Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white rounded-xl shadow-md p-6 border-2 border-amber-200">
            <h2 className="text-xl font-bold text-amber-900 mb-6">Data Pelanggan</h2>

            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Nama Pelanggan</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-900" placeholder="Nama" />
              </div>

              {/* Table Number */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Nomor Meja</label>
                <select value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-900 bg-white">
                  <option value="">Pilih Meja</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      Meja {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Nomor HP</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-900"
                  placeholder="08123456789"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Metode Pembayaran</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-900 bg-white">
                  <option value="Cash">💵 Cash</option>
                  <option value="QRIS">🔳 QRIS</option>
                  <option value="Transfer">🏦 Transfer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Menu Selection */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categoryList.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === category.id ? "bg-amber-900 text-white shadow-lg" : "bg-white text-amber-900 border-2 border-amber-200 hover:border-amber-400"}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md border-2 border-amber-100 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Placeholder Image */}
                <div className="w-full h-32 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
                  <span className="text-3xl">☕</span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-amber-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-amber-700 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-900">Rp {product.price.toLocaleString("id-ID")}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.status === "Habis"}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${product.status === "Habis" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-amber-900 text-white hover:bg-amber-800"}`}
                    >
                      {product.status === "Habis" ? "Habis" : "Tambah"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white rounded-xl shadow-md border-2 border-amber-200 overflow-hidden">
            {/* Cart Header */}
            <div className="bg-amber-900 text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>🛒</span> Keranjang
              </h2>
            </div>

            {/* Cart Items */}
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <span className="text-3xl mb-2">🛒</span>
                  <p className="text-sm text-gray-500">Keranjang kosong, tambah produk</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product_id} className="bg-gray-50 rounded-lg p-3 border border-amber-100">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-amber-900">{item.product_name}</h4>
                        <p className="text-xs text-gray-600">Rp {item.price.toLocaleString("id-ID")}</p>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.product_id)} className="text-red-500 hover:text-red-700 text-sm">
                        ✕
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-amber-200 rounded">
                        <button onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)} className="px-2 py-1 text-sm text-amber-900 hover:bg-amber-50">
                          −
                        </button>
                        <span className="px-2 py-1 text-sm font-semibold text-amber-900 min-w-6 text-center">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)} className="px-2 py-1 text-sm text-amber-900 hover:bg-amber-50">
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-amber-900">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-amber-200 p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Item:</span>
                  <span className="font-semibold text-amber-900">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} item</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-900">Total:</span>
                  <span className="text-xl font-bold text-amber-900">Rp {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${isCheckingOut ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 shadow-lg"}`}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
