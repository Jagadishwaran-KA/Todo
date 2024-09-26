import { useCallback, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoContext from '../utils/TodoContext';

function InputTodo() {
  const inputRef = useRef(null);

  const { setTodoItems } = useContext(TodoContext);

  const handleClick = () => {
    const newValue = inputRef.current.value.trim();
    if (newValue) {
      const obj = {
        id: uuidv4(),
        completed: false,
        title: inputRef.current.value,
      };
      inputRef.current.value = '';
      setTodoItems((prev) => [...prev, obj]);
    } else {
      alert('Todo Value Cannot be Empty'); 
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleClick();
  }, []);

  return (
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
  );
}

export default InputTodo;
