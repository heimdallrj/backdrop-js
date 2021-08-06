import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAppConfig as apiFetchAppConfig,
  createAppConfig as apiCreateAppConfig,
  updateConfig as apiUpdateConfig,
  fetchConfigByType as apiFetchConfigByType,
} from 'api/config';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    isLoading: true,
    config: {},
    bootstrap: null,
    errors: null,
  },
  reducers: {
    setIsLoading(state, { payload }) {
      state.errors = null;
      state.isLoading = payload;
    },
    configFetched(state, { payload }) {
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

      const _config = state.config;
      _config[payload.type] = payload;
      state.config = _config;

      state.bootstrap = bootstrap;
      state.isLoading = false;
    },
    configUpdated(state, { payload }) {
      state.errors = null;
      state.config = payload;
      state.isLoading = false;
    },
    setError(state, { payload }) {
      state.errors = payload;
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, configFetched, configUpdated, setError } =
  configSlice.actions;

export const fetchConfigByType =
  (type, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const config = await apiFetchConfigByType(type);
      dispatch(configFetched(config));
      cb(null, config);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export const fetchAppConfig =
  (cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const config = await apiFetchAppConfig();
      dispatch(configFetched(config));
    } catch (err) {
      dispatch(setError(err));
    }
  };

export const fetchUserConfig =
  (cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const config = await apiFetchConfigByType('user');
      dispatch(configFetched(config));
      cb(null, config);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export const updateInitialConfig =
  (config, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const configCreated = await apiCreateAppConfig(config);
      dispatch(configFetched(configCreated));
      cb(null, configCreated);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export const updateAppConfig =
  (config, cb = () => {}) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const _config = await apiUpdateConfig('app', config);
      dispatch(configFetched(_config));
      cb(null, _config);
    } catch (err) {
      dispatch(setError(err));
      cb(err, null);
    }
  };

export default configSlice.reducer;
