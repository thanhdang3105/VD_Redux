export const todoAction = (type,payload) => {
    return {
        type: `todoList/${type}`,
        payload: payload
    }
}

export const filterAction = (type,payload) => {
    return {
        type: `filter/${type}`,
        payload: payload
    }
}