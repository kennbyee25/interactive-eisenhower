import TaskList from '../TaskList';
import { loadTaskLists, saveTaskLists, getNextListTitle } from '../taskListsStore';

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('App Integration - TaskList Management', () => {
  test('selectList updates selected list id', () => {
    const lists = [
      new TaskList({ id: 10, title: 'List A' }),
      new TaskList({ id: 20, title: 'List B' }),
    ];
    let selectedListId = lists[0].id;

    // Simulate selectList handler
    const handleSelectList = (listId) => {
      selectedListId = listId;
    };

    handleSelectList(20);
    expect(selectedListId).toBe(20);
  });

  test('addList creates new TaskList with auto-incremented title and selects it', () => {
    let lists = [
      new TaskList({ id: 10, title: 'Task List 1' }),
      new TaskList({ id: 20, title: 'Task List 2' }),
    ];
    let selectedListId = lists[0].id;

    // Simulate addList handler
    const handleAddList = () => {
      const newListTitle = getNextListTitle(lists);
      const newList = new TaskList({ title: newListTitle });
      lists = [...lists, newList];
      selectedListId = newList.id;
      saveTaskLists(lists);
    };

    handleAddList();

    expect(lists.length).toBe(3);
    expect(lists[2].title).toBe('Task List 3');
    expect(lists[2].tasks).toEqual([]);
    expect(selectedListId).toBe(lists[2].id);
  });

  test('deleteList removes list and selects next available', () => {
    let lists = [
      new TaskList({ id: 10, title: 'Task List 1' }),
      new TaskList({ id: 20, title: 'Task List 2' }),
      new TaskList({ id: 30, title: 'Task List 3' }),
    ];
    let selectedListId = 20; // Task List 2 is selected

    // Simulate deleteList handler
    const handleDeleteList = (listId) => {
      const index = lists.findIndex(l => l.id === listId);
      if (index === -1) return;

      lists = lists.filter(l => l.id !== listId);

      // Select next available, or previous if it was the last
      if (lists.length > 0) {
        selectedListId = lists[Math.min(index, lists.length - 1)].id;
      }
      saveTaskLists(lists);
    };

    handleDeleteList(20);

    expect(lists.length).toBe(2);
    expect(lists.map(l => l.title)).toEqual(['Task List 1', 'Task List 3']);
    expect(selectedListId).toBe(30); // Task List 3 is now selected
  });

  test('deleteList with only one list remaining creates a new default list', () => {
    let lists = [new TaskList({ id: 10, title: 'Task List 1' })];
    let selectedListId = 10;

    // Simulate deleteList handler with safety net
    const handleDeleteList = (listId) => {
      const index = lists.findIndex(l => l.id === listId);
      if (index === -1) return;

      lists = lists.filter(l => l.id !== listId);

      // Safety: if no lists remain, create one
      if (lists.length === 0) {
        const newList = new TaskList({ title: 'Task List 1' });
        lists = [newList];
        selectedListId = newList.id;
      } else {
        selectedListId = lists[Math.min(index, lists.length - 1)].id;
      }
      saveTaskLists(lists);
    };

    handleDeleteList(10);

    expect(lists.length).toBe(1);
    expect(lists[0].title).toBe('Task List 1');
    expect(lists[0].id).not.toBe(10); // New list, different id
    expect(selectedListId).toBe(lists[0].id);
  });

  test('deleteList at end of array selects previous list', () => {
    let lists = [
      new TaskList({ id: 10, title: 'Task List 1' }),
      new TaskList({ id: 20, title: 'Task List 2' }),
      new TaskList({ id: 30, title: 'Task List 3' }),
    ];
    let selectedListId = 30; // Last list is selected

    const handleDeleteList = (listId) => {
      const index = lists.findIndex(l => l.id === listId);
      if (index === -1) return;

      lists = lists.filter(l => l.id !== listId);

      if (lists.length > 0) {
        selectedListId = lists[Math.min(index, lists.length - 1)].id;
      }
      saveTaskLists(lists);
    };

    handleDeleteList(30);

    expect(lists.length).toBe(2);
    expect(selectedListId).toBe(20); // Task List 2 is now selected
  });

  test('full workflow: load, add, select, delete, persist', () => {
    // Start with default
    let lists = loadTaskLists();
    expect(lists.length).toBe(1);
    expect(lists[0].title).toBe('Task List 1');
    let selectedListId = lists[0].id;

    // Add two more lists
    const addList = () => {
      const newListTitle = getNextListTitle(lists);
      const newList = new TaskList({ title: newListTitle });
      lists = [...lists, newList];
      selectedListId = newList.id;
      saveTaskLists(lists);
    };

    addList();
    addList();
    expect(lists.length).toBe(3);
    expect(lists[2].title).toBe('Task List 3');

    // Select the first list
    const selectList = (listId) => {
      selectedListId = listId;
    };

    selectList(lists[0].id);
    expect(selectedListId).toBe(lists[0].id);

    // Save and reload
    saveTaskLists(lists);
    const reloaded = loadTaskLists();
    expect(reloaded.length).toBe(3);
    expect(reloaded.map(l => l.title)).toEqual(['Task List 1', 'Task List 2', 'Task List 3']);
  });
});
