import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Clock, CheckCircle, Target, MessageCircle, Calendar, Plus, Trash2, X } from "lucide-react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: "medium" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // Base API URL
  const API_BASE_URL = "https://esc-481.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/me`, {
          headers: { "x-auth-token": token }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/todos/`, {
          headers: { "x-auth-token": token }
        });
        setTodos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching todos", error);
        setError("Failed to load tasks");
        setIsLoading(false);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserData();
    fetchTodos();
  }, [navigate, API_BASE_URL]);

  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/todos/`,
        newTodo,
        { headers: { "x-auth-token": token } }
      );
      setTodos([response.data, ...todos]);
      setNewTodo({ title: "", description: "", priority: "medium" });
    } catch (error) {
      console.error("Error adding todo", error);
      setError("Failed to add task");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_BASE_URL}/api/todos/${id}/toggle`,
        {},
        { headers: { "x-auth-token": token } }
      );
      setTodos(
        todos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error toggling todo", error);
      setError("Failed to update task");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/todos/${id}`, {
        headers: { "x-auth-token": token }
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
      setError("Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigateToChatbot = () => {
    navigate("/chat");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex gap-3 items-center text-2xl font-bold text-indigo-600">
            <Clock className="h-8 w-8 text-indigo-500" />
            <span className="tracking-tight">FocusFlow</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-gray-700">
                Welcome, <span className="font-medium">{user.name}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Add Todo Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-indigo-500 mr-2" />
                New Task
              </h2>
              <form onSubmit={handleAddTodo} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="What needs to be done?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Add details about this task..."
                    rows="3"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTodo.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-full transition-colors shadow-md flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" /> Add Task
                </button>
              </form>
              
              {/* Chatbot Button */}
              <div className="mt-8">
                <button 
                  onClick={navigateToChatbot}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-full transition-colors shadow-md flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  AI Productivity Assistant
                </button>
              </div>
            </div>
          </div>

          {/* Main content - Todo List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <Calendar className="h-6 w-6 text-indigo-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">My Tasks</h2>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 border-b border-red-100 flex items-center">
                  <X className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              {todos.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 inline-block mb-4">
                    <Clock className="h-10 w-10" />
                  </div>
                  <p className="text-xl font-medium text-gray-900">No tasks yet</p>
                  <p className="mt-2 text-gray-600">Add your first task to start boosting productivity!</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {todos.map((todo) => (
                    <li key={todo._id} className="px-6 py-4 hover:bg-indigo-50 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <button
                            onClick={() => handleToggleComplete(todo._id)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              todo.completed
                                ? "bg-green-500 text-white"
                                : "border-2 border-gray-300 hover:border-indigo-500"
                            }`}
                            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                          >
                            {todo.completed && (
                              <CheckCircle className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-lg font-medium ${
                              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
                            }`}>
                              {todo.title}
                            </h3>
                            <div className="flex items-center">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                todo.priority === "high" 
                                  ? "bg-red-100 text-red-700" 
                                  : todo.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                              </span>
                              <button
                                onClick={() => handleDeleteTodo(todo._id)}
                                className="ml-3 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Delete task"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          {todo.description && (
                            <p className={`mt-1 text-sm ${
                              todo.completed ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {todo.description}
                            </p>
                          )}
                          <p className="mt-2 text-xs text-gray-400">
                            {new Date(todo.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-white/80 backdrop-blur-md shadow-inner mt-12">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} FocusFlow. Transform procrastination into productivity.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;