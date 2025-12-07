import React, { useState, useEffect } from 'react';
import GraphContainer from './containers/GraphContainer';
import TaskListContainer from './containers/TaskListContainer';
import EditorContainer from './containers/EditorContainer';
import { loadTaskLists, saveTaskLists } from './models/taskListsStore';
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
  // Store an array of TaskList instances
  const [taskLists, setTaskLists] = useState(() => loadTaskLists());
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // The currently active TaskList (default to first one)
  const selectedList = taskLists[0];

  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    // Already loaded via useState initialization
  }, []);

  // Persist TaskLists to localStorage
  const persistTaskLists = (lists) => {
    setTaskLists(lists);
    saveTaskLists(lists);
  };

  const handleTaskChange = (id, changes) => {
    selectedList.updateTask(id, changes);
    persistTaskLists([...taskLists]);
  };

  const handleTaskSelect = (id) => {
    setSelectedTaskId(id);
  };

  const handleDeselectTask = () => {
    setSelectedTaskId(null);
  };

  const handleAddTask = () => {
    const newTask = selectedList.addTask({
      title: 'New Task',
      color: getRandomColor(),
      urgency: 50,
      importance: 50,
      size: 20,
      description: '',
    });
    setSelectedTaskId(newTask.id);
    persistTaskLists([...taskLists]);
  };

  const handleDeleteTask = (id) => {
    selectedList.removeTask(id);
    setSelectedTaskId(null);
    persistTaskLists([...taskLists]);
  };

  const selectedTask = selectedList.tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="App">
      <h1>Interactive Eisenhower</h1>
      <div className="container">
        <GraphContainer 
          tasks={selectedList.tasks} 
          onSelectTask={handleTaskSelect} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={handleDeselectTask}
          onTaskChange={handleTaskChange}
        />
        <TaskListContainer 
          tasks={selectedList.tasks} 
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
          onChange={(name, value) => handleTaskChange(selectedTaskId, { [name]: value })} 
          onDelete={handleDeleteTask}
          onDeselect={handleDeselectTask}
        />
      )}
    </div>
  );
}

export default App;