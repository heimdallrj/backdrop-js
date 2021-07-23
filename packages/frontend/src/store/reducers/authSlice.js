import { createSlice } from '@reduxjs/toolkit';

import { userSessionKey } from 'config';

const getInitialUser = () =>
  window.localStorage.getItem(userSessionKey)
    ? JSON.parse(window.localStorage.getItem(userSessionKey))
    : null;

const setUser = (user) => {
  localStorage.setItem(userSessionKey, JSON.stringify(user));
};

const unsetUser = () => localStorage.removeItem(userSessionKey);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
  },
  reducers: {
    userLoggedIn(state, { payload }) {
      state.user = payload;
      setUser(payload);
    },
    userLoggedOut(state, { payload }) {
      state.user = null;
      unsetUser();
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const login =
  (user, cb = () => { }) =>
    async (dispatch) => {
      // TODO Call auth API and login
      dispatch(userLoggedIn(user));
      cb();
    };

export const register =
  (user, cb = () => { }) =>
    async (dispatch) => {
      // dispatch(userLoggedOut());
      cb();
    };

export const logout = () => async (dispatch) => {
  dispatch(userLoggedOut());
};

export default authSlice.reducer;
