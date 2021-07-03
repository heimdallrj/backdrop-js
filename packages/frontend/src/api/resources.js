import { get, post } from 'utils/http';

const namespace = 'core';

export const create = (resource) => post(`/${namespace}/resource`, resource);
export const fetch = (id) => get(`/${namespace}/resource/${id}`);
export const fetchAll = () => get(`${namespace}/resource`);
