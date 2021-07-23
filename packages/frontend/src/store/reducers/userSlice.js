import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAll as apiFetchAllUsers,
  create as apiCreateUser,
} from 'api/users';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    loading: null,
    users: [],
    errors: null,
  },
  reducers: {
    setIsLoading(state, { payload }) {
      state.errors = null;
      state.isLoading = payload;
    },
    usersFetched(state, { payload }) {
      state.users = payload;
      state.errors = null;
      state.isLoading = false;
    },
    userCreated(state, { payload }) {
      state.errors = null;
      state.isLoading = false;
    },
    setError(state, { payload }) {
      state.errors = payload;
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, usersFetched, userCreated, setError } =
  userSlice.actions;

export const fetchAll =
  (user, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const users = await apiFetchAllUsers();
      dispatch(usersFetched(users));
      cb(null, users);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export const register =
  (user, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const _user = await apiCreateUser(user);
      dispatch(userCreated());
      cb(null, _user);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export default userSlice.reducer;
