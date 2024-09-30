import { useContext } from 'react';
import TodoContext from '../utils/TodoContext';
import Todo from './Todo';
import { useTodoActions } from '../utils/useTodoActions';

function DisplayLayout() {
  const backgroundColor = 'bg-red-400';
  const { todoItems } = useContext(TodoContext);
  const { editTodo, toggleTodo, deleteTodo } = useTodoActions();

  return (
    <div className="flex justify-evenly mt-8">
      <div className="flex flex-col w-auto h-auto">
        <h1 className="text-lg font-ruda text-orange-600 font-bold">Todo</h1>
        <div>
          {todoItems.map(
            (item) =>
              item.completed === false && (
                <Todo
                  key={item.id}
                  title={item.title}
                  completed={item.completed}
                  check={() => toggleTodo(item.id)}
                  OnDelete={() => deleteTodo(item.id)}
                  OnEdit={(newTitle) => editTodo(item.id, newTitle)}
                />
              )
          )}
        </div>
      </div>
      <div className="w-px h-auto bg-black mx-8"></div>
      <div>
        <h1 className="text-lg font-ruda text-green-600 font-bold">
          Completed
        </h1>
        <div>
          {todoItems.map(
            (item) =>
              item.completed === true && (
                <Todo
                  key={item.id}
                  title={item.title}
                  completed={item.completed}
                  bgColor={backgroundColor}
                  check={() => toggleTodo(item.id)}
                  OnDelete={() => deleteTodo(item.id)}
                  OnEdit={(newTitle) => editTodo(item.id, newTitle)}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayLayout;
