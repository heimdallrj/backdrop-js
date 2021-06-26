import JSONdb from 'simple-json-db';
import { DB } from 'config';

const db = new JSONdb(DB.jsonPath, { jsonSpaces: 2 });

export const set = (coll, doc) => db.set(coll, doc);

export const get = (coll) => db.get(coll);

export const has = (coll) => db.has(coll);

export const remove = (coll) => db.delete(coll);

export const sync = () => db.sync();

export const read = () => db.JSON();

export const write = (json) => db.JSON(json);
