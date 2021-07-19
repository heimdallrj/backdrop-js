import { get, post } from 'utils/http';

const namespace = 'core';

export const create = (resource) => post(`/${namespace}/users`, resource);
export const fetch = (id) => get(`/${namespace}/users/${id}`);
export const fetchAll = () => get(`${namespace}/users`);
