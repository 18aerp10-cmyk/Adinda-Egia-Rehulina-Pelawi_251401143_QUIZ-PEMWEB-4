import { useState } from "react";

export default function AddTodoModal({
  onClose,
  onSubmit,
  description,
  todoData,
}) {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: todoData?.title || "",
    description: todoData?.description || "",
    status: todoData?.status || "to-do",
    priority: todoData?.priority || "low",
    deadline: todoData?.deadline || "",
  });

  function handleChange(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!data.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!data.deadline) newErrors.deadline = "Deadline wajib diisi";
    setErrors(newErrors);

    if (Object.keys(newErrors).length != 0) return;

    onSubmit({ ...data, title: data.title.trim() });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-md bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-3 text-center text-sm font-bold">{description}</h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="mb-1 block font-bold">Judul</label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full rounded border border-pink-200 bg-white px-2 py-1 text-sm outline-none focus:border-pink-400"
            />
            {errors.title && (
              <p className="mt-1 text-pink-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-bold">Deskripsi</label>
            <textarea
              name="description"
              rows={3}
              value={data.description}
              onChange={handleChange}
              className="w-full rounded border border-pink-200 bg-white px-2 py-1 text-sm outline-none focus:border-pink-400"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-bold">Status</label>
              <select
                name="status"
                value={data.status}
                onChange={handleChange}
                className="w-full rounded border border-pink-200 bg-white px-2 py-1 text-sm outline-none focus:border-pink-400"
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-bold">Prioritas</label>
              <select
                name="priority"
                value={data.priority}
                onChange={handleChange}
                className="w-full rounded border border-pink-200 bg-white px-2 py-1 text-sm outline-none focus:border-pink-400"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-bold">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={data.deadline}
              onChange={handleChange}
              className="w-full rounded border border-pink-200 bg-white px-2 py-1 text-sm outline-none focus:border-pink-400"
            />
            {errors.deadline && (
              <p className="mt-1 text-pink-600">{errors.deadline}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-sky-500 py-1.5 text-white hover:bg-sky-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded bg-pink-500 py-1.5 text-white hover:bg-pink-600"
            >
              {todoData ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
