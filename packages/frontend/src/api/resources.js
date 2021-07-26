import { get, post, del, patch } from 'utils/http';

const namespace = 'core';

export const create = (resource) => post(`/${namespace}/resource`, resource);
export const fetch = (id) => get(`/${namespace}/resource/${id}`);
export const fetchAll = () => get(`${namespace}/resource`);
export const remove = (id) => del(`/${namespace}/resource/${id}`);
export const update = (id,resource) => patch(`/${namespace}/resource/${id}`,resource);