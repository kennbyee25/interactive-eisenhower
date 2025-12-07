export default class Task {
  constructor({ id, title, color, urgency, importance, size, description } = {}) {
    this.id = id ?? Math.floor(Math.random() * 1000000);
    this.title = title ?? 'New Task';
    this.color = color ?? '#cccccc';
    this.urgency = Number(urgency ?? 50);
    this.importance = Number(importance ?? 50);
    this.size = Number(size ?? 20);
    this.description = description ?? '';
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
    };
  }
}
