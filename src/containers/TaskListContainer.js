import React, { useState, useRef, useEffect } from 'react';
import TaskList from '../components/TaskList/TaskList';
import './TaskListContainer.css';

const TaskListContainer = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask, onTaskChange }) => {
  const [moveMode, setMoveMode] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState(null);
  const initialMouseY = useRef(null);
  const initialUrgency = useRef(null);
  const initialImportance = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!moveMode || selectedTaskId === null) return;

      if (initialMouseY.current === null) {
        initialMouseY.current = e.clientY;
      }

      const deltaY = initialMouseY.current - e.clientY; // Invert delta y
      const increment = (deltaY / 10); // Adjust the divisor to control sensitivity

      onTaskChange(selectedTaskId, {
        urgency: Math.min(Math.max(initialUrgency.current + increment, 0), 100),
        importance: Math.min(Math.max(initialImportance.current + increment, 0), 100),
      });
    };

    const handleMouseUp = () => {
      if (holdTimeout) {
        clearTimeout(holdTimeout);
        setHoldTimeout(null);
      }
      setMoveMode(false);
    };

    if (moveMode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [moveMode, selectedTaskId, holdTimeout, onTaskChange]);

  const handleMouseDown = (taskId) => {
    if (taskId === selectedTaskId) {
      const timeout = setTimeout(() => {
        setMoveMode(true);
        initialMouseY.current = null; // Reset initial mouse position
        const selectedTask = tasks.find(task => task.id === selectedTaskId);
        initialUrgency.current = selectedTask.urgency;
        initialImportance.current = selectedTask.importance;
      }, 1000);
      setHoldTimeout(timeout);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-list-content">
        <TaskList 
          tasks={tasks} 
          onSelectTask={onSelectTask} 
          selectedTaskId={selectedTaskId} 
          onDeselectTask={onDeselectTask}
          onMouseDown={handleMouseDown}
          moveMode={moveMode}
        />
      </div>
    </div>
  );
};

export default TaskListContainer;