import React from 'react';
import Graph from '../components/Graph/Graph';
import './GraphContainer.css';

const GraphContainer = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask, onTaskChange }) => {
  return (
    <div className="graph-container">
      <div className="graph-content">
        <Graph 
          tasks={tasks} 
          onSelectTask={onSelectTask} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={onDeselectTask} 
          onTaskChange={onTaskChange}
        />
      </div>
    </div>
  );
};

export default GraphContainer;