import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // data ganna backend eken
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks(); // page eka load una gaman run wenawa
  }, []);

  // new task ekak add karanna
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

  // task ekak delete karanna
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // task ekak complete/undo karanna
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
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>📝 To-Do App</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, width: '70%' }}
        />
        <button onClick={addTask} style={{ padding: 8, marginLeft: 10 }}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: 12 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task)}
            />
            <span style={{
              marginLeft: 10,
              textDecoration: task.completed ? 'line-through' : 'none',
            }}>
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: 20 }}
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
