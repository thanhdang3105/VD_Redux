const initialState = {
    filters:{
        search:'',
        status: 'All',
        prioriry: []
    },
    todoList:[
        
    ],
    todoEdit:{

    }
}

if(localStorage.todoList) {
    initialState.todoList = JSON.parse(localStorage.todoList)
}



const rootReducer = (state = initialState, action) => {
    /*\
        action:{
            type: 'todoList/add',
            payload: {}
        }
    */
    let data = {}
    switch(action.type) {
        case 'todoList/addTodo':
            data = {
                ...state,
                todoList: [
                    ...state.todoList,
                    action.payload
                ]
            }
            localStorage.todoList = JSON.stringify(data.todoList)
            return data
        case 'todoList/updateTodo':
            const todoListUpdated = state.todoList.map((todo) => {
                return todo.id === action.payload.id ? action.payload : todo 
            })
            data = {
                ...state,
                todoList: [
                    ...todoListUpdated
                ],
                todoEdit:{}
            }
            localStorage.todoList = JSON.stringify(data.todoList)
            return data
        case 'todoList/deleteTodo':
            const newTodo = state.todoList.filter((todo) => {
                return todo.id !== action.payload
            })
            data = {
                ...state,
                todoList: [
                    ...newTodo
                ]
            }
            localStorage.todoList = JSON.stringify(data.todoList)
            return data
        case 'todoList/editTodo':
            const todoEdit = state.todoList.find((todo) => {
                return todo.id === action.payload 
            })
            data = {
                ...state,
                todoEdit: {
                    ...todoEdit
                }
            }
            // localStorage.todoList = JSON.stringify(data.todoList)
            return data
        case 'todoList/toggleCompleted':
            const newTodoList = state.todoList.map((todo) => {
                return todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo 
            })
            data = {
                ...state,
                todoList: [
                    ...newTodoList
                ]
            }
            localStorage.todoList = JSON.stringify(data.todoList)
            return data
        case 'filter/filterText':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    search: action.payload
                }
            }
        case 'filter/filterStatus':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }
        case 'filter/filterPrioriry':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    prioriry: [...action.payload]
                }
            }
        default:
            return state
    }
}

export default rootReducer