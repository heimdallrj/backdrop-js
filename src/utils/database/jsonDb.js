import JsonDB from '../../libs/node-jsondb';

const jsonDb = new JsonDB();

export const db = jsonDb.collections;
export default jsonDb;
