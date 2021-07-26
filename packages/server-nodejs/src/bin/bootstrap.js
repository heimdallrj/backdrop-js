#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path';
import { isFileExists } from 'utils/fs';
import logger from 'utils/logger';

const envfilePath = path.join(__dirname, '..', '..', '.env');
if (!isFileExists(envfilePath)) {
  logger.log('Error: `.env` file is missing!.');
  process.exit(1);
}

require('../index');
