import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import questionsReducer from './slices/questionsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    questions: questionsReducer,
  },
});