import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function TodoForm({
  id,
  judul,
  status,
  prioritas,
  deadline,
  onDelete,
}) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  function handleDelete() {
    onDelete();
    setConfirm(false);
  }

  return (
    <tr className="border-t border-pink-200">
      <td className="px-3 py-3">{judul}</td>
      <td className="px-3 py-3">{status}</td>
      <td className="px-3 py-3">{prioritas}</td>
      <td className="px-3 py-3">{deadline}</td>

      <td className="px-3 py-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => navigate(`/todo/${id}`)}
            className="rounded bg-pink-500 p-1.5 text-white hover:bg-pink-600"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => setConfirm(true)}
            className="rounded bg-sky-500 p-1.5 text-white hover:bg-sky-600"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {confirm && (
          <ConfirmDeleteModal
            onClose={() => setConfirm(false)}
            onContinue={() => handleDelete()}
            message={`Hapus tugas "${judul}"? Tindakan ini tidak dapat dibatalkan.`}
          />
        )}
      </td>
    </tr>
  );
}