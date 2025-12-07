import React from 'react';
import TaskListToolbar from '../components/TaskListToolbar/TaskListToolbar';

function TaskListToolbarContainer({
  taskLists,
  selectedListId,
  onSelectList,
  onAddList,
  onDeleteList,
}) {
  return (
    <TaskListToolbar
      taskLists={taskLists}
      selectedListId={selectedListId}
      onSelectList={onSelectList}
      onAddList={onAddList}
      onDeleteList={onDeleteList}
    />
  );
}

export default TaskListToolbarContainer;
