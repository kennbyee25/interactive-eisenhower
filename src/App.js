import React, { useState } from 'react';
import GraphContainer from './containers/GraphContainer';
import TaskListContainer from './containers/TaskListContainer';
import EditorContainer from './containers/EditorContainer';
import { initialTasks } from './tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskChange = (id, name, value) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [name]: value } : task
    ));
  };

  const handleTaskSelect = (id) => {
    setSelectedTaskId(id);
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="App">
      <div className="container">
        <GraphContainer tasks={tasks} onSelectTask={handleTaskSelect} selectedTaskId={selectedTaskId} />
        <TaskListContainer tasks={tasks} onSelectTask={handleTaskSelect} selectedTaskId={selectedTaskId} />
      </div>
      {selectedTask && (
        <EditorContainer 
          task={selectedTask} 
          onChange={(name, value) => handleTaskChange(selectedTaskId, name, value)} 
        />
      )}
    </div>
  );
}

export default App;