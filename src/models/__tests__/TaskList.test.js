import TaskList from '../TaskList';
import Task from '../Task';

describe('TaskList', () => {
  test('constructs with defaults', () => {
    const tl = new TaskList();
    expect(tl.id).toBeDefined();
    expect(tl.title).toBe('Default List');
    expect(tl.tasks).toEqual([]);
  });

  test('constructs with custom title', () => {
    const tl = new TaskList({ title: 'Task List 1' });
    expect(tl.title).toBe('Task List 1');
    expect(tl.id).toBeDefined();
    expect(tl.tasks).toEqual([]);
  });

  test('constructs with title and tasks', () => {
    const tasks = [{ id: 1, title: 'T1' }, { id: 2, title: 'T2' }];
    const tl = new TaskList({ title: 'My List', tasks });
    expect(tl.title).toBe('My List');
    expect(tl.tasks.length).toBe(2);
    expect(tl.tasks[0]).toBeInstanceOf(Task);
  });

  test('addTask returns a Task instance and adds to list', () => {
    const tl = new TaskList();
    const t = tl.addTask({ title: 'New', urgency: 80 });
    expect(t).toBeInstanceOf(Task);
    expect(t.title).toBe('New');
    expect(t.urgency).toBe(80);
    expect(tl.tasks.length).toBe(1);
    expect(tl.tasks[0]).toBe(t);
  });

  test('updateTask modifies task by id and returns true', () => {
    const tl = new TaskList({ tasks: [{ id: 10, title: 'Old' }] });
    const result = tl.updateTask(10, { title: 'Updated', urgency: 55 });
    expect(result).toBe(true);
    expect(tl.tasks[0].title).toBe('Updated');
    expect(tl.tasks[0].urgency).toBe(55);
  });

  test('updateTask returns false if task not found', () => {
    const tl = new TaskList({ tasks: [{ id: 10, title: 'Task' }] });
    const result = tl.updateTask(999, { title: 'Nope' });
    expect(result).toBe(false);
  });

  test('removeTask deletes task by id and returns true', () => {
    const tl = new TaskList({ tasks: [{ id: 10, title: 'T1' }, { id: 20, title: 'T2' }] });
    const result = tl.removeTask(10);
    expect(result).toBe(true);
    expect(tl.tasks.length).toBe(1);
    expect(tl.tasks[0].id).toBe(20);
  });

  test('removeTask returns false if task not found', () => {
    const tl = new TaskList({ tasks: [{ id: 10, title: 'T1' }] });
    const result = tl.removeTask(999);
    expect(result).toBe(false);
    expect(tl.tasks.length).toBe(1);
  });

  test('toJSON returns plain object with tasks serialized', () => {
    const tl = new TaskList({ id: 50, title: 'List A', tasks: [{ id: 1, title: 'T1' }] });
    const json = tl.toJSON();
    expect(json).toEqual({
      id: 50,
      title: 'List A',
      tasks: [expect.objectContaining({ id: 1, title: 'T1' })],
    });
  });
});
