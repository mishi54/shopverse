import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.data = payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});
export const { setUser, removeUser } =
  userSlice.actions;

export default userSlice.reducer;
