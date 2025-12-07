import React from 'react';
import TaskListToolbar from '../components/TaskListToolbar/TaskListToolbar';

function TaskListToolbarContainer({
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
    <TaskListToolbar
      taskLists={taskLists}
      selectedListId={selectedListId}
      selectedTaskId={selectedTaskId}
      onSelectList={onSelectList}
      onAddList={onAddList}
      onDeleteList={onDeleteList}
      onRenameList={onRenameList}
      onAddTask={onAddTask}
      onDeleteTask={onDeleteTask}
    />
  );
}

export default TaskListToolbarContainer;
