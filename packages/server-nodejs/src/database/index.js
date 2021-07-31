/* eslint-disable prefer-destructuring */
import { dbConnection } from 'config';

import * as jsondb from './jsondb';
import * as mongodb from './mongodb';

export const db = dbConnection === 'jsondb' ? jsondb.db : mongodb.db;
