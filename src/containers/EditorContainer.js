import React from 'react';
import Editor from '../components/Editor/Editor';
import './EditorContainer.css';

const EditorContainer = ({ task, onChange, onDelete, onDeselect }) => {
  return (
    <div className="editor-container">
      <Editor 
        task={task} 
        onChange={onChange} 
        onDelete={onDelete} 
        onDeselect={onDeselect} 
      />
    </div>
  );
};

export default EditorContainer;