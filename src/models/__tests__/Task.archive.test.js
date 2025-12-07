import Task from '../Task';

describe('Task archiving', () => {
  test('defaults to not archived', () => {
    const t = new Task({ id: 1, title: 'T1' });
    expect(t.archived).toBe(false);
    expect(t.archivedAt).toBeNull();
  });

  test('setArchived(true) marks archived and sets archivedAt', () => {
    const t = new Task({ id: 2, title: 'T2' });
    t.setArchived(true);
    expect(t.archived).toBe(true);
    expect(typeof t.archivedAt).toBe('number');
  });

  test('setArchived(false) clears archived and archivedAt', () => {
    const t = new Task({ id: 3, title: 'T3' });
    t.setArchived(true);
    t.setArchived(false);
    expect(t.archived).toBe(false);
    expect(t.archivedAt).toBeNull();
  });

  test('toJSON includes archived fields', () => {
    const t = new Task({ id: 4, title: 'T4' });
    t.setArchived(true);
    const json = t.toJSON();
    expect(json.archived).toBe(true);
    expect(json.archivedAt).toBeDefined();
  });
});
