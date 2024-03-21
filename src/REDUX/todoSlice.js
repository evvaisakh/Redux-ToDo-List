import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todoList: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },

        deleteTodo: (state, action) => {
            state.todoList = state.todoList.filter(item => item.id !== action.payload);
        },

        toggleTodoStatus: (state, action) => {
            const todo = state.todoList.find(item => item.id === action.payload);
            if (todo) {
                todo.status = !todo.status;
            }
        }
    }
})

export const { addTodo, deleteTodo, toggleTodoStatus } = todoSlice.actions
export default todoSlice.reducer