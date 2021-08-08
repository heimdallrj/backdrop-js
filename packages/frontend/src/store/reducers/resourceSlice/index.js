import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAll as apiFetchAllResources,
  remove as apiDeleteResource,
} from 'api/resources';

const resourceSlice = createSlice({
  name: 'resources',
  initialState: {
    loading: null,
    resources: [],
    errors: null,
  },
  reducers: {
    setIsLoading(state, { payload }) {
      state.errors = null;
      state.isLoading = payload;
    },
    resourcesFetched(state, { payload }) {
      state.resources = payload;
      state.errors = null;
      state.isLoading = false;
    },
    resourceDeleted(state, { payload }) {
      state.resources = state.resources.filter(
        (resource) => resource.name !== payload
      );
      state.errors = null;
      state.isLoading = false;
    },
    setError(state, { payload }) {
      state.errors = payload;
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, resourcesFetched, resourceDeleted, setError } =
  resourceSlice.actions;

export const fetchAll =
  (cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const resources = await apiFetchAllResources();
      dispatch(resourcesFetched(resources));
      cb(null, resources);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export const deleteResource =
  (id, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await apiDeleteResource(id);
      dispatch(resourceDeleted(id));
      cb(null, response);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export default resourceSlice.reducer;
