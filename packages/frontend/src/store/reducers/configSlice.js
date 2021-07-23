import { createSlice } from '@reduxjs/toolkit';

import {
  fetchInitialConfig as apiFetchInitialConfig,
  createInitialConfig as apiCreateInitialConfig,
} from 'api/config';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    isLoading: true,
    config: null,
    bootstrap: null,
    errors: null,
  },
  reducers: {
    setIsLoading(state, { payload }) {
      state.errors = null;
      state.isLoading = payload;
    },
    initialConfigFetched(state, { payload }) {
      /**
       * if config === null | undefined; nothing happens, yet. (bootstrap = null)
       * if config === {}; it means that the app is being loaded for the first time (bootstrap = true)
       * if (config !== null && config !== {}); application is ready to use (bootstrap = false)
       * */
      let bootstrap = false;
      if (
        payload &&
        payload !== null &&
        typeof payload === 'object' &&
        JSON.stringify(payload) === '{}'
      )
        bootstrap = true;

      state.errors = null;
      state.config = payload;
      state.bootstrap = bootstrap;
    },
    setError(state, { payload }) {
      state.errors = payload;
    },
  },
});

export const { setIsLoading, initialConfigFetched, setError } =
  configSlice.actions;

export const fetchInitialConfig =
  (cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const config = await apiFetchInitialConfig();
      dispatch(initialConfigFetched(config));
    } catch (err) {
      dispatch(setError(err));
    }
    dispatch(setIsLoading(false));
  };

export const updateInitialConfig =
  (config, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const configCreated = await apiCreateInitialConfig(config);
      dispatch(initialConfigFetched(configCreated));
      dispatch(setIsLoading(false));
      cb(null, configCreated);
    } catch (err) {
      dispatch(setError(err));
      dispatch(setIsLoading(false));
      cb(err, null);
    }
  };

export default configSlice.reducer;
