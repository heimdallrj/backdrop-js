import path from 'path';
import {
  existsSync,
  mkdirSync,
  unlinkSync,
  readdirSync,
  writeFileSync,
  readFileSync,
} from 'fs';
import uniqid from 'uniqid';

const logger = console;
const charset = 'utf8';

// Utils
const ensureDbSync = function () {
  if (existsSync(this.root)) return;
  mkdirSync(this.root);
};

const init = function () {
  try {
    [`${this.root}/users.json`, `${this.root}/config.json`].forEach(
      (collPath) => {
        if (existsSync(collPath)) return;
        writeFileSync(collPath, '[]', charset);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const createCollection = function (collName) {
  try {
    writeFileSync(`${this.root}/${collName}.json`, '[]', charset);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

const dropCollection = function (collName) {
  try {
    unlinkSync(`${this.root}/${collName}.json`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

const getCollections = function () {
  try {
    const colls = readdirSync(this.root);
    return colls.map((c) => c.replace('.json', ''));
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const syncStorage = function () {
  try {
    writeFileSync(
      `${this.root}/${this.cursor}.json`,
      JSON.stringify(this.storage, null, 2),
      charset
    );
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

// Handlers
const insert = function (cursor, doc) {
  try {
    // TODO Validate
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

const find = function (cursor, query = null) {
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

const findOne = function (cursor, query) {
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

const updateOne = function (cursor, filter, newDoc) {
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

const remove = function (cursor, query) {
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

export default function JsonDB() {
  this.root = path.join(__dirname, '..', '..', '.jsondb');
  ensureDbSync.apply(this);
  init.apply(this);

  this.collections = {};
  const collections = getCollections.call(this);
  collections.forEach((collName) => {
    // pattern: db.collections.{collName}.*()
    this.collections[collName] = {};
    this.collections[collName].insert = insert.bind(this, collName);
    this.collections[collName].insertMany = () => {}; // TODO
    this.collections[collName].find = find.bind(this, collName);
    this.collections[collName].findOne = findOne.bind(this, collName);
    this.collections[collName].update = () => {}; // TODO
    this.collections[collName].findOneAndUpdate = () => {}; // TODO
    this.collections[collName].updateOne = updateOne.bind(this, collName);
    this.collections[collName].updateMany = () => {}; // TODO
    this.collections[collName].remove = remove.bind(this, collName);
  });

  this.colls = getCollections.call(this);
  this.cursor = null;
  this.storage = [];
}

JsonDB.prototype.ping = function () {
  return {
    name: '.jsondb',
    path: this.root,
    collections: this.colls,
    datestamp: new Date(),
  };
};

JsonDB.prototype.createCollection = function (collName) {
  if (createCollection.call(this, collName)) return { ok: 1 };
  return { ok: 0 };
};

JsonDB.prototype.dropCollection = function (collName) {
  dropCollection.call(this, collName);
};

JsonDB.prototype.save = function () {
  syncStorage.call(this);
};
