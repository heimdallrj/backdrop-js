import JSONdb from 'simple-json-db';
import { DB } from 'config';

const jsonDbMiddleware = (req, res, next) => {
  const db = new JSONdb(DB.jsonPath);
  req.jsonDb = db;
  next();
};

export default jsonDbMiddleware;
