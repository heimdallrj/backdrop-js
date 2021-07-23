import { get, post } from 'utils/http';

const namespace = 'core';

export const create = (user) => post(`/${namespace}/users`, user);
export const fetch = (id) => get(`/${namespace}/users/${id}`);
export const fetchAll = () => get(`${namespace}/users`);
