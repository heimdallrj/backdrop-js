import { get, post } from 'utils/http';

const namespace = 'core';

export const create = async (files, cb = () => {}) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await post('/core/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    cb(null, response);
  } catch (err) {
    cb(err, null);
  }
};
export const fetch = (id) => get(`/${namespace}/media/${id}`);
export const fetchAll = () => get(`${namespace}/media`);
