import React, { useState, useRef } from 'react';
import './Graph.css';

const Graph = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask, onTaskChange }) => {
  const [dragging, setDragging] = useState(false);
  const graphRef = useRef(null);

  const handleMouseDown = (taskId) => (e) => {
    if (taskId === selectedTaskId) {
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging || selectedTaskId === null) return;

    const graphRect = graphRef.current.getBoundingClientRect();
    const newUrgency = Math.round(((e.clientX - graphRect.left) / graphRect.width) * 100);
    const newImportance = Math.round(100 - ((e.clientY - graphRect.top) / graphRect.height) * 100);

    onTaskChange(selectedTaskId, {
      urgency: Math.min(Math.max(newUrgency, 0), 100),
      importance: Math.min(Math.max(newImportance, 0), 100),
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onDeselectTask();
    }
  };

  return (
    <div
      className="graph"
      onClick={handleBackgroundClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={graphRef}
    >
      <div className="grid">
        {[...Array(11)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="grid-line vertical" style={{ left: `${i * 10}%` }}></div>
            <div className="grid-line horizontal" style={{ top: `${i * 10}%` }}></div>
          </React.Fragment>
        ))}
      </div>
      <div className="labels">
        <div className="x-label">Urgency &rarr;</div>
        <div className="y-label">Importance &rarr;</div>
      </div>
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
          onMouseDown={handleMouseDown(task.id)}
          onClick={() => {
            if (task.id !== selectedTaskId) {
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