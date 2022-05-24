import { createSlice } from "@reduxjs/toolkit"

export default createSlice({
    name: 'filters',
    initialState: {
        search:'',
        status: 'All',
        priorities: []
    },
    reducers: {
        filterText: (state, action) => {
            state.search = action.payload
        },// Tự khởi tạo action {type: 'name ta vừa khai báo bên trên'/ trên key reducer (vd: filterText)}
        filterStatus: (state, action) => {
            state.status = action.payload
        },
        filterPrioriry: (state, action) => {
            state.priorities = action.payload
        }
    }
})