import { response } from 'utils/http';

export default function sample(req, res) {
  return response.ok(res, {});
}
