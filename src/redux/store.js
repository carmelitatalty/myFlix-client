
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user";
import tokenReducer from "./reducers/token"
import favoriteReducer from "./reducers/favorite";

export const store = configureStore ({
    reducer: { movies: moviesReducer, user: userReducer, token: tokenReducer, favorite: favoriteReducer }
});
