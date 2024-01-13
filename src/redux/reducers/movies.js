import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice ({
    name: "movies",
    initialState:{list: [], filter:""},
    filter: "",
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload
        },
        logout: (state, action) => {
            state.list = []
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
            }
            
    }
});

export const { setMovies, logout, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;