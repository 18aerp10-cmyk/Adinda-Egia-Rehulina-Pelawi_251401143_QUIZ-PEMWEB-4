
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

import Modal from "../components/AddTodoModal";
import TodoForm from "../components/TodoForm";
import ConfirmDialog from "../components/ConfirmDeleteModal";

export default function TodoList({ todos, addTodo, deleteTodo }) {
  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-600">
          Todo List
        </h1>

        <button
          onClick={() => setShowAdd(true)}
          className="rounded bg-pink-500 px-3 py-1.5 text-sm text-white hover:bg-pink-600"
        >
          Tambah Todo
        </button>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="font-bold">
            <th className="px-3 py-2">Judul</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Prioritas</th>
            <th className="px-3 py-2">Deadline</th>
            <th className="px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((t) => (
            <tr key={t.id} className="border-t border-pink-200">
              <td className="px-3 py-3">{t.title}</td>
              <td className="px-3 py-3">{t.status}</td>
              <td className="px-3 py-3">{t.priority}</td>
              <td className="px-3 py-3">{t.deadline}</td>

              <td className="px-3 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/todo/${t.id}`)}
                    className="rounded bg-pink-500 p-1.5 text-white hover:bg-pink-600"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => setToDelete(t)}
                    className="rounded bg-sky-500 p-1.5 text-white hover:bg-sky-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {todos.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">
          Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.
        </p>
      )}

      {showAdd && (
        <Modal
          title="Tambah Todo"
          onClose={() => setShowAdd(false)}
        >
          <TodoForm
            submitLabel="Tambah"
            onCancel={() => setShowAdd(false)}
            onSubmit={(data) => {
              addTodo(data);
              setShowAdd(false);
            }}
          />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          message={`Hapus tugas "${toDelete.title}"? Tindakan ini tidak dapat dibatalkan.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            deleteTodo(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </main>
  );
}