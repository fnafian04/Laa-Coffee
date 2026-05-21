import React from "react";

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface MenuSectionProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function MenuSection({ categories, selectedCategory, onCategoryChange }: MenuSectionProps) {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-amber-100 px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center text-4xl mb-2">☕</div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900">Menu Kopi Kami</h2>
          <p className="text-sm md:text-base text-amber-700 italic mt-2">Nikmati berbagai pilihan kopi spesial dan makanan lezat dengan kualitas terbaik</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${
                selectedCategory === category.id ? "bg-amber-800 text-white shadow-lg" : "bg-white text-amber-900 hover:bg-amber-100 shadow"
              }`}
            >
              <span>{category.icon && `${category.icon} `}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
