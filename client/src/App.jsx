import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await axios.post(API_URL, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          📝 Todo App
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a new task"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md transition"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow-sm"
            >
              <span
                onClick={() => toggleComplete(todo._id, todo.completed)}
                className={`flex-1 cursor-pointer select-none ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="ml-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
