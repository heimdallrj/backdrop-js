import { get, post, del, patch } from 'utils/http';

const namespace = 'api';

export const ping = () => get('/ping');
export const bootstrap = (config) => post('/bootstrap', config);

export const fetch = (name, id) => get(`/${namespace}/${name}/${id}`);
export const fetchAll = (name) => get(`/${namespace}/${name}`);
export const create = (name, data) => post(`/${namespace}/${name}`, data);
export const update = (name, id, data) =>
  patch(`/${namespace}/${name}/${id}`, data);
export const remove = (name, id) => del(`/${namespace}/${name}/${id}`);
