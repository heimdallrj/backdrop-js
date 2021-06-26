"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JsonDB;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _uniqid = _interopRequireDefault(require("uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = console;
const charset = 'utf8'; // Utils

const ensureDbSync = function () {
  if ((0, _fs.existsSync)(this.root)) return;
  (0, _fs.mkdirSync)(this.root);
};

const createCollection = function (collName) {
  try {
    (0, _fs.writeFileSync)(`${this.root}/${collName}.json`, '[]', charset);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

const dropCollection = function (collName) {
  try {
    (0, _fs.unlinkSync)(`${this.root}/${collName}.json`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

const getCollections = function () {
  try {
    const colls = (0, _fs.readdirSync)(this.root);
    return colls.map(c => c.replace('.json', ''));
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const syncStorage = function () {
  try {
    (0, _fs.writeFileSync)(`${this.root}/${this.cursor}.json`, JSON.stringify(this.storage, null, 2), charset);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}; // Handlers


const insert = function (cursor, doc) {
  try {
    // TODO Validate
    this.cursor = cursor;
    this.storage = JSON.parse((0, _fs.readFileSync)(`${this.root}/${cursor}.json`, charset));
    const doc2 = { ...doc,
      _id: (0, _uniqid.default)()
    };
    this.storage.push(doc2);
    this.save();
    return doc2;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const find = function (cursor) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse((0, _fs.readFileSync)(`${this.root}/${cursor}.json`, charset)); // TODO Impliment advance quering

    return this.storage;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const findOneById = function (cursor, id) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse((0, _fs.readFileSync)(`${this.root}/${cursor}.json`, charset));
    const doc = this.storage.find(({
      _id
    }) => _id === id);
    return doc || null;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const updateOneById = function (cursor, id, doc, upsert = false) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse((0, _fs.readFileSync)(`${this.root}/${cursor}.json`, charset));
    const docSingle = this.storage.find(({
      _id
    }) => _id === id);
    let docTobeUpdated = { ...docSingle,
      ...doc
    };

    if (upsert) {
      docTobeUpdated = {
        _id: id,
        ...doc
      };
    }

    const storage = this.storage.filter(({
      _id
    }) => _id !== id);
    storage.push(docTobeUpdated);
    this.storage = storage;
    this.save();
    return docTobeUpdated;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const remove = function (cursor, id) {
  try {
    this.cursor = cursor;
    this.storage = JSON.parse((0, _fs.readFileSync)(`${this.root}/${cursor}.json`, charset));
    const storage = this.storage.filter(({
      _id
    }) => _id !== id);
    this.storage = storage;
    this.save();
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

function JsonDB() {
  this.root = _path.default.join(__dirname, '..', '..', '.jsondb');
  ensureDbSync.apply(this);
  this.collections = {};
  const collections = getCollections.call(this);
  collections.forEach(collName => {
    // pattern: db.collections.{collName}.*()
    this.collections[collName] = {};
    this.collections[collName].insert = insert.bind(this, collName);

    this.collections[collName].insertMany = () => {}; // TODO


    this.collections[collName].find = find.bind(this, collName);

    this.collections[collName].findOne = () => {}; // TODO


    this.collections[collName].findOneById = findOneById.bind(this, collName);

    this.collections[collName].update = () => {}; // TODO


    this.collections[collName].updateOneById = updateOneById.bind(this, collName);

    this.collections[collName].findOneAndUpdate = () => {}; // TODO


    this.collections[collName].updateOne = () => {}; // TODO


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
    datestamp: new Date()
  };
};

JsonDB.prototype.createCollection = function (collName) {
  if (createCollection.call(this, collName)) return {
    ok: 1
  };
  return {
    ok: 0
  };
};

JsonDB.prototype.dropCollection = function (collName) {
  dropCollection.call(this, collName);
};

JsonDB.prototype.save = function () {
  syncStorage.call(this);
};