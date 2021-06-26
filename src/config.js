import path from 'path';

export const PORT = process.env.PORT || 3001;
export const DB = {
  connection: 'jsondb',
  jsonPath: path.join(__dirname, '..', 'etc', 'database.json'),
};
