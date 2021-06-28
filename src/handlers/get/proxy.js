import fetch from 'node-fetch';
import { response } from 'utils/http';

export default function proxy({ endpoint }, req, res) {
  fetch(endpoint)
    .then((resp) => resp.json())
    .then((data) => response.ok(res, data));
}
