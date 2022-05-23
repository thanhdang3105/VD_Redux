export const todoListSelector = (state) => {
    const filters = filtersSelector(state)
    const todoFiltered = state.todoList.filter(todo => {
        const filterText = todo.name.toLowerCase().includes(state.filters.search.toLowerCase())
        const filterPrioriry = filters.prioriry.includes(todo.prioriry)
        if(filters.status === 'All'){
            return filters.prioriry.length ? filterText && filterPrioriry : filterText
        }
        return filters.prioriry.length ? 
        (filterText && filterPrioriry && (filters.status ==='Completed' ? todo.completed : !todo.completed)) 
        : (filterText && (filters.status ==='Completed' ? todo.completed : !todo.completed))
    })
    return todoFiltered
}
export const filtersSelector = (state) => state.filters