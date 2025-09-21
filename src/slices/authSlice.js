import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserId: localStorage.getItem('currentUserId') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action) {
      state.currentUserId = action.payload;
      localStorage.setItem('currentUserId', action.payload);
    },
    signOut(state) {
      state.currentUserId = null;
      localStorage.removeItem('currentUserId');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;