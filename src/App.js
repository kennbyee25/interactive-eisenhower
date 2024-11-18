import React from 'react';
import GraphContainer from './containers/GraphContainer.js';
import TaskListContainer from './containers/TaskListContainer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <GraphContainer />
        <TaskListContainer />
      </div>
    </div>
  );
}

export default App;