import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onSelectTask, selectedTaskId, onDeselectTask, onMouseDown, moveMode }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onDeselectTask();
    }
  };

  // Sort tasks by urgency + importance, descending
  const sortedTasks = [...tasks].sort((a, b) => {
    const aUrgency = parseInt(a.urgency, 10);
    const aImportance = parseInt(a.importance, 10);
    const bUrgency = parseInt(b.urgency, 10);
    const bImportance = parseInt(b.importance, 10);
    return (bUrgency + bImportance) - (aUrgency + aImportance);
  });

  const selectedTask = tasks.find(task => task.id === selectedTaskId);
  const selectedValue = selectedTask ? selectedTask.urgency + selectedTask.importance : 0;

  const topThreeTasks = sortedTasks.slice(0, 3);
  const remainingTasks = sortedTasks.slice(3);

  return (
    <div className="task-list" onClick={handleBackgroundClick}>
      {moveMode ? (
        <>
          {[...Array(41)].map((_, i) => {
            const value = selectedValue - 20 + i;
            if (value < 0 || value > 200) return null;
            const topPosition = 50 - ((value - selectedValue) * 2.5); // Scale by 2.5 to fit in the range of +-20
            let tickClass = 'tick';
            if (value % 10 === 0) tickClass += ' tick-ten';
            else if (value % 5 === 0) tickClass += ' tick-five';
            else tickClass += ' tick-one';
            return <div key={i} className={tickClass} style={{ top: `${topPosition}%` }}></div>;
          })}
          {sortedTasks
            .filter(task => Math.abs((task.urgency + task.importance) - selectedValue) <= 20)
            .map(task => {
              const valueDifference = (task.urgency + task.importance) - selectedValue;
              const topPosition = 50 - (valueDifference * 2.5); // Scale by 2.5 to fit in the range of +-20

              return (
                <div
                  key={task.id}
                  className="task-item-meter"
                  style={{ top: `${topPosition}%`, backgroundColor: task.color }}
                >
                  <div className="task-line"></div>
                </div>
              );
            })}
        </>
      ) : (
        <>
          <div className="task-section in-progress">
            <h3>In Progress</h3>
            {topThreeTasks.map(task => (
              <div
                key={task.id}
                className={`task-item ${task.id === selectedTaskId ? 'selected' : ''}`}
                onMouseDown={() => onMouseDown(task.id)}
                onClick={() => {
                  if (task.id !== selectedTaskId) {
                    onSelectTask(task.id);
                  }
                }}
              >
                <span className="task-color" style={{ backgroundColor: task.color }}></span>
                <span className="task-title">{task.title}</span>
                <span className="task-size">{task.size}</span>
              </div>
            ))}
          </div>
          <div className="task-section to-do">
            <h3>To Do</h3>
            {remainingTasks.map(task => (
              <div
                key={task.id}
                className={`task-item ${task.id === selectedTaskId ? 'selected' : ''}`}
                onMouseDown={() => onMouseDown(task.id)}
                onClick={() => {
                  if (task.id !== selectedTaskId) {
                    onSelectTask(task.id);
                  }
                }}
              >
                <span className="task-color" style={{ backgroundColor: task.color }}></span>
                <span className="task-title">{task.title}</span>
                <span className="task-size">{task.size}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;