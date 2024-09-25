import { useCallback, useContext } from 'react';
import TodoContext from "./TodoContext";

export const useTodoActions = () => {
    const { setTodoItems } = useContext(TodoContext);

    const editTodo = useCallback((id, newTitle) => {
        setTodoItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, title: newTitle } : item
            )
        );
    }, [setTodoItems]);

    const toggleTodo = useCallback((id) => {
        setTodoItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    }, [setTodoItems]);

    const deleteTodo = useCallback((id) => {
        setTodoItems((prev) => prev.filter((item) => item.id !== id));
    }, [setTodoItems]);

    return { editTodo, deleteTodo, toggleTodo };
};