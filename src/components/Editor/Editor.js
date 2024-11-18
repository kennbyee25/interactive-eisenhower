import React from 'react';
import './Editor.css';

const Editor = ({ task, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="editor">
      <div className="editor-field">
        <label>Title:</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Color:</label>
        <input type="text" name="color" value={task.color} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Urgency:</label>
        <input type="range" name="urgency" min="0" max="100" value={task.urgency} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Importance:</label>
        <input type="range" name="importance" min="0" max="100" value={task.importance} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Effort:</label>
        <input type="range" name="effort" min="0" max="100" value={task.size} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Editor;