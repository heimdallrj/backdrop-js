import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

const sanatize = (str) => str.replace('/', '');

export default function validateResource(req, res, next) {
  const { resource } = req.params;
  const namespace = sanatize(req.baseUrl);

  const resourceConfig = db.resources.findOne({
    name: resource,
    namespace,
    status: 'published',
  });
  if (!resourceConfig) return response.notFound(res);

  req.resourceConfig = resourceConfig;
  return next();
}
