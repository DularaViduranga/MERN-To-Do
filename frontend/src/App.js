import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return alert("Please enter a title");
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title });
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async (task) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 To-Do App</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task)}
            />
            <span className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </span>
            <button
              className="task-delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
