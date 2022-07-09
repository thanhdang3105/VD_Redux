import { createSelector } from '@reduxjs/toolkit'

export const todoListSelector = (state) => state.todoList.todoList
export const filtersSelector = (state) => state.filters
export const todoEditSelector = (state) => {
    return state.todoList.todoEdit
}

export const todoRemainingSelector = createSelector(
    todoListSelector,
    filtersSelector,
    (todoList, filters) => {
        console.log(todoList);
        const todoFiltered = todoList.filter(todo => {
            const filterText = todo.name.toLowerCase().includes(filters.search.toLowerCase())
            const filterPriorities = filters.priorities.includes(todo.priority)
            if(filters.status === 'All'){
                return filters.priorities.length ? filterText && filterPriorities : filterText
            }
            return filters.priorities.length ? 
            (filterText && filterPriorities && (filters.status ==='Completed' ? todo.completed : !todo.completed)) 
            : (filterText && (filters.status ==='Completed' ? todo.completed : !todo.completed))
        })
        return todoFiltered
    }
)