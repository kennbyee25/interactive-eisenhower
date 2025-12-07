import TaskList from '../TaskList';

describe('TaskList archiving', () => {
  test('archiveTask moves task to archived state', () => {
    const tl = new TaskList({ tasks: [{ id: 1, title: 'A' }, { id: 2, title: 'B' }] });
    const res = tl.archiveTask(2);
    expect(res).toBe(true);
    const archived = tl.getArchivedTasks();
    expect(archived.length).toBe(1);
    expect(archived[0].id).toBe(2);
  });

  test('unarchiveTask restores archived task', () => {
    const tl = new TaskList({ tasks: [{ id: 10, title: 'X' }] });
    tl.archiveTask(10);
    expect(tl.getArchivedTasks().length).toBe(1);
    tl.unarchiveTask(10);
    expect(tl.getArchivedTasks().length).toBe(0);
    expect(tl.getActiveTasks().length).toBe(1);
  });

  test('archived tasks are returned in most-recent-first order', () => {
    const tl = new TaskList({ tasks: [{ id: 1, title: 'A' }, { id: 2, title: 'B' }, { id: 3, title: 'C' }] });
    // archive in order 1,2,3
    tl.archiveTask(1);
    tl.archiveTask(2);
    tl.archiveTask(3);
    const archived = tl.getArchivedTasks();
    expect(archived.map(t => t.id)).toEqual([3,2,1]);
  });
});
