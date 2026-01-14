import { loadTaskLists, saveTaskLists, getNextListTitle } from '../taskListsStore';
import TaskList from '../TaskList';
import Task from '../Task';

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('taskListsStore', () => {
  test('loadTaskLists with no saved data returns array with one default TaskList seeded with initialTasks', () => {
    const lists = loadTaskLists();
    expect(Array.isArray(lists)).toBe(true);
    expect(lists.length).toBe(1);
    expect(lists[0]).toBeInstanceOf(TaskList);
    // initialTasks is expected to have at least 2 items
    expect(lists[0].tasks.length).toBeGreaterThanOrEqual(2);
  });

  test('seeded TaskList has title "Task List 1"', () => {
    const lists = loadTaskLists();
    expect(lists[0].title).toBe('Task List 1');
  });

  test('getNextListTitle returns "Task List 1" for empty array', () => {
    const title = getNextListTitle([]);
    expect(title).toBe('Task List 1');
  });

  test('getNextListTitle increments based on count', () => {
    const lists = [
      new TaskList({ title: 'Task List 1' }),
      new TaskList({ title: 'Task List 2' }),
    ];
    const title = getNextListTitle(lists);
    expect(title).toBe('Task List 3');
  });

  test('getNextListTitle works with non-standard titles', () => {
    const lists = [
      new TaskList({ title: 'Work' }),
      new TaskList({ title: 'Personal' }),
    ];
    const title = getNextListTitle(lists);
    expect(title).toBe('Task List 3');
  });

  test('migrates legacy v1 format (array of tasks) to v2 (array of TaskLists)', () => {
    const legacyData = [
      { id: 1, title: 'T1', color: '#ff0000', urgency: 50, importance: 50, size: 20, description: '' },
      { id: 2, title: 'T2', color: '#00ff00', urgency: 30, importance: 60, size: 25, description: '' },
    ];
    localStorage.setItem('tasks', JSON.stringify(legacyData));

    const lists = loadTaskLists();
    expect(lists.length).toBe(1);
    expect(lists[0]).toBeInstanceOf(TaskList);
    expect(lists[0].tasks.length).toBe(2);
    expect(lists[0].tasks[0].id).toBe(1);
    expect(lists[0].tasks[0].title).toBe('T1');
    expect(lists[0].tasks[1].id).toBe(2);
  });

  test('loadTaskLists v2 format (with version field)', () => {
    const v2Data = {
      version: 2,
      data: [
        { id: 10, title: 'List A', tasks: [{ id: 1, title: 'T1' }] },
        { id: 11, title: 'List B', tasks: [{ id: 2, title: 'T2' }] },
      ],
    };
    localStorage.setItem('tasks', JSON.stringify(v2Data));

    const lists = loadTaskLists();
    expect(lists.length).toBe(2);
    expect(lists[0]).toBeInstanceOf(TaskList);
    expect(lists[0].id).toBe(10);
    expect(lists[0].title).toBe('List A');
    expect(lists[1].id).toBe(11);
    expect(lists[1].tasks[0].id).toBe(2);
  });

  test('saveTaskLists stores with version 2 and data envelope', () => {
    const lists = [
      new TaskList({ id: 20, title: 'Save Test', tasks: [{ id: 100, title: 'SavedTask' }] }),
    ];
    saveTaskLists(lists);

    const stored = JSON.parse(localStorage.getItem('tasks'));
    expect(stored.version).toBe(2);
    expect(Array.isArray(stored.data)).toBe(true);
    expect(stored.data.length).toBe(1);
    expect(stored.data[0].id).toBe(20);
    expect(stored.data[0].tasks[0].title).toBe('SavedTask');
  });

  test('save/load round-trip preserves multiple TaskLists', () => {
    const original = [
      new TaskList({ id: 30, title: 'A', tasks: [{ id: 1, title: 'x' }, { id: 2, title: 'y' }] }),
      new TaskList({ id: 31, title: 'B', tasks: [{ id: 3, title: 'z' }] }),
    ];
    saveTaskLists(original);
    const loaded = loadTaskLists();

    expect(loaded.length).toBe(2);
    expect(loaded[0].id).toBe(30);
    expect(loaded[0].title).toBe('A');
    expect(loaded[0].tasks.length).toBe(2);
    expect(loaded[1].id).toBe(31);
    expect(loaded[1].tasks[0].title).toBe('z');
  });

  test('loadTaskLists converts Task plain objects to Task instances', () => {
    const v2Data = {
      version: 2,
      data: [
        { id: 40, title: 'List', tasks: [{ id: 1, title: 'Plain Task' }] },
      ],
    };
    localStorage.setItem('tasks', JSON.stringify(v2Data));
    const lists = loadTaskLists();
    expect(lists[0].tasks[0]).toBeInstanceOf(Task);
  });
});
