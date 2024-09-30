import { useCallback, useContext } from 'react';
import TodoContext from "./TodoContext";

export const useTodoActions = () => {
    const { setTodoItems } = useContext(TodoContext);

    const editTodo = useCallback((id, newTitle) => {
        setTodoItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, title: newTitle, completed: false } : item
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
        setTodoItems((prev) => {
            const arr = []
            for (let index = 0; index < prev.length; index++) {
                if (prev[index].id === id) {
                    continue;
                }
                arr.push(prev[index]);
            }
            return arr;
        });
    }, [setTodoItems]);

    return { editTodo, deleteTodo, toggleTodo };
};