import axios from 'axios';
import { apiBaseUrl } from 'config';

const requestInterceptor = (req) => {
  return req;
};

const responseInterceptor = (res) => {
  return res.data.message;
};

export const init = () => {
  axios.defaults.baseURL = apiBaseUrl;
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['X-Request-With'] = 'XMLHTTPRequest';
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseInterceptor);
};

export const setAuthHeader = (token) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};

export const resetAuthHeader = () => {
  axios.defaults.headers.Authorization = undefined;
};

export const create = (args) => axios.create(args);

export const all = (iterable) =>
  axios.all(iterable).then(axios.spread((...args) => args));

export const request = (options) => axios(options);

export const get = (url, options = null) => axios.get(url, options);

export const post = (url, data, options = null) =>
  axios.post(url, data, options);

export const put = (url, data, options = null) => axios.put(url, data, options);

export const patch = (url, data, options = null) =>
  axios.patch(url, data, options);

export const del = (url) => axios.delete(url);
