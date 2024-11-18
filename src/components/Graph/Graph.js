import React from 'react';
import './Graph.css';

const Graph = ({ tasks, onSelectTask, selectedTaskId }) => {
  return (
    <div className="graph">
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
            top: `${task.importance}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => onSelectTask(task.id)}
        >
          {/* Task dot content */}
        </div>
      ))}
    </div>
  );
};

export default Graph;