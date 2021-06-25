import fetch from 'node-fetch';
import { response } from 'utils/http';

export const proxy = ({ endpoint }, req, res) => {
  fetch(endpoint)
    .then((resp) => resp.json())
    .then((data) => response.success(res, data));
};
