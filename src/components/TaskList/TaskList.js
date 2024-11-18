import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onTaskSelect }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div
          key={task.id}
          className="task-item"
          onClick={() => onTaskSelect(task.id)}
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