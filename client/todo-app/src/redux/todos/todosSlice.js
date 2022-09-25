import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {addTodoAsync, getTodoAsync, toggleTodoAsync, deleteTodoAsync} from './services'
export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem("activeFilter"),
        addNewTodo: {
            isLoading: false,
            error: null
        }
    },
    reducers: {
        /*  toggle: (state, action) => {
              const { id } = action.payload;
              const item = state.items.find(item => item.id === id);
              item.completed = !item.completed
          },*/
        /*   destroy: (state, action) => {
               const id = action.payload;
               const filteredItems = state.items.filter(item => item.id !== id);
               state.items = filteredItems;
           },*/
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const doesntIncludeCompletedItems = state.items.filter(item => item.completed === false);
            state.items = doesntIncludeCompletedItems;
        }
    },
    extraReducers: {
        //get todos
        [getTodoAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodoAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodoAsync.rejected]: (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        },
        //add todo
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodo.isLoading = false;
        },
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.error = action.error.message;
            state.addNewTodo.isLoading = false;
        },
        //toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            state.items.filter((item) => item.id === id ? item.completed = completed : "")

        },

        //delete todo

        [deleteTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const filteredItems = state.items.filter(item => item.id !== id);
            state.items = filteredItems;
        }
    }

})

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
export const selectTodos = state => state.todos.items;
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items;
    }
    return state.todos.items.filter((todo) =>
        state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true);
}
export const selectActiveFilter = (state) => state.todos.activeFilter;