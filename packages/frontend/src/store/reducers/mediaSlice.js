import { createSlice } from '@reduxjs/toolkit';

import { fetchAll as apiFetchAllMedia } from 'api/media';

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    loading: null,
    files: [],
    errors: null
  },
  reducers: {
    setIsLoading(state, { payload }) {
      state.errors = null;
      state.isLoading = payload;
    },
    mediaFetched(state, { payload }) {
      state.files = payload;
      state.errors = null;
      state.isLoading = false;
    },
    setError(state, { payload }) {
      state.errors = payload;
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, mediaFetched, setError } = mediaSlice.actions;

export const fetchAll =
  (user, cb = () => { }) =>
    async (dispatch) => {
      dispatch(setIsLoading(true));
      try {
        const files = await apiFetchAllMedia();
        dispatch(mediaFetched(files));
        cb(null, files);
      } catch (err) {
        dispatch(setError(err));
        cb(err, null);
      }
    };

export default mediaSlice.reducer;
