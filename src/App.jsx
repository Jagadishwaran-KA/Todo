import { useEffect, useState } from 'react';
import { storedTodoItem, storeTodo } from './utils/dataStorage';
import InputTodo from './components/InputTodo';
import TodoContext from './utils/todoContext';
import DisplayLayout from './components/DisplayLayout';
import Header from './components/Header';

function App() {
  const [todoItem, setTodoItem] = useState([]);

  useEffect(() => {
    setTodoItem(storedTodoItem);
  }, []);

  useEffect(() => {
    storeTodo(todoItem);
  }, [todoItem]);

  return (
    <TodoContext.Provider
      value={{ todoItems: todoItem, setTodoItems: setTodoItem }}
    >
      <Header />
      <div className="text-center mt-6">
        <InputTodo />
        <DisplayLayout />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
