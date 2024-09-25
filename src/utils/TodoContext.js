import { createContext } from "react";

const TodoContext = createContext({
    todoItems: []
})

export default TodoContext;