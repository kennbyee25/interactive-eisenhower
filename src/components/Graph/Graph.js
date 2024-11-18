import React from 'react';
import './Graph.css';

const Graph = ({ tasks }) => {
  return (
    <div className="graph">
      {tasks.map(task => (
        <div
          key={task.id}
          className="task-dot"
          style={{
            width: task.size,
            height: task.size,
            backgroundColor: task.color,
            position: 'absolute',
            left: `${task.urgency}%`,
            top: `${task.importance}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Task dot content */}
        </div>
      ))}
    </div>
  );
};

export default Graph;