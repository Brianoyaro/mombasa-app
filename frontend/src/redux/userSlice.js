import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    }
  }
});
export const { setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;