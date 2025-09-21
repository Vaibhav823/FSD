import { createSlice } from '@reduxjs/toolkit';

function loadUserFromLocalStorage(id) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(u => u.id === id);
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
  },
  reducers: {
    loadProfile(state, action) {
      state.user = loadUserFromLocalStorage(action.payload);
    },
    updateProfile(state, action) {
      state.user = action.payload;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const idx = users.findIndex(u => u.id === action.payload.id);
      if (idx >= 0) users[idx] = action.payload;
      localStorage.setItem('users', JSON.stringify(users));
    },
    clearProfile(state) {
      state.user = null;
    }
  }
});

export const { loadProfile, updateProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;