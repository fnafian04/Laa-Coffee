"use client";

import { useState } from "react";
import MenuForm from "./MenuForm";

interface EditMenuModalProps {
  isOpen: boolean;
  item: any | null;
  categories: any[];
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EditMenuModal({ isOpen, item, categories, onSubmit, onCancel, isLoading = false }: EditMenuModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-animate {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-animate">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 sticky top-0 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>✏️</span> Edit Menu
          </h2>
          <button onClick={onCancel} className="text-white/70 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <MenuForm 
            key={item.id} 
            onSubmit={onSubmit} 
            categories={categories} 
            existingImages={(() => {
              if (item.image_urls) {
                try {
                  const parsed = JSON.parse(item.image_urls);
                  return Array.isArray(parsed) ? parsed : (item.image_url ? [item.image_url] : []);
                } catch (e) {
                  return item.image_url ? [item.image_url] : [];
                }
              }
              return item.image_url ? [item.image_url] : [];
            })()} 
            productId={item.id} 
            isEditMode={true} 
            item={item} 
          />

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button onClick={onCancel} disabled={isLoading} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
