"use client";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg border border-amber-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-amber-900">{item.name}</h3>
        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">{item.category}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-amber-900">Rp {item.price.toLocaleString("id-ID")}</span>
        <button onClick={() => onAdd(item)} className="bg-amber-100 hover:bg-amber-200 text-amber-900 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors">
          +
        </button>
      </div>
    </div>
  );
}
