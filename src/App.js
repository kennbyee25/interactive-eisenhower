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

  const handleTaskChange = (id, name, value) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, [name]: value } : task
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
      id: tasks.length + 1,
      title: 'New Task',
      color: getRandomColor(),
      urgency: 50,
      importance: 50,
      size: 5, // Set the effort/size to 5
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
      <div className="container">
        <GraphContainer 
          tasks={tasks} 
          onSelectTask={handleTaskSelect} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={handleDeselectTask}
        />
        <TaskListContainer 
          tasks={tasks} 
          onSelectTask={handleTaskSelect} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={handleDeselectTask}
        />
      </div>
      <button className="add-button" onClick={handleAddTask}>Add Task</button>
      {selectedTask && (
        <EditorContainer 
          task={selectedTask} 
          onChange={(name, value) => handleTaskChange(selectedTaskId, name, value)} 
          onDelete={handleDeleteTask}
          onDeselect={handleDeselectTask}
        />
      )}
    </div>
  );
}

export default App;