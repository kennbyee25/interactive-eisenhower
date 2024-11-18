import React, { useState } from 'react';
import Editor from '../components/Editor/Editor';
import { initialTasks } from '../tasks';
import './EditorContainer.css';

const EditorContainer = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0].id);

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  const handleTaskChange = (name, value) => {
    setTasks(tasks.map(task => 
      task.id === selectedTaskId ? { ...task, [name]: value } : task
    ));
  };

  return (
    <div className="editor-container">
      <Editor task={selectedTask} onChange={handleTaskChange} />
    </div>
  );
};

export default EditorContainer;