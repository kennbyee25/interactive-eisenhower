import React from 'react';
import TaskListToolbar from '../components/TaskListToolbar/TaskListToolbar';

function TaskListToolbarContainer({
  taskLists,
  selectedListId,
  onSelectList,
  onAddList,
  onDeleteList,
  onRenameList,
}) {
  return (
    <TaskListToolbar
      taskLists={taskLists}
      selectedListId={selectedListId}
      onSelectList={onSelectList}
      onAddList={onAddList}
      onDeleteList={onDeleteList}
      onRenameList={onRenameList}
    />
  );
}

export default TaskListToolbarContainer;
