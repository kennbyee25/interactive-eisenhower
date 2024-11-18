import React, { useState, useEffect } from 'react';
import GraphContainer from './containers/GraphContainer';
import TaskListContainer from './containers/TaskListContainer';
import EditorContainer from './containers/EditorContainer';
import { initialTasks } from './tasks';
import './App.css';

// Helper function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Helper function to generate a unique random ID
const generateUniqueId = (tasks) => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (tasks.some(task => task.id === id));
  return id;
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they are updated
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskChange = (id, changes) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...changes } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleTaskSelect = (id) => {
    setSelectedTaskId(id);
  };

  const handleDeselectTask = () => {
    setSelectedTaskId(null);
  };

  const handleAddTask = () => {
    const newTask = {
      id: generateUniqueId(tasks),
      title: 'New Task',
      color: getRandomColor(),
      urgency: 50,
      importance: 50,
      size: 20, // Set the effort/size to 20
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setSelectedTaskId(newTask.id);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setSelectedTaskId(null);
    saveTasksToLocalStorage(updatedTasks);
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="App">
      <h1>Interactive Eisenhower</h1>
      <div className="container">
        <GraphContainer 
          tasks={tasks} 
          onSelectTask={handleTaskSelect} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={handleDeselectTask}
          onTaskChange={handleTaskChange}
        />
        <TaskListContainer 
          tasks={tasks} 
          onSelectTask={handleTaskSelect} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={handleDeselectTask}
          onTaskChange={handleTaskChange}
        />
      </div>
      <button className="add-button" onClick={handleAddTask}>Add Task</button>
      {selectedTask && (
        <EditorContainer 
          task={selectedTask} 
          onChange={(name, value) => handleTaskChange(selectedTaskId, { [name]: parseInt(value, 10) })} 
          onDelete={handleDeleteTask}
          onDeselect={handleDeselectTask}
        />
      )}
    </div>
  );
}

export default App;