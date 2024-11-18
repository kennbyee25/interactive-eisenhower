import React, { useState } from 'react';
import Graph from '../components/Graph/Graph';
import './GraphContainer.css';

const GraphContainer = () => {
  // Example state for tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', color: '#ff0000', urgency: 50, importance: 50, size: 20 },
    { id: 2, title: 'Task 2', color: '#00ff00', urgency: 30, importance: 60, size: 25 },
  ]);

  return (
    <div className="graph-container">
      <div className="graph-content">
        <Graph tasks={tasks} />
      </div>
    </div>
  );
};

export default GraphContainer;