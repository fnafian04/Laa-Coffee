"use client";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
}

interface MenuItemProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: () => void;
}

export default function MenuItem({ item, onEdit, onDelete }: MenuItemProps) {
  const statusColor = item.status === "Tersedia" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

  return (
    <div className="bg-gradient-to-r from-white to-amber-50 border-2 border-amber-200 rounded-lg p-3 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-amber-900 truncate">{item.name}</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${statusColor}`}>{item.status}</span>
          </div>
          <p className="text-xs text-amber-700 line-clamp-1">{item.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-amber-900">Rp {item.price.toLocaleString("id-ID")}</span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{item.category}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(item)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-2 py-1 rounded text-xs transition-colors">
            ✏️
          </button>
          <button onClick={onDelete} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-2 py-1 rounded text-xs transition-colors">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
