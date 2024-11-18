import React from 'react';
import Editor from '../components/Editor/Editor';
import './EditorContainer.css';

const EditorContainer = ({ task, onChange, onSave }) => {
  return (
    <div className="editor-container">
      <Editor task={task} onChange={onChange} onSave={onSave} />
    </div>
  );
};

export default EditorContainer;