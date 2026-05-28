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
          <button onClick={() => onEdit(item)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold p-1.5 rounded transition-colors" title="Edit Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button onClick={onDelete} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold p-1.5 rounded transition-colors" title="Hapus Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
