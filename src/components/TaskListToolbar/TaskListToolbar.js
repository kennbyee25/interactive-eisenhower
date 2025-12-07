import React from 'react';
import './TaskListToolbar.css';

function TaskListToolbar({
  taskLists,
  selectedListId,
  onSelectList,
  onAddList,
  onDeleteList,
}) {
  return (
    <div className="task-list-toolbar">
      <select
        className="task-list-dropdown"
        value={selectedListId}
        onChange={(e) => onSelectList(Number(e.target.value))}
      >
        {taskLists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title}
          </option>
        ))}
      </select>
      <button
        className="toolbar-button add-list-button"
        onClick={onAddList}
        title="Add new task list"
      >
        +
      </button>
      <button
        className="toolbar-button delete-list-button"
        onClick={() => onDeleteList(selectedListId)}
        title="Delete current task list"
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskListToolbar;
