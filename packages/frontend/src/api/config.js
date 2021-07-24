import { get, patch, post } from 'utils/http';

const namespace = 'core';

export const fetchAppConfig = () => get(`/${namespace}/config/app`);
export const createAppConfig = (config) =>
  post(`/${namespace}/config/app`, config);
export const updateConfig = (type, config) =>
  patch(`/${namespace}/config/${type}`, config);
