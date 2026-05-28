"use client";

import { useState, useEffect } from "react";
import MenuForm from "@/components/admin/MenuForm";
import MenuList from "@/components/admin/MenuList";
import EditMenuModal from "@/components/admin/EditMenuModal";
import { getAllProducts, getCategories, createProduct, updateProduct, deleteProduct } from "@/lib/database";

export default function MenuManagePage() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formKey, setFormKey] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDateTime(`${dateStr} • ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([getAllProducts(), getCategories()]);

      const productsWithCategories = productsData.map((product: any) => {
        const category = categoriesData.find((cat: any) => cat.id === product.category_id);
        return {
          ...product,
          category: category?.name || "Unknown",
        };
      });

      setMenuItems(productsWithCategories);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormKey((prev) => prev + 1);
    setEditingItem(null);
  };

  const handleAddMenu = async (formData: { name: string; category: string; price: number; status: string; description: string; image_urls?: string[] }) => {
    try {
      const categoryId = formData.category;

      if (!categoryId) {
        alert("Silakan pilih kategori terlebih dahulu");
        return;
      }

      if (editingItem) {
        // Update mode
        const result = await updateProduct(editingItem.id, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category_id: categoryId,
          is_available: formData.status === "Tersedia",
          image_urls: formData.image_urls,
        });

        if (result) {
          setMenuItems((prev) =>
            prev.map((item) =>
              item.id === editingItem.id
                ? {
                    ...item,
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                    is_available: formData.status === "Tersedia",
                    category_id: categoryId,
                    category: categories.find((cat) => cat.id === categoryId)?.name || "Unknown",
                    image_urls: formData.image_urls ? JSON.stringify(formData.image_urls) : item.image_urls,
                  }
                : item,
            ),
          );
          resetForm();
          alert("Menu berhasil diperbarui!");
        }
      } else {
        // Add mode
        const result = await createProduct({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category_id: categoryId,
          is_available: formData.status === "Tersedia",
          image_urls: formData.image_urls,
        });

        if (result) {
          setMenuItems((prev) => [
            {
              ...result,
              category_id: categoryId,
              category: categories.find((cat) => cat.id === categoryId)?.name || "Unknown",
            },
            ...prev,
          ]);
          resetForm();
          alert("Menu berhasil ditambahkan!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan menu");
    }
  };

  const handleEditMenu = (item: any) => {
    setEditingItem(item);
  };

  const handleDeleteMenu = async (id: string) => {
    try {
      const result = await deleteProduct(id);
      if (result) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
        alert("Menu berhasil dihapus!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus menu");
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const filteredItems = selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category_id === selectedCategory);

  const categoryList = [{ id: "all", name: "Semua Menu" }, ...categories];



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin text-5xl mb-4">🍽️</div>
          <p className="text-amber-700 font-semibold">Memuat data menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-amber-200 pb-4 md:pb-5">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-amber-900 tracking-tight break-words">Kelola Menu</h1>
          <p className="text-xs md:text-sm text-amber-700 mt-1">Tambah menu atau edit harga, foto, ketersediaan</p>
          <p className="text-[10px] md:text-xs font-semibold text-amber-600/80 mt-2 bg-amber-100/50 inline-block px-3 py-1 rounded-lg border border-amber-200 min-h-[28px]">{currentDateTime || "Memuat waktu..."}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Left - Form */}
        <div className="lg:col-span-1">
          <MenuForm key={formKey} onSubmit={handleAddMenu} categories={categories} />
          {editingItem && (
            <button onClick={() => resetForm()} className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors">
              ✕ Batal Edit
            </button>
          )}
        </div>

        {/* Right - Menu List with Filter */}
        <div className="lg:col-span-3 space-y-6">
          {/* Category Filter & Refresh */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categoryList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium text-xs md:text-sm transition-all ${selectedCategory === cat.id ? "bg-amber-900 text-white shadow-lg" : "bg-white text-amber-900 border-2 border-amber-200 hover:border-amber-400"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleRefresh}
              className="hidden md:inline-flex px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-full text-xs md:text-sm transition-all duration-200 items-center gap-1.5 shadow-sm active:scale-95"
              title="Refresh menu"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>

          {/* Menu List */}
          <MenuList items={filteredItems} category={selectedCategory === "all" ? "Semua Menu" : categories.find((c) => c.id === selectedCategory)?.name || ""} onEdit={handleEditMenu} onDelete={handleDeleteMenu} />
        </div>
      </div>

      {/* Edit Modal */}
      <EditMenuModal isOpen={!!editingItem} item={editingItem} categories={categories} onSubmit={handleAddMenu} onCancel={() => resetForm()} />
    </div>
  );
}
