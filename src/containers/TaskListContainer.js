import React, { useState } from 'react';
import TaskList from '../components/TaskList/TaskList';
import { initialTasks } from '../tasks';
import './TaskListContainer.css';

const TaskListContainer = () => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="task-list-container">
      <div className="task-list-content">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskListContainer;