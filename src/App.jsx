import { useState } from 'react';
import data from './data.json';
import Task from './Components/Task';

const FILTERS = {
  all: () => true,
  complete: t => t.completed,
  pending: t => !t.completed,
};

export default function App() {
  const [tasks, setTasks] = useState(data.tasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");


  const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  const handleAdd = e => {
    e.preventDefault();
    if (!input) return;
    setTasks([{ id: nextId, title: input, completed: false }, ...tasks]);
    setInput("");
  };

  const handleDelete = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggle = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(FILTERS[filter]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-4xl font-bold bg-amber-100 mb-4">Task Manager</h2>

      {/* Add Task */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">Add</button>
      </form>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8">
        <button
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >All</button>
        <button
          className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('pending')}
        >Pending</button>
        <button
          className={`px-3 py-1 rounded ${filter === 'complete' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('complete')}
        >Complete</button>

      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <div className="text-gray-500 text-5xl">No tasks found.</div>
        ) : (
          filteredTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

