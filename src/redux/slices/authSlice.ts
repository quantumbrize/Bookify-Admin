import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminInfo, AuthState } from '../../interfaces/AuthState';

// Get initial state from Local Storage
const tokenFromStorage = localStorage.getItem('token');
const adminInfoFromStorage = localStorage.getItem('adminInfo');

const initialState: AuthState = {
  token: tokenFromStorage ? JSON.parse(tokenFromStorage) : null,
  adminInfo: adminInfoFromStorage ? JSON.parse(adminInfoFromStorage) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; adminInfo: AdminInfo }>) => {
      state.token = action.payload.token;
      state.adminInfo = action.payload.adminInfo;
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('adminInfo', JSON.stringify(action.payload.adminInfo));
    },
    logout: (state) => {
      state.token = null;
      state.adminInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
