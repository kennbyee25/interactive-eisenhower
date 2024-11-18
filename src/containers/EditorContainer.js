import React from 'react';
import Editor from '../components/Editor/Editor';
import './EditorContainer.css';

const EditorContainer = ({ task, onChange }) => {
  return (
    <div className="editor-container">
      <Editor task={task} onChange={onChange} />
    </div>
  );
};

export default EditorContainer;