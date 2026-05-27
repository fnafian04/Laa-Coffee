"use client";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmModal({ isOpen, itemName, onConfirm, onCancel, isLoading = false }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

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

      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full modal-animate">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold">Hapus Menu?</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-amber-900 font-semibold">Apakah Anda yakin ingin menghapus menu berikut?</p>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-lg font-bold text-red-700">"{itemName}"</p>
          </div>
          <p className="text-sm text-amber-700">Tindakan ini tidak dapat dibatalkan. Menu akan dihapus secara permanen.</p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex gap-3">
          <button onClick={onCancel} disabled={isLoading} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Menghapus...
              </>
            ) : (
              <>
                <span>🗑️</span>
                Hapus Menu
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
