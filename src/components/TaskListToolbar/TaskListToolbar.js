import React from 'react';
import './TaskListToolbar.css';

function TaskListToolbar({
  taskLists,
  selectedListId,
  selectedTaskId,
  onSelectList,
  onAddList,
  onDeleteList,
  onRenameList,
  onAddTask,
  onDeleteTask,
}) {
  return (
    <div className="task-list-toolbar">
      <div className="toolbar-left">
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
          className="toolbar-button rename-list-button"
          onClick={() => {
            const current = taskLists.find(l => l.id === selectedListId);
            const currentTitle = current ? current.title : '';
            const newTitle = window.prompt('Rename task list', currentTitle);
            if (newTitle && newTitle.trim() && newTitle.trim() !== currentTitle) {
              onRenameList(selectedListId, newTitle.trim());
            }
          }}
          title="Rename current task list"
        >
          ✏️
        </button>
        <button
          className="toolbar-button delete-list-button"
          onClick={() => onDeleteList(selectedListId)}
          title="Delete current task list"
        >
          🗑️
        </button>
      </div>

      <div className="toolbar-actions">
        <button
          className="toolbar-button add-task-button"
          onClick={onAddTask}
          title="Add new task to current list"
        >
          Add Task
        </button>
        <button
          className="toolbar-button delete-task-button"
          onClick={() => onDeleteTask(selectedTaskId)}
          title="Delete selected task"
          disabled={!selectedTaskId}
        >
          🗑️ Task
        </button>
      </div>
    </div>
  );
}

export default TaskListToolbar;
