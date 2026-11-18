export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded bg-pink-500 px-4 py-2 text-sm text-white shadow-lg">
      {toast.message}
    </div>
  );
}