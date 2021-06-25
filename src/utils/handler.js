import fetch from 'node-fetch';

export const proxy = ({ endpoint }, req, res) => {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    });
};
