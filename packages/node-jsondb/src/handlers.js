import {
  readFileSync,
  existsSync,
  writeFileSync
} from 'fs';
import uniqid from 'uniqid';

const logger = console;
const charset = 'utf8';

// export const ensureCollSync = function (collName) {
//   const collPath = path.join(this.root, collName);
//   if (existsSync(collPath)) return;
//   writeFileSync(collPath, '[]', charset);
// };

export const insert = function (cursor, doc) {
  try {
    // TODO Validate
    // ensureCollSync.apply(this, cursor);

    this.cursor = cursor;
    this.storage = JSON.parse(
      readFileSync(`${this.root}/${cursor}.json`, charset)
    );
    const newDoc = {
      ...doc,
      _id: uniqid(),
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    };
    this.storage.push(newDoc);
    this.save();
    return newDoc;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const find = function (cursor, query = null) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse(
      readFileSync(`${this.root}/${cursor}.json`, charset)
    );
    let filtered = this.storage;
    if (query && typeof query === 'object') {
      const keys = Object.keys(query);
      // TODO Improve
      filtered = this.storage.filter((doc) => {
        let include = true;
        keys.forEach((key) => {
          if (doc[key] !== query[key]) {
            include = false;
          }
        });
        return include;
      });
    }
    return filtered;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const findOne = function (cursor, query) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse(
      readFileSync(`${this.root}/${cursor}.json`, charset)
    );
    let filtered = null;
    if (query && typeof query === 'object') {
      const keys = Object.keys(query);
      // TODO Improve
      filtered = this.storage.filter((doc) => {
        let include = true;
        keys.forEach((key) => {
          if (doc[key] !== query[key]) {
            include = false;
          }
        });
        return include;
      });
    }
    return filtered[0] || null;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const updateOne = function (cursor, filter, newDoc) {
  try {
    this.cursor = cursor;
    const storage = JSON.parse(
      readFileSync(`${this.root}/${cursor}.json`, charset)
    );

    const keys = Object.keys(filter);
    this.storage = storage.filter((doc) => {
      let include = true;
      keys.forEach((key) => {
        if (doc[key] === filter[key]) {
          include = false;
        }
      });
      return include;
    });
    this.storage.push({ ...newDoc, lastUpdatedAt: new Date() });
    this.save();
    return newDoc;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const remove = function (cursor, query) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse(
      readFileSync(`${this.root}/${cursor}.json`, charset)
    );
    const keys = Object.keys(query);

    const storage = this.storage.filter((doc) => {
      let include = true;
      keys.forEach((key) => {
        if (doc[key] === query[key]) {
          include = false;
        }
      });
      return include;
    });
    this.storage = storage;
    this.save();
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
