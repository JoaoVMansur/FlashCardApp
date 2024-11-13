import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userID: number;
  userName: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userID: 0,
  userName: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userID = action.payload.userID;
      state.userName = action.payload.userName;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userID = 0;
      state.userName = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
