export const getStoredTodo = () => {
  const storedTodoItem = JSON.parse(localStorage.getItem('todo-item')) || [];
  const storedCompletedTodo =
    JSON.parse(localStorage.getItem('completed-todo')) || [];

  return {
    todos: storedTodoItem,
    completeTodo: storedCompletedTodo,
  };
};

export const storeTodo = (todoItem, completedTodo) => {
  if (todoItem.length > 0 || completedTodo.length > 0) {
    localStorage.setItem('todo-item', JSON.stringify(todoItem));
    localStorage.setItem('completed-todo', JSON.stringify(completedTodo));
  }
};
