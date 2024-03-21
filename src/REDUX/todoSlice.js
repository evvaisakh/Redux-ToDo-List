import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: [],
        counter: ''
    },
    reducers: {
        addTodo: ((state, action) => {
            state.todoList.push(action.payload)
        }),
        deleteTodo: ((state, action) => {
            return state.todoList.filter(item => item.id != action.payload)
            const completedCount = state.todoList.filter(item => item.status).length
            state.counter = completedCount
        }),
        checkTodo: ((state, action) => {
            const { status, id } = action.payload
            state.todoList.filter(item => {
                if (item.id == id) {
                    item.status = status
                }
                return item
            })
            const completedCount = state.todoList.filter(item => item.status).length
            state.counter = completedCount
        })
    }
})

export const { addTodo, deleteTodo, checkTodo } = todoSlice.actions
export default todoSlice.reducer