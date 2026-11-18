
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTodoModal from "../components/AddTodoModal";

export default function TodoDetail({ todos, updateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 text-sm">
        <p>Tugas tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded bg-sky-500 px-4 py-1.5 text-white hover:bg-sky-600"
        >
          Kembali
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-xl grid-cols-[1.4fr_1fr] gap-6 rounded-lg border border-pink-200 bg-white p-6 text-sm shadow-sm">
        <div>
          <h2 className="font-bold text-pink-600">Judul</h2>
          <p className="mb-3">{todo.title}</p>

          <h2 className="font-bold text-pink-600">Deskripsi</h2>
          <div className="min-h-24 rounded border border-pink-200 p-2">
            {todo.description}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-pink-600">Status</h2>
          <p className="mb-2">{todo.status}</p>

          <h2 className="font-bold text-pink-600">Prioritas</h2>
          <p className="mb-2">{todo.priority}</p>

          <h2 className="font-bold text-pink-600">Deadline</h2>
          <p className="mb-3">{todo.deadline}</p>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="rounded bg-sky-500 px-3 py-1.5 text-white hover:bg-sky-600"
            >
              Kembali
            </button>

            <button
              onClick={() => setShowEdit(true)}
              className="rounded bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <AddTodoModal
          description="Update Todo"
          todoData={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            updateTodo(todo.id, data);
          }}
        />
      )}
    </main>
  );
}
