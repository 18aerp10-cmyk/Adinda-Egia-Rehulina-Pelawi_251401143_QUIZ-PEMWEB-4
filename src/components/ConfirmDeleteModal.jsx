export default function ConfirmDeleteModal({ onClose, onContinue, message }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={() => onClose()}
    >
      <div
        className="w-full max-w-sm rounded-md bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-3 text-center text-sm font-bold">Konfirmasi Hapus</h2>
        <p className="mb-4 text-center text-sm">{message}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <button
            onClick={() => onClose()}
            type="button"
            className="rounded bg-gray-400 py-1.5 text-white hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            onClick={() => onContinue()}
            type="button"
            className="rounded bg-sky-500 py-1.5 text-white hover:bg-sky-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
