import { createSlice } from "@reduxjs/toolkit";

const getEmptyUser = () => {
  return {
    _id: "",
    Username: "",
    Email: "",
    Birthday: new Date(),
  }
}

const userSlice = createSlice({
  name: "login",
  initialState: getEmptyUser(),
  reducers: {
    onLogin: (state, action) => {
      (email.value = action.payload.Email),
        (password.value = action.payload.Password);
    },
    setUser: (state, action) => {
      if (!action.payload) {
        state = getEmptyUser();
        return;
      }
      state._id = action.payload._id;
      state.Username = action.payload.Username;
      state.Email = action.payload.Email;
      state.Birthday = action.payload.Birthday
    },
  },
});

export const { onLogin, setUser } = userSlice.actions;
export default userSlice.reducer;
