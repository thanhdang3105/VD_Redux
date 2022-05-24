import { createSlice } from "@reduxjs/toolkit"
export default createSlice({
    name: 'todoList',
    initialState: {
        todoList: !!localStorage.todoList ? [...JSON.parse(localStorage.todoList)] : [],
        todoEdit:{
    
        }
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
            localStorage.todoList = JSON.stringify(state.todoList)
        },// Tự khởi tạo action {type: 'name ta vừa khai báo bên trên'/ trên key reducer (vd: filterText)}
        updateTodo: (state, action) => {
            const todoListUpdated = state.todoList.filter((todo) => {
                return todo.id === action.payload.id
            })
            console.log(todoListUpdated);
            // state.todoList = 
            // console.log(state.todoList);

            // localStorage.todoList = JSON.stringify(state.todoList)
        },
        deleteTodo: (state, action) => {
            const newTodo = state.todoList.filter((todo) => {
                return todo.id !== action.payload
            })
        
            state.todoList = [
                ...newTodo
            ]
            localStorage.todoList = JSON.stringify(state.todoList)
        },
        editTodo: (state, action) => {
            const todoEdit = state.todoList.find((todo) => {
                return todo.id === action.payload 
            })
            state.todoEdit = {
                ...todoEdit
            }
        },
        toggleCompleted: (state, action) => {
            const newTodoList = state.todoList.find((todo) => {
                return todo.id === action.payload
            })

            newTodoList.completed = !newTodoList.completed
                
            localStorage.todoList = JSON.stringify(state.todoList)
        }
    }
})