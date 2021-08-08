import { get, post, del, patch } from 'utils/http';

const namespace = 'core';

export const create = (resource) => post(`/${namespace}/resource`, resource);
export const fetchOne = (name) => get(`/${namespace}/resource/${name}`);
export const fetchAll = () => get(`${namespace}/resource`);
export const remove = (name) => del(`/${namespace}/resource/${name}`);
export const update = (name, data) =>
  patch(`/${namespace}/resource/${name}`, data);
