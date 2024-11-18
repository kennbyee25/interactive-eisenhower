import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onSelectTask, selectedTaskId }) => {
  // Sort tasks by urgency + importance, descending
  const sortedTasks = [...tasks].sort((a, b) => (b.urgency + b.importance) - (a.urgency + a.importance)).slice(0, 10);

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <div
          key={task.id}
          className={`task-item ${task.id === selectedTaskId ? 'selected' : ''}`}
          onClick={() => onSelectTask(task.id)}
        >
          <span className="task-color" style={{ backgroundColor: task.color }}></span>
          <span className="task-title">{task.title}</span>
          <span className="task-size">{task.size}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;