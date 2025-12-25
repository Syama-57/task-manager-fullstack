import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const API_URL = "http://127.0.0.1:8000/api/tasks/";
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch Tasks on Load
  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = () => {
    axios.get(API_URL, config)
      .then((res) => setTasks(res.data))
      .catch(() => onLogout());
  };

  // CREATE: Add Task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: newTitle, is_completed: false }, config);
      setTasks([...tasks, res.data]);
      setNewTitle("");
    } catch (err) { console.error("Error adding task"); }
  };

  // UPDATE: Edit Task Title
  const handleEdit = (task) => {
    const updatedTitle = prompt("Edit your task title:", task.title);
    if (updatedTitle && updatedTitle !== task.title) {
      axios.patch(`${API_URL}${task.id}/`, { title: updatedTitle }, config)
        .then(res => {
          setTasks(tasks.map(t => t.id === task.id ? res.data : t));
        });
    }
  };

  // UPDATE: Toggle Completion (Click on text)
const toggleComplete = (task) => {
  // We send the OPPOSITE of the current status
  const updatedStatus = !task.is_completed;

  axios.patch(`${API_URL}${task.id}/`, 
    { is_completed: updatedStatus }, 
    config
  )
  .then(res => {
    // This updates the local 'tasks' state so the UI changes immediately
    setTasks(prevTasks => 
      prevTasks.map(t => (t.id === task.id ? res.data : t))
    );
  })
  .catch(err => {
    console.error("Failed to update task status:", err);
    alert("Could not update task. Check if backend is running.");
  });
};
  // DELETE: Remove Task
  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      axios.delete(`${API_URL}${id}/`, config)
        .then(() => {
          setTasks(tasks.filter(t => t.id !== id));
        });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.is_completed;
    if (filter === "Pending") return !task.is_completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.is_completed).length;
  const percent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
return (
    <div className={`dashboard-wrapper ${theme}`}>
      <div className="dashboard-container">
        <div className="header">
          <h2>Task Manager</h2>
          <div className="header-actions">
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>

        <div className="progress-section">
          <p>Progress: {percent}%</p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
          </div>
        </div>

        <form onSubmit={addTask} className="add-form">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" disabled={!newTitle.trim()}>Add</button>
        </form>

        <div className="filter-tabs">
          {["All", "Pending", "Completed"].map((f) => (
            <button 
              key={f} 
              className={filter === f ? "tab active" : "tab"} 
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              {/* This wrapper ensures the whole left side is clickable */}
              <div className="task-clickable-area" onClick={() => toggleComplete(task)}>
                <input 
                  type="checkbox" 
                  checked={task.is_completed} 
                  readOnly 
                  style={{ cursor: "pointer" }}
                />
                <span className={task.is_completed ? "task-title done" : "task-title"}>
                  {task.title}
                </span>
              </div>

              <div className="task-buttons">
                {/* Use e.stopPropagation() so clicking Edit doesn't trigger toggleComplete */}
                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(task); }}>Edit</button>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;