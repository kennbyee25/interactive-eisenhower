import React from 'react';
import GraphContainer from './containers/GraphContainer';
import TaskListContainer from './containers/TaskListContainer';
import EditorContainer from './containers/EditorContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <GraphContainer />
        <TaskListContainer />
      </div>
      <EditorContainer />
    </div>
  );
}

export default App;