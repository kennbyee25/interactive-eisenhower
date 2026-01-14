import TaskList from './TaskList';
import { initialTasks } from '../tasks';

// Generate the next list title based on count of existing lists
export const getNextListTitle = (taskLists = []) => {
  return `Task List ${taskLists.length + 1}`;
};

// Load from localStorage and migrate legacy shape (array of Tasks) to array of TaskLists
export const loadTaskLists = (key = 'tasks') => {
  const raw = JSON.parse(localStorage.getItem(key));
  if (!raw) {
    // No saved, seed with initialTasks wrapped with title "Task List 1"
    return [new TaskList({ title: 'Task List 1', tasks: initialTasks })];
  }

  // If raw already has a version field, it's v2 format
  if (raw.version === 2 && Array.isArray(raw.data)) {
    return raw.data.map(list => new TaskList(list));
  }

  // Legacy: raw is an array of Task objects -> wrap into one TaskList
  if (Array.isArray(raw)) {
    return [new TaskList({ title: 'Task List 1', tasks: raw })];
  }

  // Fallback
  return [new TaskList({ title: 'Task List 1', tasks: initialTasks })];
};

export const saveTaskLists = (taskLists, key = 'tasks') => {
  const plain = taskLists.map(tl => (tl.toJSON ? tl.toJSON() : tl));
  const envelope = {
    version: 2,
    data: plain,
  };
  localStorage.setItem(key, JSON.stringify(envelope));
};
