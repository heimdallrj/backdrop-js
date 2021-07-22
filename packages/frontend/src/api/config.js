import { get, post } from 'utils/http';

const namespace = 'core';

export const fetchInitialConfig = () => get(`/${namespace}/config/init`);
export const createInitialConfig = (config) =>
  post(`/${namespace}/config/init`, config);
