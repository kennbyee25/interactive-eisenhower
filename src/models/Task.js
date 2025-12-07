export default class Task {
  constructor({ id, title, color, urgency, importance, size, description, archived, archivedAt } = {}) {
    this.id = id ?? Math.floor(Math.random() * 1000000);
    this.title = title ?? 'New Task';
    this.color = color ?? '#cccccc';
    this.urgency = Number(urgency ?? 50);
    this.importance = Number(importance ?? 50);
    this.size = Number(size ?? 20);
    this.description = description ?? '';
    this.archived = Boolean(archived ?? false);
    this.archivedAt = typeof archivedAt === 'number' ? archivedAt : null;
  }

  setArchived(value = true) {
    this.archived = Boolean(value);
    this.archivedAt = this.archived ? Date.now() : null;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      color: this.color,
      urgency: this.urgency,
      importance: this.importance,
      size: this.size,
      description: this.description,
      archived: this.archived,
      archivedAt: this.archivedAt,
    };
  }
}
