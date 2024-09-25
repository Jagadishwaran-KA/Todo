export const storedTodoItem = JSON.parse(localStorage.getItem('todo-item')) || [];

export const storeTodo = (todoItem) => {
  localStorage.setItem('todo-item', JSON.stringify(todoItem));
}
