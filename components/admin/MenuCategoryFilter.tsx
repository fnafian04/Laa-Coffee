"use client";

interface MenuCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function MenuCategoryFilter({ categories, selectedCategory, onCategoryChange }: MenuCategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedCategory === category ? "bg-amber-700 text-white" : "bg-amber-100 text-amber-900 hover:bg-amber-200"}`}
        >
          {category === "Semua" ? "🍽️ Semua" : category === "Minuman" ? "🥤 Minuman" : "🍗 Makanan"}
        </button>
      ))}
    </div>
  );
}
