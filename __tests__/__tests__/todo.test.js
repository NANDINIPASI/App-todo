const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
} = require('../__tests__/todo'); // Adjust the path accordingly

const oneDay = 60 * 60 * 24 * 1000;
const today = new Date();

test('should add a new todo', () => {
  const newTodo = {
    description: 'Complete assignment',
    dueDate: new Date(today.getTime() + oneDay),
    completed: false,
  };

  add(newTodo);

  expect(all).toHaveLength(1);
  expect(all[0]).toEqual(newTodo);
});

test('should mark a todo as complete', () => {
  const todo = {
    description: 'Read a book',
    dueDate: new Date(today.getTime() + oneDay),
    completed: false,
  };

  add(todo);
  markAsComplete(0);

  expect(all[0].completed).toBe(true);
});

test('should retrieve overdue items', () => {
  const overdueTodo = {
    description: 'Overdue task',
    dueDate: new Date(today.getTime() - oneDay),
    completed: false,
  };

  add(overdueTodo);

  const overdueItems = overdue();

  expect(overdueItems).toHaveLength(1);
  expect(overdueItems[0]).toEqual(overdueTodo);
});

test('should retrieve due today items', () => {
  const dueTodayTodo = {
    description: 'Due today task',
    dueDate: today,
    completed: false,
  };

  add(dueTodayTodo);

  const dueTodayItems = dueToday();

  expect(dueTodayItems).toHaveLength(1);
  expect(dueTodayItems[0]).toEqual(dueTodayTodo);
});

test('should retrieve due later items', () => {
  const dueLaterTodo1 = {
    description: 'Read a book',
    dueDate: new Date(today.getTime() + 2 * oneDay),
    completed: false,
  };

  const dueLaterTodo2 = {
    description: 'Due later task',
    dueDate: new Date(today.getTime() + 3 * oneDay),
    completed: false,
  };

  add(dueLaterTodo1);
  add(dueLaterTodo2);

  const dueLaterItems = dueLater();

  expect(dueLaterItems).toHaveLength(2);
  expect(dueLaterItems).toContainEqual(dueLaterTodo1);
  expect(dueLaterItems).toContainEqual(dueLaterTodo2);
});
