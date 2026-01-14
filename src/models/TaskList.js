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

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      tasks: this.tasks.map(t => t.toJSON()),
    };
  }
}
