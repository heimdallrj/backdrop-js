import { get, post } from 'utils/http';

const namespace = 'core';

export const create = (media) => post(`/${namespace}/media`, media);
export const fetch = (id) => get(`/${namespace}/media/${id}`);
export const fetchAll = () => get(`${namespace}/media`);
