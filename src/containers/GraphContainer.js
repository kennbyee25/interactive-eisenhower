import React from 'react';
import Graph from '../components/Graph/Graph';
import './GraphContainer.css';

const GraphContainer = ({ tasks }) => {
  return (
    <div className="graph-container">
      <div className="graph-content">
        <Graph tasks={tasks} />
      </div>
    </div>
  );
};

export default GraphContainer;