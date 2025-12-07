import React, { useState, useEffect } from 'react';
import GraphContainer from './containers/GraphContainer';
import TaskListContainer from './containers/TaskListContainer';
import EditorContainer from './containers/EditorContainer';
import TaskListToolbarContainer from './containers/TaskListToolbarContainer';
import { loadTaskLists, saveTaskLists, getNextListTitle } from './models/taskListsStore';
import TaskList from './models/TaskList';
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
  const [selectedListId, setSelectedListId] = useState(() => {
    const lists = loadTaskLists();
    return lists[0]?.id;
  });

  // The currently active TaskList
  const selectedList = taskLists.find(l => l.id === selectedListId) || taskLists[0];

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

  const handleSelectList = (listId) => {
    setSelectedListId(listId);
    setSelectedTaskId(null);
  };

  const handleAddList = () => {
    const newListTitle = getNextListTitle(taskLists);
    const newList = new TaskList({ title: newListTitle });
    const updatedLists = [...taskLists, newList];
    persistTaskLists(updatedLists);
    setSelectedListId(newList.id);
    setSelectedTaskId(null);
  };

  const handleDeleteList = (listId) => {
    // Find the index of the list to delete
    const indexToDelete = taskLists.findIndex(l => l.id === listId);
    if (indexToDelete === -1) return;

    let updatedLists = taskLists.filter(l => l.id !== listId);

    // Safety: if no lists remain, create a new default one
    if (updatedLists.length === 0) {
      const newList = new TaskList({ title: 'Task List 1' });
      updatedLists = [newList];
      persistTaskLists(updatedLists);
      setSelectedListId(newList.id);
    } else {
      // Select the next list (or previous if deleting the last one)
      const nextIndex = Math.min(indexToDelete, updatedLists.length - 1);
      persistTaskLists(updatedLists);
      setSelectedListId(updatedLists[nextIndex].id);
    }
    setSelectedTaskId(null);
  };

  const selectedTask = selectedList.tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="App">
      <h1>Interactive Eisenhower</h1>
      <TaskListToolbarContainer
        taskLists={taskLists}
        selectedListId={selectedListId}
        onSelectList={handleSelectList}
        onAddList={handleAddList}
        onDeleteList={handleDeleteList}
      />
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