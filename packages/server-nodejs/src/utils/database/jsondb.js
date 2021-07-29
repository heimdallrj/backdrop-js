import JsonDB from '@backdropjs/jsondb';

import { jsonDbPath } from 'config';

const JsonDb = new JsonDB(jsonDbPath, {});

export const connect = (config = {}) => new JsonDB(jsonDbPath, config);
export const db = () => new JsonDB(jsonDbPath, {}).collections;

export default JsonDb;
