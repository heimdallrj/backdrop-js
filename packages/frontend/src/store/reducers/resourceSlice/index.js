import { createSlice } from '@reduxjs/toolkit';

import { fetchAll as apiFetchAllResources } from 'api/resources';

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
    setError(state, { payload }) {
      state.errors = payload;
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, resourcesFetched, setError } =
  resourceSlice.actions;

export const fetchAll =
  (user, cb = () => {}) =>
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

export default resourceSlice.reducer;
