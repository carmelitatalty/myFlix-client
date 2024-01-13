import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice ({
    name: "favorite",
    initialState:{favoriteMovies: []},
    reducers: {
        setFavorites: (state, action) => {
            state.favoriteMovies = action.payload
        },
        addFavorite: (state, action) => {
            state.favoriteMovies.push(action.payload);
        },
        removeFavorite: (state, action) => {
            const index = state.favoriteMovies.indexOf(action.payload);
            if (index > -1) {
                state.favoriteMovies.splice(index, 1)
            }
        }
    }
});

export const { setFavorites, addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;