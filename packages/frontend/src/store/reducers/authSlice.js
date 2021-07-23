import { createSlice } from '@reduxjs/toolkit';

import { login as apiLogin } from 'api/auth';

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
    isLoading: true,
    user: getInitialUser(),
    errors: null,
  },
  reducers: {
    setIsLoading(state, { payload }) {
      state.errors = null;
      state.isLoading = payload;
    },
    userLoggedIn(state, { payload }) {
      state.errors = null;
      state.user = payload;
      state.isLoading = false;
      setUser(payload);
    },
    userLoggedOut(state, { payload }) {
      state.errors = null;
      state.user = null;
      state.isLoading = false;
      unsetUser();
    },
    setError(state, { payload }) {
      state.errors = payload;
    },
  },
});

export const { setIsLoading, userLoggedIn, userLoggedOut, setError } =
  authSlice.actions;

export const login =
  (credentials, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const { user, token } = await apiLogin(credentials);
      dispatch(userLoggedIn({ ...user, token }));
      cb(null, user);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export const register =
  (user, cb = () => {}) =>
  async (dispatch) => {
    // dispatch(userLoggedOut());
    cb();
  };

export const logout = () => async (dispatch) => {
  dispatch(userLoggedOut());
};

export default authSlice.reducer;
