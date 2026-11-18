
import { useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { dummyTodos } from "./data/dummyTodos";
import TodoList from "./pages/TodoList.jsx";
import TodoDetailPage from "./pages/TodoDetailPage.jsx";
import Toast from "./components/Toast.jsx";

function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  function notify(message) {
    clearTimeout(timer.current);
    setToast({ message });
    timer.current = setTimeout(() => setToast(null), 2500);
  }

  function handleAdd(data) {
    const id = todos.length
      ? Math.max(...todos.map((todo) => todo.id)) + 1
      : 1;

    setTodos((prev) => [...prev, { ...data, id }]);
    notify("Tugas berhasil ditambahkan");
  }

  function handleUpdate(id, data) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...data, id } : todo
      )
    );

    notify("Tugas berhasil diperbarui");
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    notify("Tugas berhasil dihapus");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              todos={todos}
              addTodo={handleAdd}
              deleteTodo={handleDelete}
            />
          }
        />

        <Route
          path="/todo/:id"
          element={
            <TodoDetailPage
              todos={todos}
              onUpdate={handleUpdate}
            />
          }
        />

        <Route
          path="*"
          element={<h1>Halaman tidak ditemukan</h1>}
        />
      </Routes>

      <Toast toast={toast} />
    </BrowserRouter>
  );
}

export default App;
