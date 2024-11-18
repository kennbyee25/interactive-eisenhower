import React, { useState, useEffect } from 'react';
import './Editor.css';

const Editor = ({ task, onChange, onSave }) => {
  const [values, setValues] = useState({
    title: '',
    color: '',
    urgency: 0,
    importance: 0,
    size: 0,
  });

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title,
        color: task.color,
        urgency: task.urgency,
        importance: task.importance,
        size: task.size,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    onChange(name, value);
  };

  const handleSave = () => {
    onSave(values);
  };

  return (
    <div className="editor">
      <div className="editor-field">
        <label>Title:</label>
        <input type="text" name="title" value={values.title} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Color:</label>
        <input type="text" name="color" value={values.color} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Urgency:</label>
        <input type="range" name="urgency" min="0" max="100" value={values.urgency} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Importance:</label>
        <input type="range" name="importance" min="0" max="100" value={values.importance} onChange={handleChange} />
      </div>
      <div className="editor-field">
        <label>Effort:</label>
        <input type="range" name="size" min="0" max="100" value={values.size} onChange={handleChange} />
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Editor;