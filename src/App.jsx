import { useEffect, useRef, useState } from 'react';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';
import { getStoredTodo, storeTodo } from './utils/dataStorage';

function App() {
  const backgroundColor = 'bg-green-400';
  const [todoItem, setTodoItem] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const inputRef = useRef(null);

  const handleClick = () => {
    const newValue = inputRef.current.value.trim();
    if (newValue) {
      const obj = {
        id: uuidv4(),
        completed: false,
        title: inputRef.current.value,
      };
      inputRef.current.value = '';
      setTodoItem((prev) => [...prev, obj]);
    } else {
      alert('Todo Value Cannot be Empty');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleClick();
  };

  useEffect(() => {
    const { todos, completeTodo } = getStoredTodo();
    setTodoItem(todos);
    setCompletedTodo(completeTodo);
  }, []);

  useEffect(() => {
    storeTodo(todoItem, completedTodo);
  }, [todoItem, completedTodo]);

  const findTodo = (id) => {
    return (
      todoItem.find((item) => item.id === id) ||
      completedTodo.find((item) => item.id === id)
    );
  };

  const editTodo = (id, newTitle) => {
    setTodoItem((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
    setCompletedTodo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
  };

  const toggleTodo = (id) => {
    const todo = findTodo(id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    if (!todo.completed) {
      setCompletedTodo((prev) => [...prev, updatedTodo]);
      setTodoItem((prev) => prev.filter((item) => item.id !== id));
    } else {
      setTodoItem((prev) => [...prev, updatedTodo]);
      setCompletedTodo((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const deleteTodo = (id) => {
    setTodoItem((prev) => prev.filter((item) => item.id !== id));
    setCompletedTodo((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="text-center mt-6">
      <h1 className="text-3xl font-ruda">Todo List</h1>
      <div className="space-x-4 mt-12">
        <input
          className="p-2  font-opensans text-lg  border border-black rounded-md"
          type="text"
          ref={inputRef}
          placeholder="Add a new Todo"
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-black text-lg rounded-md tracking-wider text-white p-[10px]"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
      <div className="flex justify-evenly mt-8">
        <div className="flex flex-col w-auto h-auto">
          <h1 className="text-lg font-ruda text-orange-600 font-bold">Todo</h1>
          <div>
            {todoItem.map((item) => (
              <Todo
                key={item.id}
                title={item.title}
                completed={item.completed}
                check={() => toggleTodo(item.id)}
                OnDelete={() => deleteTodo(item.id)}
                OnEdit={(newTitle) => editTodo(item.id, newTitle)}
              />
            ))}
          </div>
        </div>
        <div className="w-px h-auto bg-black mx-8"></div>
        <div>
          <h1 className="text-lg font-ruda text-green-600 font-bold">
            Completed
          </h1>
          <div>
            {completedTodo.map((item) => (
              <Todo
                key={item.id}
                title={item.title}
                completed={item.completed}
                bgColor={backgroundColor}
                check={() => toggleTodo(item.id)}
                OnDelete={() => deleteTodo(item.id)}
                OnEdit={(newTitle) => editTodo(item.id, newTitle)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
