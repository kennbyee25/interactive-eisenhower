import TaskList from './TaskList';
import { initialTasks } from '../tasks';

// Load from localStorage and migrate legacy shape (array of Tasks) to array of TaskLists
export const loadTaskLists = (key = 'tasks') => {
  const raw = JSON.parse(localStorage.getItem(key));
  if (!raw) {
    // No saved, seed with initialTasks wrapped
    return [new TaskList({ tasks: initialTasks })];
  }

  // If raw already has a version field, it's v2 format
  if (raw.version === 2 && Array.isArray(raw.data)) {
    return raw.data.map(list => new TaskList(list));
  }

  // Legacy: raw is an array of Task objects -> wrap into one TaskList
  if (Array.isArray(raw)) {
    return [new TaskList({ tasks: raw })];
  }

  // Fallback
  return [new TaskList({ tasks: initialTasks })];
};

export const saveTaskLists = (taskLists, key = 'tasks') => {
  const plain = taskLists.map(tl => (tl.toJSON ? tl.toJSON() : tl));
  const envelope = {
    version: 2,
    data: plain,
  };
  localStorage.setItem(key, JSON.stringify(envelope));
};
