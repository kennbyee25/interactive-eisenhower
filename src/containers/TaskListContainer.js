import React from 'react';
import TaskList from '../components/TaskList/TaskList';
import './TaskListContainer.css';

const TaskListContainer = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask }) => {
  return (
    <div className="task-list-container">
      <div className="task-list-content">
        <TaskList 
          tasks={tasks} 
          onSelectTask={onSelectTask} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={onDeselectTask} 
        />
      </div>
    </div>
  );
};

export default TaskListContainer;