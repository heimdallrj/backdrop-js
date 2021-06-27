import path from 'path';

export const BASE_URL = 'http://localhost:3001';
export const PORT = process.env.PORT || 3001;
export const APP_NAME = 'Backdrop';
export const APP_DESC = 'Minimalistic API Artisan';
export const MEDIA_DIR = 'media';
export const MEDIA_PATH = path.join(__dirname, '..', MEDIA_DIR);

export const filesToBeIgnored = ['.DS_Store'];

export const DB = {
  connection: 'jsondb',
  config: null,
};
