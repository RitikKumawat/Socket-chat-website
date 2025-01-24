import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: localStorage.getItem("chat-user")
    ? JSON?.parse(localStorage?.getItem("chat-user"))
    : null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthUser(state, value) {
      state.authUser = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setAuthUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
