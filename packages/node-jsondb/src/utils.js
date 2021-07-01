import {
  existsSync,
  mkdirSync,
  unlinkSync,
  readdirSync,
  writeFileSync,
  readFileSync,
} from 'fs';

const logger = console;
const charset = 'utf8';

export const ensureDbSync = function () {
  if (existsSync(this.root)) return;
  mkdirSync(this.root);
};

export const init = function ({ initialData }) {
  try {
    (initialData || []).forEach(
      ({ coll, data }) => {
        const collPath = `${this.root}/${coll}.json`;
        if (existsSync(collPath)) return;
        writeFileSync(collPath, JSON.stringify(data, null, 2), charset);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

export const createCollection = function (collName) {
  try {
    writeFileSync(`${this.root}/${collName}.json`, '[]', charset);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

export const dropCollection = function (collName) {
  try {
    unlinkSync(`${this.root}/${collName}.json`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

const getCollectionParsed = (collPath) => JSON.parse(
  readFileSync(collPath, charset)
);

export const getCollection = function (collName, createIfNotExists = true) {
  try {
    const collPath = `${this.root}/${collName}.json`;
    if (existsSync(collPath)) return getCollectionParsed(collPath);
    if (createIfNotExists) {
      writeFileSync(collPath, '[]', charset);
      return [];
    };
    return [];
  } catch (err) {
    logger.error(err);
    return [];
  }
}

export const getCollections = function () {
  try {
    const colls = readdirSync(this.root);
    return colls.map((c) => c.replace('.json', ''));
  } catch (err) {
    logger.error(err);
    return [];
  }
};

export const syncStorage = function () {
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
