import path from 'path';

import { ensureDbSync, init, createCollection, dropCollection, getCollections, syncStorage } from './utils';
import { insert, find, findOne, updateOne, remove } from './handlers';

const defaultDbDir = path.join(__dirname, '..');

export default function JsonDB(appDir = defaultDbDir, config) {
  this.root = path.join(appDir, '.jsondb');

  ensureDbSync.apply(this);
  init.call(this, config);

  this.collections = {};
  const collections = getCollections.call(this);
  collections.forEach((collName) => {
    // pattern: db.collections.{collName}.*()
    this.collections[collName] = {};
    this.collections[collName].insert = insert.bind(this, collName);
    this.collections[collName].insertMany = () => { }; // TODO
    this.collections[collName].find = find.bind(this, collName);
    this.collections[collName].findOne = findOne.bind(this, collName);
    this.collections[collName].update = () => { }; // TODO
    this.collections[collName].findOneAndUpdate = () => { }; // TODO
    this.collections[collName].updateOne = updateOne.bind(this, collName);
    this.collections[collName].updateMany = () => { }; // TODO
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
