import Task from './Task';

export default class TaskList {
  constructor({ id, title, tasks } = {}) {
    this.id = id ?? Math.floor(Math.random() * 1000000);
    this.title = title ?? 'Default List';
    this.tasks = (tasks || []).map(t => (t instanceof Task ? t : new Task(t)));
  }

  addTask(taskData = {}) {
    const t = new Task(taskData);
    this.tasks.push(t);
    return t;
  }

  removeTask(taskId) {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    return this.tasks.length !== before;
  }

  updateTask(taskId, changes) {
    const idx = this.tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return false;
    this.tasks[idx] = new Task({ ...this.tasks[idx].toJSON(), ...changes });
    return true;
  }

  // Rename the list title
  rename(newTitle) {
    if (!newTitle || typeof newTitle !== 'string') return false;
    this.title = newTitle;
    return true;
  }

  // Archive a task (mark archived and set archivedAt)
  archiveTask(taskId) {
    const idx = this.tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return false;
    const task = this.tasks[idx];
    if (typeof task.setArchived === 'function') {
      task.setArchived(true);
    } else {
      // fallback
      task.archived = true;
      task.archivedAt = Date.now();
    }
    // Move the archived task to the front so that most-recently-archived appears first
    this.tasks = [this.tasks[idx], ...this.tasks.filter((_, i) => i !== idx)];
    return true;
  }

  unarchiveTask(taskId) {
    const idx = this.tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return false;
    const task = this.tasks[idx];
    if (typeof task.setArchived === 'function') {
      task.setArchived(false);
    } else {
      task.archived = false;
      task.archivedAt = null;
    }
    return true;
  }

  getArchivedTasks() {
    return this.tasks
      .filter(t => t.archived)
      .slice()
      .sort((a, b) => (b.archivedAt || 0) - (a.archivedAt || 0));
  }

  getActiveTasks() {
    return this.tasks.filter(t => !t.archived);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      tasks: this.tasks.map(t => t.toJSON()),
    };
  }
}
