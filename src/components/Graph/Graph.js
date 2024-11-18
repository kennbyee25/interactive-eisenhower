import React from 'react';
import './Graph.css';

const Graph = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onDeselectTask();
    }
  };

  return (
    <div className="graph" onClick={handleBackgroundClick}>
      {tasks.map(task => (
        <div
          key={task.id}
          className={`task-dot ${task.id === selectedTaskId ? 'selected' : ''}`}
          style={{
            width: `${task.size}px`,
            height: `${task.size}px`,
            backgroundColor: task.color,
            position: 'absolute',
            left: `${task.urgency}%`,
            top: `${100 - task.importance}%`, // Invert the y-axis
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => {
            if (task.id === selectedTaskId) {
              onDeselectTask();
            } else {
              onSelectTask(task.id);
            }
          }}
        >
          {/* Task dot content */}
        </div>
      ))}
    </div>
  );
};

export default Graph;