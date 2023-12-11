const all = [];

function add(todo) {
  all.push(todo);
}

function markAsComplete(index) {
  if (index >= 0 && index < all.length) {
    all[index].completed = true;
  }
}

function overdue() {
  return all.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate);
    return !todo.completed && todoDueDate < today;
  });
}

function dueToday() {
  return all.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate);
    return !todo.completed && todoDueDate.toDateString() === today.toDateString();
  });
}

function dueLater() {
  return all.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate);
    return !todo.completed && todoDueDate > today;
  });
}

module.exports = { all, add, markAsComplete, overdue, dueToday, dueLater };
