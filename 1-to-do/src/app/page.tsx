'use client';

import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTasks(savedTasks);
    setTheme(savedTheme as 'light' | 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }
    if (newTask.length > 200) {
      alert('Task is too long (max 200 characters).');
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask('');
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const TaskItem: React.FC<{ task: Task; onRemove: (id: number) => void }> = ({ task, onRemove }) => (
    <li
      className={`flex justify-between items-center p-3 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-white'
      } shadow`}
    >
      <span>{task.text}</span>
      <button
        onClick={() => onRemove(task.id)}
        className={`text-red-500 hover:text-red-700 py-1 px-2 ${
          theme === 'dark' ? 'hover:bg-red-800' : 'hover:bg-red-100'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
      } min-h-screen p-8 transition-colors duration-300`}
    >
      <header className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">
          {theme === 'dark' ? 'Dark' : 'Light'} To-Do List
        </h1>
        <button
          onClick={toggleTheme}
          className="text-sm font-medium focus:outline-none focus:ring"
        >
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </header>
      <div className="max-w-md mx-auto">
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={`flex-grow border border-$
              {theme === 'dark' ? 'gray-600' : 'gray-300'} rounded-l py-2 px-4 ${
              theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'
            } focus:outline-none focus:ring`}
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className={`text-white font-bold py-2 px-4 rounded-r ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-700'
            } focus:outline-none focus:ring`}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onRemove={removeTask} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
