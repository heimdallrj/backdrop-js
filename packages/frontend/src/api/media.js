import { get, post } from 'utils/http';

const namespace = 'core';

export const create = (files, cb = () => {}) => {
  const formData = new FormData();

  // Enable for multiple files
  formData.append('files', files[0]);

  return post('/core/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    cb,
  });
};
export const fetch = (id) => get(`/${namespace}/media/${id}`);
export const fetchAll = () => get(`${namespace}/media`);
