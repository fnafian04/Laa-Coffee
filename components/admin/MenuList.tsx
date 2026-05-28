"use client";

import { useState } from "react";
import MenuItem from "./MenuItemDisplay";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface MenuListProps {
  items: any[];
  category: string;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function MenuList({ items, category, onEdit, onDelete }: MenuListProps) {
  const categoryIcon = category.includes("Minuman") ? "☕" : category.includes("Makanan") ? "🍜" : category.includes("Snack") ? "🍟" : "🍽️";
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: any | null; isLoading: boolean }>({
    isOpen: false,
    item: null,
    isLoading: false,
  });

  const handleDeleteClick = (item: any) => {
    setDeleteModal({ isOpen: true, item, isLoading: false });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.item) return;

    setDeleteModal((prev) => ({ ...prev, isLoading: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      onDelete(deleteModal.item.id);
      setDeleteModal({ isOpen: false, item: null, isLoading: false });
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border-2 border-amber-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2">
            <span className="text-2xl">{categoryIcon}</span> {category}
          </h2>
          <div className="flex items-center gap-3">
            <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-sm">{items.length} menu</span>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
            {items.map((item) => (
              <MenuItem key={item.id} item={item} onEdit={onEdit} onDelete={() => handleDeleteClick(item)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-amber-700 text-lg font-semibold">Belum ada menu</p>
            <p className="text-amber-600 text-sm">Tambahkan menu baru menggunakan form di sebelah kiri</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        itemName={deleteModal.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, item: null, isLoading: false })}
        isLoading={deleteModal.isLoading}
      />
    </>
  );
}
