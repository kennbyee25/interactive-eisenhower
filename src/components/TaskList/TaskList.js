import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onDeselectTask();
    }
  };

  // Sort tasks by urgency + importance, descending
  const sortedTasks = [...tasks].sort((a, b) => {
    const aUrgency = parseInt(a.urgency, 10);
    const aImportance = parseInt(a.importance, 10);
    const bUrgency = parseInt(b.urgency, 10);
    const bImportance = parseInt(b.importance, 10);
    return (bUrgency + bImportance) - (aUrgency + aImportance);
  }).slice(0, 10);

  return (
    <div className="task-list" onClick={handleBackgroundClick}>
      {sortedTasks.map(task => (
        <div
          key={task.id}
          className={`task-item ${task.id === selectedTaskId ? 'selected' : ''}`}
          onClick={() => {
            if (task.id !== selectedTaskId) {
              onSelectTask(task.id);
            }
          }}
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