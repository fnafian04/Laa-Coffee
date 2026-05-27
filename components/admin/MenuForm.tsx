"use client";

import { useState, useRef } from "react";

interface MenuFormProps {
  onSubmit: (formData: { name: string; category: string; price: number; status: string; description: string; image_urls?: string[] }) => void;
  categories: { id: string; name: string }[];
  existingImages?: string[];
  productId?: string;
  isEditMode?: boolean;
  item?: any;
}

const statuses = ["Tersedia", "Habis"];

export default function MenuForm({ onSubmit, categories, existingImages = [], productId, isEditMode = false, item }: MenuFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category_id || (categories.length > 0 ? categories[0].id : ""),
    price: item?.price ? String(Math.round(item.price)) : "",
    status: item?.is_available === false ? "Habis" : "Tersedia",
    description: item?.description || "",
  });

  const [images, setImages] = useState<string[]>(existingImages);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file`);
        continue;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} exceeds 5MB limit`);
        continue;
      }

      newFiles.push(file);
    }

    // Check total count
    if (images.length + uploadedFiles.length + newFiles.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      alert("Silakan isi nama menu dan harga");
      return;
    }

    setIsUploading(true);

    try {
      let uploadedUrls: string[] = [...images];

      // Upload new files if any
      if (uploadedFiles.length > 0) {
        const uploadFormData = new FormData();
        uploadedFiles.forEach((file) => {
          uploadFormData.append("files", file);
        });
        uploadFormData.append("productId", productId || Date.now().toString());

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Upload failed");
          setIsUploading(false);
          return;
        }

        const { urls } = await response.json();
        uploadedUrls = [...images, ...urls];
      }

      onSubmit({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        status: formData.status,
        description: formData.description,
        image_urls: uploadedUrls.length > 0 ? uploadedUrls : undefined,
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const totalImages = images.length + uploadedFiles.length;

  return (
    <div className={!isEditMode ? "bg-white rounded-xl border-2 border-red-300 p-8 sticky top-8 h-fit max-h-[90vh] overflow-y-auto" : ""}>
      {!isEditMode && (
        <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">➕</span> Tambah Menu Baru
        </h2>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama Menu */}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-2">Nama Menu</label>
          <input
            type="text"
            placeholder="Contoh: Espresso, Nasi Goreng"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-300"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-2">Kategori</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 bg-white"
          >
            {categories.length === 0 ? (
              <option value="">Tidak ada kategori</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Harga */}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-2">Harga (Rp)</label>
          <input
            type="number"
            placeholder="25000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-300"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 bg-white"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-2">Deskripsi</label>
          <textarea
            placeholder="Deskripsi menu..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-300 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-2">📸 Foto Menu ({totalImages}/10)</label>

          {/* Drag Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragActive ? "border-amber-600 bg-amber-50" : "border-amber-300 hover:border-amber-400 bg-amber-50/50"}`}
          >
            <div className="text-3xl mb-2">📁</div>
            <p className="text-sm font-semibold text-amber-900">Drag & drop images here</p>
            <p className="text-xs text-amber-600 mt-1">atau klik untuk memilih (Max 5MB per image)</p>
            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileInputChange} className="hidden" />
          </div>

          {/* Image Previews */}
          {totalImages > 0 && (
            <div className="mt-4 space-y-3">
              {/* Existing Images */}
              {images.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-amber-600 mb-2">Foto Existing</p>
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative group">
                        <img src={url} alt={`Existing ${idx}`} className="w-full h-20 object-cover rounded border-2 border-amber-200" />
                        <button type="button" onClick={() => removeImage(idx, true)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity">
                          <span className="text-white text-lg">✕</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-amber-600 mb-2">Upload Baru</p>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative group">
                        <img src={URL.createObjectURL(file)} alt={`New ${idx}`} className="w-full h-20 object-cover rounded border-2 border-green-300" />
                        <button type="button" onClick={() => removeImage(idx, false)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity">
                          <span className="text-white text-lg">✕</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 rounded-lg transition-all active:scale-95 disabled:cursor-not-allowed"
        >
          {isUploading ? "⏳ Uploading..." : isEditMode ? "💾 Simpan Perubahan" : "+ Tambah Menu"}
        </button>
      </form>
    </div>
  );
}
