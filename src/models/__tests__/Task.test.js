import Task from '../Task';

describe('Task', () => {
  test('constructs with defaults', () => {
    const t = new Task();
    expect(t.id).toBeDefined();
    expect(t.title).toBe('New Task');
    expect(t.color).toBe('#cccccc');
    expect(t.urgency).toBe(50);
    expect(t.importance).toBe(50);
    expect(t.size).toBe(20);
    expect(t.description).toBe('');
  });

  test('constructs with provided values', () => {
    const t = new Task({ id: 42, title: 'Test', urgency: 75, importance: 25 });
    expect(t.id).toBe(42);
    expect(t.title).toBe('Test');
    expect(t.urgency).toBe(75);
    expect(t.importance).toBe(25);
  });

  test('toJSON returns plain object', () => {
    const t = new Task({ id: 1, title: 'Task 1', color: '#ff0000', urgency: 60, importance: 40, size: 25, description: 'A task' });
    const json = t.toJSON();
    expect(json).toEqual({
      id: 1,
      title: 'Task 1',
      color: '#ff0000',
      urgency: 60,
      importance: 40,
      size: 25,
      description: 'A task',
    });
  });
});
