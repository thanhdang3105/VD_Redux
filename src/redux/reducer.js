const initialState = {
    filters:{
        search:'',
        status: 'All',
        prioriry: []
    },
    todoList:[
        ...JSON.parse(localStorage.todoList)
    ],
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